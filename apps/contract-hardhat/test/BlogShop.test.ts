import { expect } from "chai";
import { ethers } from "hardhat";
import { BlogShop, JTCoin } from "../typechain-types"; // 假设 TypeChain 生成了这些类型

describe("BlogShop", function () {
  let blogShop: BlogShop;
  let jtCoin: JTCoin;
  let owner: any;
  let user1: any;

  before(async function () {
    // 获取签名者
    [owner, user1] = await ethers.getSigners();

    // 部署 JTCoin 合约
    const JTCoinFactory = await ethers.getContractFactory("JTCoin");
    jtCoin = (await JTCoinFactory.deploy("JTCoin", "JT")) as JTCoin;
    await jtCoin.waitForDeployment();

    // 部署 BlogShop 合约，传入 JTCoin 合约地址
    const BlogShopFactory = await ethers.getContractFactory("BlogShop");
    blogShop = (await BlogShopFactory.deploy(
      await jtCoin.getAddress()
    )) as BlogShop;
    await blogShop.waitForDeployment();

    // 授予 BlogShop 合约 MINTER_ROLE 权限
    const MINTER_ROLE = await jtCoin.MINTER_ROLE();
    await jtCoin.connect(owner).grantRole(MINTER_ROLE, blogShop.target);
  });

  it("should allow owner to add an article", async function () {
    // 获取代币的 decimals
    const decimals = await jtCoin.decimals();

    // 设置文章价格（100 JT），并考虑 decimals
    const priceInJT = ethers.parseUnits("100", decimals);
    const link = "https://example.com/article1";

    // 添加文章
    await expect(blogShop.connect(owner).addArticle(priceInJT, link))
      .to.emit(blogShop, "ArticleAdded")
      .withArgs(1, priceInJT, link);

    // 验证文章是否正确添加
    const article = await blogShop.articles(1);
    expect(article.id).to.equal(1);
    expect(article.price).to.equal(priceInJT);
    expect(article.link).to.equal(link);
  });

  it("should allow user to purchase an article", async function () {
    // 获取代币的 decimals
    const decimals = await jtCoin.decimals();

    // 设置文章价格（100 JT），并考虑 decimals
    const priceInJT = ethers.parseUnits("100", decimals);
    const link = "https://example.com/article1";

    // 添加一篇文章
    await blogShop.connect(owner).addArticle(priceInJT, link);

    // 给用户 mint 足够的 JT 代币
    const userBalance = ethers.parseUnits("1000", decimals);
    await jtCoin.connect(owner).mint(user1.address, userBalance);

    // 用户授权 BlogShop 合约使用代币
    await jtCoin.connect(user1).approve(blogShop.target, priceInJT);

    // 用户购买文章
    await expect(blogShop.connect(user1).purchaseArticle(1))
      .to.emit(blogShop, "ArticlePurchased")
      .withArgs(user1.address, 1, link);

    // 验证用户余额是否正确扣除
    const userJTBalance = await jtCoin.balanceOf(user1.address);
    expect(userJTBalance).to.equal(userBalance - priceInJT);

    // 验证合约是否正确收到代币
    const contractJTBalance = await jtCoin.balanceOf(blogShop.target);
    expect(contractJTBalance).to.equal(priceInJT);
  });

  it("should convert ETH to JT tokens at the correct rate", async function () {
    const userJTBalance_old = await jtCoin.balanceOf(user1.address);

    // 用户发送 1 ETH
    const ethAmount = ethers.parseEther("1.0");
    await user1.sendTransaction({
      to: blogShop.target,
      value: ethAmount,
    });

    // 计算预期的 JT 数量（1 ETH = 1000 JT）
    const expectedJT = ethAmount * 1000n;

    // 验证用户收到的 JT 数量是否正确
    const userJTBalance = await jtCoin.balanceOf(user1.address);
    expect(userJTBalance).to.equal(userJTBalance_old + expectedJT);
  });

  it("should allow owner to withdraw ETH", async function () {
    // 记录所有者初始余额
    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);

    // 发送一些 ETH 到合约
    const ethAmount = ethers.parseEther("1.0");
    await owner.sendTransaction({
      to: blogShop.target,
      value: ethAmount,
    });

    // 提取 ETH
    const tx = await blogShop.connect(owner).withdrawETH();
    const receipt = await tx.wait();

    // 计算 gas 费用
    const gasUsed = receipt.gasUsed; // gasUsed 是 bigint
    const gasPrice = receipt.gasPrice; // gasPrice 是 bigint
    const gasCost = gasUsed * gasPrice; // 使用 BigInt 乘法

    // // 验证所有者余额是否正确增加
    // const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
    // expect(finalOwnerBalance).to.equal(
    //   initialOwnerBalance + ethAmount - gasCost
    // );

    // 验证合约余额是否正确清零
    const contractBalance = await ethers.provider.getBalance(blogShop.target);
    expect(contractBalance).to.equal(0);
  });

  it("should allow owner to withdraw JT tokens", async function () {
    // 获取代币的 decimals
    const decimals = await jtCoin.decimals();

    // 记录所有者初始 JT 余额
    const initialOwnerJTBalance = await jtCoin.balanceOf(owner.address);
    const hadToken = await jtCoin.balanceOf(blogShop.target);

    // 设置文章价格（100 JT），并考虑 decimals
    const priceInJT = ethers.parseUnits("100", decimals);
    const link = "https://example.com/article1";

    // 添加一篇文章
    await blogShop.connect(owner).addArticle(priceInJT, link);

    // 给用户 mint 足够的 JT 代币
    const userBalance = ethers.parseUnits("1000", decimals);
    await jtCoin.connect(owner).mint(user1.address, userBalance);

    // 用户授权 BlogShop 合约使用代币
    await jtCoin.connect(user1).approve(blogShop.target, priceInJT);

    // 用户购买文章
    await blogShop.connect(user1).purchaseArticle(1);

    // 提取 JT 代币
    await blogShop.connect(owner).withdrawJT();

    // 验证所有者 JT 余额是否正确增加
    const finalOwnerJTBalance = await jtCoin.balanceOf(owner.address);
    expect(finalOwnerJTBalance).to.equal(
      initialOwnerJTBalance + priceInJT + hadToken
    );

    // 验证合约 JT 余额是否正确清零
    const contractJTBalance = await jtCoin.balanceOf(blogShop.target);
    expect(contractJTBalance).to.equal(0);
  });

  it("should revert if non-owner tries to add an article", async function () {
    // 获取代币的 decimals
    const decimals = await jtCoin.decimals();

    // 设置文章价格（100 JT），并考虑 decimals
    const priceInJT = ethers.parseUnits("100", decimals);
    const link = "https://example.com/article1";

    // 非所有者尝试添加文章
    await expect(
      blogShop.connect(user1).addArticle(priceInJT, link)
    ).to.be.revertedWith("Not owner");
  });
});
