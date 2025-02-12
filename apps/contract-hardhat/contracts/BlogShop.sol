// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./JTCoin.sol";

// 销售合约
contract BlogShop {
    JTCoin public immutable token;
    address public owner;

    struct Article {
        uint256 id;
        uint256 price;
        string link;
    }

    mapping(uint256 => Article) public articles;
    uint256 public nextArticleId = 1;

    event ArticleAdded(uint256 indexed articleId, uint256 price, string link);
    event ArticlePurchased(
        address indexed buyer,
        uint256 articleId,
        string link
    );
    
    // 接收到 ETH
    event ReceivedETH(address indexed sender, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(JTCoin _token) {
        token = _token;
        owner = msg.sender;
    }

    // 用 ETH 购买 token
    receive() external payable {
        uint256 tokens = msg.value * JTCoin(token).TOKEN_RATE();
        JTCoin(token).mint(msg.sender, tokens);
        emit ReceivedETH(msg.sender, msg.value);
    }

    /** 添加一篇博客 */
    function addArticle(
        uint256 priceInJT,
        string memory link
    ) external onlyOwner {
        uint256 price = priceInJT;
        articles[nextArticleId] = Article(nextArticleId, price, link);
        emit ArticleAdded(nextArticleId, price, link);
        nextArticleId++;
    }

    /** 购买文章 */
    function purchaseArticle(uint256 articleId) external {
        Article memory article = articles[articleId];
        require(article.id != 0, "this article not exists");

        token.transferFrom(msg.sender, address(this), article.price);
        emit ArticlePurchased(msg.sender, articleId, article.link);
    }

    /** 提取 ETH */
    function withdrawETH() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // 提取 JT token
    function withdrawJT() external onlyOwner {
        JTCoin(token).transfer(owner, token.balanceOf(address(this)));
    }

    // 查询合约ETH余额
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function helloWorld() public pure returns (string memory) {
        return "hello world";
    }

    function decimals() public view returns (uint8) {
        return JTCoin(token).decimals();
    }
}
