const { ethers } = require("ethers");
const BlogShop = require('../artifacts/contracts/BlogShop.sol/BlogShop.json')

const dotenv = require("dotenv");
dotenv.config();

const blog_shop_address = process.env.BLOG_ADDRESS_SEPOLIA;
const articles = [
  {
    id: 1,
    title: 'From MonoRepo to Private Verdaccio',
    link: 'https://taojiangcb.github.io/jtblogs/article/%E4%BB%8E-MonoRepo-%E5%88%B0%E7%A7%81%E4%BB%93-Verdaccio/',
    description: 'Build a local privatized npm warehouse for better team collaboration and security',
    price: ethers.parseEther('1'),
    createTime: '2025-01-21',
    image: 'https://res.cloudinary.com/dqpqkayoi/image/upload/v1737645845/1_qy2ucd.jpg'
  },
  {
    id: 2,
    title: 'Decorators and IOC',
    link: "https://taojiangcb.github.io/jtblogs/article/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E8%A3%85%E9%A5%B0%E5%99%A8%E3%80%81reflect-metadata-%E4%B8%8E-IOC-%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC/",
    description: 'In-depth understanding of decorators, reflect-metadata, and IOC control inversion',
    price: ethers.parseEther('1'),
    createTime: '2025-01-16',
    image: 'https://res.cloudinary.com/dqpqkayoi/image/upload/v1737645845/2_eaendw.jpg'
  },
  {
    id: 3,
    title: 'Front-end modular full analysis',
    link: "https://taojiangcb.github.io/jtblogs/article/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96%E5%85%A8%E8%A7%A3%E6%9E%90%EF%BC%9A%E4%BB%8E-CommonJS-%E5%88%B0-Module-Federation/",
    description: 'Take you through the development of front-end modularity and future exploration',
    price: ethers.parseEther('2'),
    createTime: '2025-01-13',
    image: 'https://res.cloudinary.com/dqpqkayoi/image/upload/v1737645845/3_hb8vzh.jpg'
  },
  {
    id: 4,
    title: 'Node.js module loading and execution process',
    link: "https://taojiangcb.github.io/jtblogs/article/Node-js-%E6%A8%A1%E5%9D%97%E5%8A%A0%E8%BD%BD%E4%B8%8E%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B/",
    description: 'It will take you deeper into the module execution flow in nodejs',
    price: ethers.parseEther('2'),
    createTime: '2025-01-09',
    image: 'https://res.cloudinary.com/dqpqkayoi/image/upload/v1737645845/4_xwph6f.jpg'
  },
  {
    id: 5,
    title: 'Jotai principle and implementation',
    link: "https://taojiangcb.github.io/jtblogs/article/%E8%A7%A3%E5%86%B3-React-%E7%8A%B6%E6%80%81%E6%92%95%E8%A3%82%E9%97%AE%E9%A2%98%EF%BC%9AJotai-%E5%8E%9F%E7%90%86%E5%8F%8A%E5%AE%9E%E7%8E%B0/",
    description: 'The key to solving the state tearing problem is to implement fine-grained state management, avoid multiple components sharing the same state, and ensure that only the necessary components are re-rendered',
    price: ethers.parseEther('2'),
    createTime: '2025-01-08',
    image: 'https://res.cloudinary.com/dqpqkayoi/image/upload/v1737645845/5_p5vwto.jpg'
  },
  {
    id: 6,
    title: 'Web security',
    link: "https://taojiangcb.github.io/jtblogs/article/Web-%E5%AE%89%E5%85%A8%EF%BC%9A%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5%E4%B8%8E%E5%B8%B8%E8%A7%81%E5%AE%89%E5%85%A8%E6%9C%BA%E5%88%B6/",
    description: 'In-depth understanding of same-origin policies and common security mechanisms',
    price: ethers.parseEther('2'),
    createTime: '2025-01-08',
    image: 'https://res.cloudinary.com/dqpqkayoi/image/upload/v1737645845/6_tnfe8j.jpg'
  }
]
async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(blog_shop_address, BlogShop.abi, signer);
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const tx = await contract.addArticle(article.price, article.title, article.description, article.image, article.link, article.createTime);
    await tx.wait();
    console.log(`Article ${article.id} created successfully.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
