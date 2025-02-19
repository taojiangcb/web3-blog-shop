const { ethers } = require("ethers");
const BlogShop = require('../artifacts/contracts/BlogShop.sol/BlogShop.json')

// JSON_RPC_LOCAL=http://127.0.0.1:8545
// PRIVATE_KEY_LOCAL=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
// BLOG_ADDRESS_LOCAL=0xFD6F7A6a5c21A3f503EBaE7a473639974379c351
const dotenv = require("dotenv");
dotenv.config();

const blog_shop_address = process.env.BLOG_ADDRESS_LOCAL;

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.JSON_RPC_LOCAL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY_LOCAL, provider);
  const contract = new ethers.Contract(blog_shop_address, BlogShop.abi, signer);
  const tx = await contract.clearArticles();
  await tx.wait();
  console.log(`Articles cleared successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
