import { expect } from "chai";
import { ethers } from "hardhat";
import { BlogShop, JTCoin } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("BlogShop", function () {
  let blogShop: BlogShop;
  let jtCoin: JTCoin;
  let owner: HardhatEthersSigner;
  let buyer: HardhatEthersSigner;
  let seller: HardhatEthersSigner;

  beforeEach(async function () {
    // 获取测试账户
    [owner, buyer, seller] = await ethers.getSigners();

    // 部署 JTCoin
    const JTCoin = await ethers.getContractFactory("JTCoin");
    jtCoin = await JTCoin.deploy();

    // 部署 BlogShop
    const BlogShop = await ethers.getContractFactory("BlogShop");
    blogShop = await BlogShop.deploy(await jtCoin.getAddress());

    // 铸造一些代币给买家用于测试
    const mintAmount = ethers.parseEther("1000");
    await jtCoin.mint(buyer.address, mintAmount);
  });

  describe("基础功能", function () {
    it("应该正确设置初始状态", async function () {
      expect(await blogShop.owner()).to.equal(owner.address);
      expect(await blogShop.tokenAddress()).to.equal(await jtCoin.getAddress());
    });

    it("应该将MINTER_ROLE授予部署者", async function () {
      const minterRole = await blogShop.MINTER_ROLE();
      expect(await blogShop.hasRole(minterRole, owner.address)).to.be.true;
    });
  });

  describe("文章管理", function () {
    it("MINTER_ROLE应该能添加文章", async function () {
      const price = ethers.parseEther("10");
      const link = "https://example.com/article1";

      await expect(blogShop.addArticle(price, link))
        .to.emit(blogShop, "ArticleAdded")
        .withArgs(1n, price, link);

      const article = (await blogShop.getAllArticles())[0];
      expect(article.id).to.equal(1n);
      expect(article.price).to.equal(price);
      expect(article.link).to.equal(link);
    });

    it("非MINTER_ROLE不能添加文章", async function () {
      const price = ethers.parseEther("10");
      const link = "https://example.com/article1";

      await expect(blogShop.connect(buyer).addArticle(price, link))
        .to.be.reverted;
    });
  });

  describe("文章购买", function () {
    beforeEach(async function () {
      // 添加一篇测试文章
      const price = ethers.parseEther("10");
      const link = "https://example.com/article1";
      await blogShop.addArticle(price, link);

      // 授权BlogShop合约使用买家的代币
      await jtCoin.connect(buyer).approve(
        await blogShop.getAddress(),
        ethers.parseEther("1000")
      );
    });

    it("用户应该能购买文章", async function () {
      const articleId = 1n;
      const article = (await blogShop.getAllArticles())[0];

      await expect(blogShop.connect(buyer).purchaseArticle(articleId))
        .to.emit(blogShop, "ArticlePurchased")
        .withArgs(buyer.address, articleId, article.link);

      // 验证购买记录
      const purchases = await blogShop.getAllPurchases();
      expect(purchases[0].buyer).to.equal(buyer.address);
      expect(purchases[0].articleId).to.equal(articleId);
    });

    it("购买不存在的文章应该失败", async function () {
      await expect(blogShop.connect(buyer).purchaseArticle(999))
        .to.be.revertedWith("this article not exists");
    });

    it("代币余额不足应该无法购买", async function () {
      // 先消耗掉买家的代币
      await jtCoin.connect(buyer).transfer(
        seller.address,
        await jtCoin.balanceOf(buyer.address)
      );

      await expect(blogShop.connect(buyer).purchaseArticle(1))
        .to.be.reverted;
    });
  });

  describe("查询功能", function () {
    beforeEach(async function () {
      // 添加多篇测试文章
      await blogShop.addArticle(ethers.parseEther("10"), "link1");
      await blogShop.addArticle(ethers.parseEther("20"), "link2");
    });

    it("应该能获取所有文章", async function () {
      const articles = await blogShop.getAllArticles();
      expect(articles.length).to.equal(2);
      expect(articles[0].link).to.equal("link1");
      expect(articles[1].link).to.equal("link2");
    });

    it("应该能获取文章总数", async function () {
      expect(await blogShop.getArticleCount()).to.equal(2n);
    });

    it("应该能获取购买记录", async function () {
      // 先进行一次购买
      await jtCoin.connect(buyer).approve(
        await blogShop.getAddress(),
        ethers.parseEther("1000")
      );
      await blogShop.connect(buyer).purchaseArticle(1);

      const purchases = await blogShop.getAllPurchases();
      expect(purchases.length).to.equal(1);
      expect(purchases[0].buyer).to.equal(buyer.address);
    });
  });
});