"use client"

import React, { useState, useEffect } from "react";
import {
  Input,
  Popover,
  Radio,
  Modal,
  message,
  RadioChangeEvent,
  Button,
} from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "./tokenList.json";

import {
  ChainId,
  Token,
  WETH9,
  CurrencyAmount,
  TradeType,
  Percent,
  V2_FACTORY_ADDRESSES,
} from "@uniswap/sdk-core";
import { Pair, Route, Trade, computePairAddress } from "@uniswap/v2-sdk";
import { ethers } from "ethers";
import {
  infura_connection,
  UniswapV2Pair,
  UniswapV2Router02,
} from "./resource";

import { useAccount, useWriteContract } from "wagmi";

function Swap() {
  const account = useAccount();
  const { isConnected } = account;

  // 初始化Ant Design的消息通知API
  const [messageApi, contextHolder] = message.useMessage();

  // 滑点设置状态，默认为2.5%
  const [slippage, setSlippage] = useState(2.5);

  // 代币数量状态管理
  const [tokenOneAmount, setTokenOneAmount] = useState(""); // 输入代币数量
  const [tokenTwoAmount, setTokenTwoAmount] = useState(""); // 输出代币数量

  // 选择的代币状态管理
  const [tokenOne, setTokenOne] = useState(tokenList[0]); // 第一个代币
  const [tokenTwo, setTokenTwo] = useState(tokenList[1]); // 第二个代币

  // UI控制状态
  const [isOpen, setIsOpen] = useState(false); // 控制模态框的显示和隐藏
  const [changeToken, setChangeToken] = useState(1); // 追踪当前正在更改哪个代币（1或2）

  // 价格和交易状态管理
  const [prices, setPrices] = useState<{
    tokenOne?: string | null;
    tokenTwo?: string | null;
    ratio?: string | null;
  } | null>(null); // 存储代币对的价格数据
  const [txDetails, setTxDetails] = useState({
    to: null, // 交易接收地址
    data: null, // 交易数据负载
    value: null, // 交易金额（以wei为单位）
  });
  const { writeContract } = useWriteContract();

  function handleSlippageChange(e: RadioChangeEvent) {
    setSlippage(Number(e.target.value));
  }

  function changeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    setTokenOneAmount(e.target.value);
    if (e.target.value && prices) {
      setTokenTwoAmount(
        (Number(e.target.value) * Number(prices?.ratio)).toFixed(6)
      );
    } else {
      setTokenTwoAmount("");
    }
  }

  function switchTokens() {
    setPrices(null);
    setTokenOneAmount("");
    setTokenTwoAmount("");
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    fetchPrices(two as unknown as Token, one as unknown as Token);
  }

  function openModal(asset: React.SetStateAction<number>) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i: number) {
    setPrices(null);
    setTokenOneAmount("");
    setTokenTwoAmount("");
    if (changeToken === 1) {
      setTokenOne(tokenList[i]);
      fetchPrices(
        tokenList[i] as unknown as Token,
        tokenTwo as unknown as Token
      );
    } else {
      setTokenTwo(tokenList[i]);
      fetchPrices(
        tokenOne as unknown as Token,
        tokenList[i] as unknown as Token
      );
    }
    setIsOpen(false);
  }

  async function createPair(tokenOne: Token, tokenTwo: Token): Promise<Pair> {
    // Create Token instances for tokenOne and tokenTwo
    const tokenOneToken = new Token(
      ChainId.MAINNET,
      tokenOne.address,
      tokenOne.decimals, // assuming default decimals, adjust if needed
      tokenOne.name
    );

    const tokenTwoToken = new Token(
      ChainId.MAINNET,
      tokenTwo.address,
      tokenTwo.decimals, // assuming default decimals, adjust if needed
      tokenTwo.name
    );

    const pairAddress = Pair.getAddress(tokenOneToken, tokenTwoToken);
    // const pairAddress = computePairAddress({
    //   factoryAddress: V2_FACTORY_ADDRESSES[ChainId.MAINNET],
    //   tokenA: tokenOneToken,
    //   tokenB: tokenTwoToken,
    // });

    console.log("pairAddress", pairAddress);

    // router v2 02:0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
    // Setup provider, import necessary ABI ...
    // 创建一个新的 JsonRpcProvider 实例，用于连接以太坊网络
    const provider = new ethers.JsonRpcProvider(infura_connection);
    // 使用配对地址创建交易对合约实例
    const pairContract = new ethers.Contract(
      pairAddress,
      UniswapV2Pair,
      provider
    );
    // 调用合约的 getReserves 方法获取储备量
    const reserves = await pairContract["getReserves"]();
    // 解构获取两个代币的储备量
    const [reserve0, reserve1] = reserves;
    console.log("reserves", reserves);
    // 确保储备量是字符串格式
    const reserve0Str = reserve0.toString();
    const reserve1Str = reserve1.toString();
    // 创建代币数组
    const tokens = [tokenOneToken, tokenTwoToken];
    // 根据代币地址排序，确保与储备金顺序匹配
    const [token0, token1] = tokens[0].sortsBefore(tokens[1])
      ? tokens
      : [tokens[1], tokens[0]];

    // 创建新的交易对实例，使用排序后的代币和对应的储备量
    const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserve0Str),
      CurrencyAmount.fromRawAmount(token1, reserve1Str)
    );
    console.log("pair", pair);
    return pair;
  }

  async function fetchPrices(tokenOne: Token, tokenTwo: Token) {
    const tokenOneToken = new Token(
      ChainId.MAINNET,
      tokenOne.address,
      tokenOne.decimals, // assuming default decimals, adjust if needed
      tokenOne.name
    );

    const tokenTwoToken = new Token(
      ChainId.MAINNET,
      tokenTwo.address,
      tokenTwo.decimals, // assuming default decimals, adjust if needed
      tokenTwo.name
    );

    const pair = await createPair(tokenOneToken, tokenTwoToken);
    const route = new Route([pair], tokenOneToken, tokenTwoToken);
    const tokenOnePrice = route.midPrice.toSignificant(6);
    const tokenTwoPrice = route.midPrice.invert().toSignificant(6);

    const ratio = tokenOnePrice;
    console.log({
      tokenOne: tokenOnePrice,
      tokenTwo: tokenTwoPrice,
      ratio,
    });

    setPrices({
      tokenOne: tokenOnePrice,
      tokenTwo: tokenTwoPrice,
      ratio,
    });
  }

  async function fetchDexSwap() {
    const tokenOneToken = new Token(
      ChainId.MAINNET,
      tokenOne.address,
      tokenOne.decimals,
      tokenOne.name
    );

    const tokenTwoToken = new Token(
      ChainId.MAINNET,
      tokenTwo.address,
      tokenTwo.decimals,
      tokenTwo.name
    );

    //const pair = await createPair(tokenOneToken, tokenTwoToken);
    const pair = new Pair(
      CurrencyAmount.fromRawAmount(
        tokenOneToken,
        formatTokenAmount(tokenOneAmount, tokenOne.decimals)
      ),
      CurrencyAmount.fromRawAmount(
        tokenTwoToken,
        formatTokenAmount(tokenTwoAmount, tokenTwo.decimals)
      )
    );

    const route = new Route([pair], tokenOneToken, tokenTwoToken);
    const amountIn = formatTokenAmount(tokenOneAmount, tokenOne.decimals);
    const trade = new Trade(
      route,
      CurrencyAmount.fromRawAmount(tokenOneToken, amountIn || 0),
      TradeType.EXACT_INPUT
    );

    const tokenTwoOut = (
      (Number(tokenTwoAmount) * (100 - slippage)) /
      100
    ).toString();

    const amountOutMin = formatTokenAmount(tokenTwoOut, tokenTwo.decimals);

    const path = [tokenOneToken.address, tokenOneToken.address];
    const to = account.address; // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
    // const value = trade.inputAmount.toExact();
    await approveToken(tokenOneToken.address, amountIn as any);
    writeContract(
      {
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D" as `0x${string}`,
        abi: UniswapV2Router02,
        functionName: "swapExactTokensForTokens",
        args: [amountIn, amountOutMin, path, to, deadline],
      },
      {
        onSuccess: (tx: any) => {
          messageApi.destroy();
          messageApi.info("Transaction is successful:" + tx.hash);
          setTxDetails({
            ...(tx as any),
          });
        },
        onError: (error) => {
          messageApi.destroy();
          messageApi.error("Transaction is error :" + error.message);
          console.log("error", error);
        },
      }
    );
  }

  async function approveToken(tokenAddress: string, amount: number) {
    console.log(
      "approve token called token: +" + tokenAddress + " amount: " + amount
    );
    const tokenABI = [
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    writeContract(
      {
        address: tokenAddress as `0x${string}`,
        abi: tokenABI,
        functionName: "approve",
        args: ["0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", amount],
      },
      {
        onSuccess: (tx: any) => {
          messageApi.info("Transaction is successful!" + tx.hash);
          setTxDetails({
            to: tx.to,
            data: tx.data,
            value: tx.value,
          });
        },
        onError: (error) => {
          console.log("🚀 ~ fetchDexSwap ~ error:", error.message);
          messageApi.error(error.message);
        },
      }
    );
  }

  useEffect(() => {
    fetchPrices(
      tokenList[0] as unknown as Token,
      tokenList[1] as unknown as Token
    );
  }, []);

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <div className="tradeBox flex flex-col gap-4">
        <div className="w-full mt-2 flex flex-row justify-between">
          <div>
            <h1>Swap</h1>
          </div>
          <div>
            <Popover
              content={settings}
              title="Settings"
              trigger="click"
              placement="bottomRight"
            >
              <SettingOutlined className="cog" />
            </Popover>
          </div>
        </div>
        <div className="inputs w-full flex flex-col gap-4">
          <div className="relative">
            <Input
              placeholder="0"
              value={tokenOneAmount}
              onChange={changeAmount}
              disabled={!prices}
            />
            <div
              className="assetOne !absolute !top-0 !right-0"
              onClick={() => openModal(1)}
            >
              <img
                src={tokenOne.img}
                alt="assetOneLogo"
                className="assetLogo"
              />
              {tokenOne.ticker}
              <DownOutlined />
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="bg-cyan-50 bg-opacity-5 w-4 animate-move-down"
              onClick={switchTokens}
            >
              <ArrowDownOutlined className="switchArrow" />
            </div>
          </div>
          <div className="relative">
            <Input placeholder="0" value={tokenTwoAmount} disabled={true} />
            <div
              className="assetTwo !absolute !top-0 !right-0"
              onClick={() => openModal(2)}
            >
              <img
                src={tokenTwo.img}
                alt="assetOneLogo"
                className="assetLogo"
              />
              {tokenTwo.ticker}
              <DownOutlined />
            </div>
          </div>
        </div>
        <Button
          className="swapButton"
          disabled={(!tokenOneAmount || !isConnected) as boolean}
          onClick={fetchDexSwap}
        >
          Swap
        </Button>
      </div>
    </>
  );
}

export default Swap;

const formatTokenAmount = (amount: string, decimals: number) => {
  // 将数字拆分成整数部分和小数部分
  const [integerPart, decimalPart = ""] = amount.split(".");
  // 组合整数和小数部分
  let combined = integerPart + decimalPart;
  // 计算需要填充的零的数量
  const paddingLength = decimals - decimalPart.length;
  // 如果需要填充零，则填充
  if (paddingLength > 0) {
    combined = combined.padEnd(combined.length + paddingLength, "0");
  } else if (paddingLength < 0) {
    // 如果小数部分长度超出，需要截取
    combined = combined.slice(0, paddingLength);
  }
  // 移除前导零
  combined = combined.replace(/^0+/, "");
  console.log("amount: " + amount + ", result: " + combined);
  return combined;
};
