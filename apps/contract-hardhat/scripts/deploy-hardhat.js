const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { existsSync, mkdirSync } = require('fs');


/** 发布合约脚本 */
async function deploy(contract_name, ...initParams) {
    const contractName = contract_name;
    console.log(`Deploying contract: ${contractName}`);

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 重置 Hardhat 网络状态
    await network.provider.send("hardhat_reset");

    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy(...initParams);

    await contract.waitForDeployment();
    const contractAddress = await contract.target;
    console.log("Contract deployed to:", contractAddress);

    // 验证合约部署
    const code = await ethers.provider.getCode(contractAddress);
    if (code === "0x") {
        throw new Error("合约部署失败！");
    }
    console.log("合约部署成功！");

    // 获取 ABI JSON 文件路径
    const contractOutputDir = path.join(__dirname, "../artifacts/contracts");
    const contractJsonPath = path.join(contractOutputDir, `${contractName}.sol`, `${contractName}.json`);

    // 读取 ABI JSON 文件
    const contractJson = JSON.parse(fs.readFileSync(contractJsonPath, "utf8"));

    // 将地址记录在 ABI JSON 文件的 networks 部分
    contractJson.networks = contractJson.networks || {};
    contractJson.networks[network.name] = contractJson.networks[network.name] || {};
    contractJson.networks[network.name].address = contractAddress;

    // 保存更新后的 ABI JSON 文件
    fs.writeFileSync(contractJsonPath, JSON.stringify(contractJson, null, 2));

    // 写入到 web3-app 项目中
    const webappPath = path.join(__dirname, "../../web3-app/src/abi");
    if (!existsSync(webappPath)) {
        mkdirSync(webappPath, { recursive: true });
    }
    const toWebAppabiFile = path.join(webappPath, `${contractName}.json`);
    fs.writeFileSync(toWebAppabiFile, JSON.stringify(contractJson, null, 2));
    console.log(`Contract address for ${network.name} saved in ABI JSON file.`);

    // 返回发布的合约地址
    return {
        contractAddress
    }
}

async function main() {
    const contract_jtCoin = await deploy("JTCoin");
    await deploy("BlogShop", contract_jtCoin.contractAddress);
}

// 运行脚本
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });