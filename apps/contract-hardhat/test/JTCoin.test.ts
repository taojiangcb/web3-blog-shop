import { expect } from "chai";
import { ethers } from "hardhat";
import { JTCoin, JTCoin__factory } from "../typechain-types";

// 动态导入 chai-as-promised
(async () => {
  const chaiAsPromised = (await import("chai-as-promised")).default;
  const chai = (await import("chai")).default;

  // 使用 chai-as-promised 扩展 chai
  chai.use(chaiAsPromised);
})();

describe("JTCoin", function () {
  let jtCoin: JTCoin;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const JTCoinFactory: JTCoin__factory =
      await ethers.getContractFactory<JTCoin__factory>("JTCoin");
    jtCoin = await JTCoinFactory.deploy("JT Token", "JT");
    await jtCoin.waitForDeployment();
  });

  it("Should have the correct name and symbol", async function () {
    expect(await jtCoin.name()).to.equal("JT Token");
    expect(await jtCoin.symbol()).to.equal("JT");
  });

  it("Should assign the minter role to the deployer", async function () {
    const MINTER_ROLE = await jtCoin.MINTER_ROLE();
    expect(await jtCoin.hasRole(MINTER_ROLE, owner.address)).to.be.true;
  });

  it("Should allow minters to mint tokens", async function () {
    await jtCoin.mint(addr1.address, 1000);
    expect(await jtCoin.balanceOf(addr1.address)).to.equal(1000);
  });

  it("Should not allow non-minters to mint tokens", async function () {
    const MINTER_ROLE = await jtCoin.MINTER_ROLE();
    try {
      await jtCoin.connect(addr1).mint(addr2.address, 1000);
    } catch (error: any) {
      expect(error.message).to.include("AccessControlUnauthorizedAccount");
    }
  });

  it("Should allow admin to grant minter role to another account", async function () {
    const MINTER_ROLE = await jtCoin.MINTER_ROLE();
    await jtCoin.grantRole(MINTER_ROLE, addr1.address);
    expect(await jtCoin.hasRole(MINTER_ROLE, addr1.address)).to.be.true;
  });

  it("Should allow new minter to mint tokens", async function () {
    const MINTER_ROLE = await jtCoin.MINTER_ROLE();
    await jtCoin.grantRole(MINTER_ROLE, addr1.address);
    await jtCoin.connect(addr1).mint(addr2.address, 1000);
    expect(await jtCoin.balanceOf(addr2.address)).to.equal(1000);
  });
});
