// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Coins is ERC20 {
    address private immutable _owner;
    error NotOwner();

    modifier onlyOwner() {
        require(msg.sender == _owner, NotOwner());
        _;
    }


    constructor() ERC20("Coins", "CN") {
        _owner=msg.sender;
        _mint(msg.sender, 1000);
    }

    function mintCoins(address addr,uint256 amount) public onlyOwner {
        _mint(addr, amount);
    }


// add a check for asset contract
    function assetPurchase(address from, address to, uint256 amount) public {
        _transfer(from, to, amount);
    }
}