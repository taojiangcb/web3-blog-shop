// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InfoContract {
    string name = "77";
    uint256 age = 1;

    event Instruction(string name, uint256);

    function sayHi() public view returns(string memory) {
        string memory res = "Hi";
        return (res);
    }

    function setInfo(string memory _name, uint256 _age) public {
        name = _name;
        age = _age;
        emit Instruction(_name, _age);
    }

    function getInfo() public view returns (string memory, uint256) {
        return (name, age);
    }

     function getInfo2() public view returns (uint256) {
        return 1000;
    }
}
