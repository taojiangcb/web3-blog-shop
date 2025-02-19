// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./JTCoin.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// 销售合约
contract BlogShop is AccessControl {
    // 代币地址
    JTCoin public immutable tokenAddress;
    address public owner;

    // 角色权限
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    // 文章结构
    struct Article {
        uint256 id;
        uint256 price;
        string title;
        string description;
        string image;
        string link;
        string createTime;
    }

    struct PurchasedListItem {
        Article article;
        uint256 count;
        bool isBought;
    }

    // 文章列表
    mapping(uint256 => Article) public articles;
    uint256 public nextArticleId = 1;
    uint256[] public articleIds;

    /** 购买记录 */
    struct Purchase {
        uint256 purchaseId;
        address buyer;
        uint256 articleId;
    }
    // 购买记录列表
    mapping(uint256 => Purchase) public purchases;
    uint256 nextPurchaseId = 1;
    uint256[] public purchaseIds;

    // 购买记录统计
    mapping(uint256 => uint256) public purchaseCount;

    // 添加文章事件
    event ArticleAdded(
        address indexed sender,
        uint256 indexed articleId,
        string title
    );

    // 移除文章事件
    event RemovedArticle(
        address indexed sender,
        uint256 indexed articleId,
        string title
    );

    // 清除所有文章事件
    event ClearArticles(address indexed sender);

    // 购买文章事件
    event ArticlePurchased(
        address indexed buyer,
        uint256 articleId,
        string link
    );

    constructor(JTCoin _address) {
        tokenAddress = _address;
        owner = msg.sender;
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /** 添加一篇博客 */
    function addArticle(
        uint256 price,
        string memory title,
        string memory description,
        string memory image,
        string memory link,
        string memory createTime
    ) external onlyRole(MINTER_ROLE) {
        Article memory article = Article(
            nextArticleId,
            price,
            title,
            description,
            image,
            link,
            createTime
        );
        articles[nextArticleId] = article;
        emit ArticleAdded(msg.sender, nextArticleId, title);
        articleIds.push(nextArticleId);
        nextArticleId++;
    }

    /** 清除所有文章 */
    function clearArticles() external onlyRole(MINTER_ROLE) {
        for (uint256 i = 0; i < articleIds.length; i++) {
            delete articles[articleIds[i]];
        }
        delete articleIds;
        emit ClearArticles(msg.sender);
    }

    /** 删除一篇文章 */
    function removeArticle(
        uint256 articleId
    ) external onlyRole(MINTER_ROLE) returns (bool) {
        Article memory article = articles[articleId];
        require(article.id != 0, "this article not exists");
        delete articles[articleId];
        emit RemovedArticle(msg.sender, articleId, article.title);
        return true;
    }

    function setPrice(
        uint256 articleId,
        uint256 price
    ) external onlyRole(MINTER_ROLE) returns (bool) {
        Article memory article = articles[articleId];
        require(article.id != 0, "this article not exists");
        articles[articleId].price = price;
        return true;
    }

    function setTitle(
        uint256 articleId,
        string memory title
    ) external onlyRole(MINTER_ROLE) returns (bool) {
        Article memory article = articles[articleId];
        require(article.id != 0, "this article not exists");
        articles[articleId].title = title;
        return true;
    }

    function setLink(
        uint256 articleId,
        string memory link
    ) external onlyRole(MINTER_ROLE) returns (bool) {
        Article memory article = articles[articleId];
        require(article.id != 0, "this article not exists");
        articles[articleId].link = link;
        return true;
    }

    function setDescription(
        uint256 articleId,
        string memory description
    ) external onlyRole(MINTER_ROLE) returns (bool) {
        Article memory article = articles[articleId];
        require(article.id != 0, "this article not exists");
        articles[articleId].description = description;
        return true;
    }

    /** 购买文章 */
    function purchaseArticle(uint256 articleId) external {
        Article memory article = articles[articleId];
        require(article.id != 0, "this article not exists");

        uint256 allowance = tokenAddress.allowance(msg.sender, address(this));
        require(allowance >= article.price, "allowance not enough");

        uint256 balanceJT = tokenAddress.balanceOf(msg.sender);
        require(balanceJT >= article.price, "balance not enough");

        // 消费
        // tokenAddress.consumeToken(msg.sender, article.price);
        require(
            tokenAddress.transferFrom(msg.sender, address(this), article.price),
            "transferFrom failed"
        );

        // 产生一条购买记录
        purchases[nextPurchaseId] = Purchase(
            nextPurchaseId,
            msg.sender,
            articleId
        );

        // 购买记录统计
        purchaseCount[articleId]++;

        emit ArticlePurchased(msg.sender, articleId, article.link);
        purchaseIds.push(nextPurchaseId);
        nextPurchaseId++;
    }

    /** 清除所有购买记录 */
    function clearAllPurchase() external onlyRole(MINTER_ROLE) {
        for (uint256 i = 0; i < purchaseIds.length; i++) {
            delete purchases[purchaseIds[i]];
        }
        delete purchaseIds;
    }

    /** 提取 ETH */
    function withdrawETH() external onlyRole(MINTER_ROLE) {
        payable(owner).transfer(address(this).balance);
    }

    /** 提取 JT */
    function withdrawJT() external onlyRole(MINTER_ROLE) {
        tokenAddress.transferFrom(
            address(this),
            owner,
            tokenAddress.balanceOf(address(this))
        );
    }

    // 查询合约ETH
    function getContractETH() public view returns (uint256) {
        return address(this).balance;
    }

    // 查询合约JT
    function getContractJT() public view returns (uint256) {
        return tokenAddress.balanceOf(address(this));
    }

    // 获取所有文章
    function getAllArticles() public view returns (Article[] memory) {
        Article[] memory allArticles = new Article[](articleIds.length);
        for (uint256 i = 0; i < articleIds.length; i++) {
            allArticles[i] = articles[articleIds[i]];
        }
        return allArticles;
    }

    // 获取所有文章和购买次数
    function getArticleItemsForBuy()
        public
        view
        returns (PurchasedListItem[] memory)
    {
        PurchasedListItem[] memory shopingItems = new PurchasedListItem[](
            articleIds.length
        );

        for (uint256 i = 0; i < articleIds.length; i++) {
            shopingItems[i] = PurchasedListItem(
                articles[articleIds[i]],
                purchaseCount[articleIds[i]],
                false
            );
        }
        return shopingItems;
    }

    // 获取文章总数
    function getArticleCount() public view returns (uint256) {
        return articleIds.length;
    }

    // 所有消费记录
    function getAllPurchases() public view returns (Purchase[] memory) {
        Purchase[] memory allPurchases = new Purchase[](purchaseIds.length);
        for (uint256 i = 0; i < purchaseIds.length; i++) {
            allPurchases[i] = purchases[purchaseIds[i]];
        }
        return allPurchases;
    }

    function getPurchaseCount() public view returns (uint256) {
        return purchaseIds.length;
    }

    // 查询当前用户的所有购买记录
    function getPUrchaseByBuyer(
        address buyer
    ) public view returns (Purchase[] memory) {
        Purchase[] memory allPurchases = new Purchase[](purchaseIds.length);
        for (uint256 i = 0; i < purchaseIds.length; i++) {
            if (purchases[purchaseIds[i]].buyer == buyer) {
                allPurchases[i] = purchases[purchaseIds[i]];
            }
        }
        return allPurchases;
    }
}
