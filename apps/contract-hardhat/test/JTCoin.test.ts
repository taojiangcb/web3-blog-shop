import { expect } from "chai";
import { ethers } from "hardhat";
import { JTCoin } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("JTCoin", function () {
  let jtCoin: JTCoin;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  beforeEach(async function () {
    // 获取测试账户
    [owner, addr1, addr2] = await ethers.getSigners();

    // 部署合约
    const JTCoin = await ethers.getContractFactory("JTCoin");
    jtCoin = await JTCoin.deploy();
  });

  describe("基础功能", function () {
    it("应该正确设置名称和符号", async function () {
      expect(await jtCoin.name()).to.equal("JTCoin");
      expect(await jtCoin.symbol()).to.equal("JT");
    });

    it("应该将默认管理员角色授予部署者", async function () {
      const adminRole = await jtCoin.DEFAULT_ADMIN_ROLE();
      expect(await jtCoin.hasRole(adminRole, owner.address)).to.be.true;
    });

    it("应该将MINTER_ROLE授予部署者", async function () {
      const minterRole = await jtCoin.MINTER_ROLE();
      expect(await jtCoin.hasRole(minterRole, owner.address)).to.be.true;
    });
  });

  describe("铸币功能", function () {
    it("应该允许MINTER_ROLE铸造代币", async function () {
      const mintAmount = ethers.parseEther("100");
      await jtCoin.mint(addr1.address, mintAmount);
      expect(await jtCoin.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("mint_100应该正确铸造100代币到合约", async function () {
      await jtCoin.mint_100();
      const tokenPool = await jtCoin.getTokenPool();
      expect(tokenPool).to.equal(ethers.parseEther("100"));
    });
  });

  describe("购买代币", function () {
    beforeEach(async function () {
      // 先铸造一些代币到合约
      await jtCoin.mint_100();
    });

    it("应该在ETH金额为0时revert", async function () {
      await expect(jtCoin.connect(addr1).buyTokens({ value: 0n }))
        .to.be.revertedWith("Invalid ETH amount");
    });
  });

  describe("代币消耗", function () {
    it("应该能正确消耗代币", async function () {
      // 先铸造一些代币给用户
      const mintAmount = ethers.parseEther("100");
      await jtCoin.mint(addr1.address, mintAmount);

      // 消耗代币
      const consumeAmount = ethers.parseEther("50");
      await jtCoin.consumeToken(addr1.address, consumeAmount);

      // 检查余额
      expect(await jtCoin.balanceOf(addr1.address)).to.equal(mintAmount - consumeAmount);
    });
  });

  describe("提现功能", function () {

    it("只有MINTER_ROLE可以提现JT代币", async function () {
      // 先铸造一些代币到合约
      await jtCoin.mint_100();

      // 非MINTER_ROLE不能提现
      await expect(jtCoin.connect(addr1).withdrawJTCoin())
        .to.be.reverted;

      // MINTER_ROLE可以提现
      const tx = await jtCoin.withdrawJTCoin();
      await tx.wait();
      
      // 验证合约余额为0
      expect(await jtCoin.getTokenPool()).to.equal(0n);
    });
  });

  // 添加事件测试
  describe("事件测试", function () {

    it("应该在消耗代币时触发ConsumeToken事件", async function () {
      const amount = ethers.parseEther("10");
      await jtCoin.mint(addr1.address, amount);
      
      await expect(jtCoin.consumeToken(addr1.address, amount))
        .to.emit(jtCoin, "ConsumeToken")
        .withArgs(addr1.address, amount);
    });
  });

  // 添加错误处理测试
  describe("错误处理测试", function () {
    it("当代币池不足时应该revert买币操作", async function () {
      const ethAmount = ethers.parseEther("1000"); // 尝试购买大量代币
      await expect(jtCoin.connect(addr1).buyTokens({ value: ethAmount }))
        .to.be.revertedWith("Insufficient token pool");
    });

    it("当余额不足时应该revert消耗操作", async function () {
      const amount = ethers.parseEther("10");
      await expect(jtCoin.consumeToken(addr1.address, amount))
        .to.be.revertedWith("Insufficient token balance");
    });
  });
});