import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
        // url: "http://127.0.0.1:8545",
      chainId: 1337, // 默认 Hardhat 本地网络的链 ID
    },
    // 发布到测试网
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },
  typechain: {
    outDir: "../web3-app/src/abi/typechain-types",
    target: "ethers-v6",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true,
  },
  // ethernal: {
  //   disableSync: false, // 是否禁用同步
  //   disableTrace: false, // 是否禁用交易追踪
  //   workspace: "hardhat-project", // 指定 Ethernal 工作区
  //   uploadAst: false, // 是否上传抽象语法树
  //   disabled: false, // 是否完全禁用 Ethernal
  //   resetOnStart: undefined, // 在启动时重置工作区
  // },
};

export default config;
