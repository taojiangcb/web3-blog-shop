// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// JT 代币合约
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract JTCoin is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public TOKEN_RATE = 1000; // 1 ETH = 1000 JT
    address public owner;

    // the max supply of JT token, 1 million, 1 ETH = 1000 JT
    uint256 public constant MAX_SUPPLY = 1000000 * 10 ** 18;

    string NAME = "JTCoin";
    string SYMBOL = "JT";

    event RemitToken(address indexed sender, uint256 amount); // reemit token
    event ReceivedETH(address indexed sender, uint256 amount); // receive ETH
    event ConsumeToken(address indexed sender, uint256 amount); // consume token
    event MintToken(address indexed sender, address to, uint256 amount); // mint token
    event Withdraw(
        address indexed sender,
        string indexed coinType,
        uint256 amount
    ); // withdraw

    constructor() ERC20(NAME, SYMBOL) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        owner = msg.sender;
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
        emit MintToken(msg.sender, to, amount);
    }

    function mint_1000000() public {
        mint(address(this), 1000000 * 10 ** decimals());
    }

    function mint_100() public {
        mint(address(this), 100 * 10 ** decimals());
    }

    // 添加便于管理的函数
    function grantMinterRole(address account) external onlyRole(MINTER_ROLE) {
        grantRole(MINTER_ROLE, account);
    }

    function hasMinterRole(address account) public view returns (bool) {
        return hasRole(MINTER_ROLE, account);
    }

    // current token pool
    function getTokenPool() public view returns (uint256) {
        return balanceOf(address(this));
    }

    /** remit token to user */
    function remitToken(address to, uint256 amount) private returns (bool) {
        uint256 tokenPool = getTokenPool();
        require(amount < tokenPool, "Insufficient token pool for remit");
        require(tokenPool > 0, "Token pool is empty");

        if (tokenPool > MAX_SUPPLY) {
            uint256 excessTokens = tokenPool - MAX_SUPPLY;
            _burn(address(this), excessTokens);
            tokenPool = MAX_SUPPLY;
        }
        _transfer(address(this), to, amount);
        emit RemitToken(to, amount);
        return true;
    }

    function withdrawETH() external onlyRole(MINTER_ROLE) {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "ETH transfer failed");
        emit Withdraw(owner, "ETH", address(this).balance);
    }

    function withdrawJTCoin() external onlyRole(MINTER_ROLE) {
        uint256 balance = balanceOf(address(this));
        _transfer(address(this), owner, balance);
        emit Withdraw(owner, "JT", balance);
    }

    // // 消耗token
    // function consumeToken(address from, uint256 amount) public returns (bool) {
    //     uint256 tokenBalance = balanceOf(from);
    //     require(amount <= tokenBalance, "Insufficient token balance");
    //     _transfer(from, address(this), amount);
    //     emit ConsumeToken(from, amount);
    //     return true;
    // }

    // 查询合约ETH
    function getContractETH() public view returns (uint256) {
        return address(this).balance;
    }

    /** use ETH to buy JT token */
    function buyTokens() external payable {
        require(msg.value > 0, "Invalid ETH amount");
        uint256 jtTokens = msg.value * TOKEN_RATE;
        uint256 tokenPool = getTokenPool();
        console.log("jtTokens is ", jtTokens);
        require(tokenPool >= jtTokens, "Insufficient token pool");
        remitToken(msg.sender, jtTokens);
        emit ReceivedETH(msg.sender, msg.value);
    }

    // setup token rate
    function setRate(uint256 rate) external onlyRole(MINTER_ROLE) {
        TOKEN_RATE = rate;
    }
}
