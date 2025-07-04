// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "contracts/newERC20.sol";

interface IAssets {
    error PriceNotSet();
    error NotOwner();

    event Price(uint256 tokenID, uint256 price);

    function mintAssets(uint256 tokenID) external;

    function setPrice(uint256 tokenID,uint256 assetCost) external;

    function getPrice(uint256 tokenID) view external returns (uint256);

    function buyAsset(uint256 tokenID) external;

}

contract Assets is ERC721, IAssets { 
    Coins private immutable _coins; // make this immutable
    mapping (uint256 => uint256) private _assetPrices; // update var name    

    modifier onlyOwner(address tokenOwner) {
        require(msg.sender == tokenOwner, NotOwner());
        _;
    }

    constructor(address coinAddress) ERC721("Asset", "AS") {
        _coins=Coins(coinAddress);
    }

    function mintAssets(uint256 tokenID) public {
        _mint(msg.sender, tokenID);
    }

    function setPrice(uint256 tokenID,uint256 assetCost) public onlyOwner(ownerOf(tokenID)) {
        _assetPrices[tokenID] = assetCost;
        emit Price(tokenID,assetCost);
    }

// make this external (why)
    function getPrice(uint256 tokenID) view external returns (uint256) {
        return _assetPrices[tokenID];
    }

// external
    function buyAsset(uint256 tokenID) external {
        address owner=ownerOf(tokenID);
        uint256 cost=_assetPrices[tokenID];

        if(cost==0){
            revert PriceNotSet(); // move custom error to interface
        }

        _coins.assetPurchase(msg.sender, owner, cost);
        
        _transfer(owner, msg.sender, tokenID);

    }
} 