// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "src/coins.sol";
import "src/assets.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SellTokens is Ownable {
    uint256 private _nextTokenId;
    uint256 private _listedNfts;
    uint256 public listingPrice=0.0025 ether;

    mapping(uint256=>mapping(address=>MarketItem)) idToMarketItem;
    mapping(address => uint256) private sellerEarnings;

    struct MarketItem { 
        uint256 tokenID;
        address sellerAdderess;
        address nftContractaddress;
        address paymentAddress;
        uint256 price;
        bool active;
    }

    constructor() Ownable(msg.sender) {}
 
    function listNft(address _nftContractAddress,address _ERC20address,uint256 _tokenID, uint256 _price) public payable {
        require(msg.value<listingPrice,"Insufficient Balance");
        require(IERC721(_nftContractAddress).ownerOf(_tokenID)==msg.sender, "You are not ownder of this NFT!!!");
        //IERC721(_nftContractAddress).transferFrom(msg.sender,address(this),_tokenID);
        _listedNfts++;
        idToMarketItem[_tokenID][_nftContractAddress]=MarketItem(_tokenID,msg.sender,_nftContractAddress,_ERC20address,_price,true); 
        if(msg.value>listingPrice){
            uint256 remainingAmount=msg.value-listingPrice;
            (bool sent,)=msg.sender.call{value:remainingAmount}("");
            require(sent,"insufficient Balance");
        }
    }

    function purchaseNft(address nftAddress, uint256 tokenId) public payable {
        MarketItem memory listedItem = idToMarketItem[tokenId][nftAddress];
        require(msg.value < listedItem.price);
        sellerEarnings[listedItem.sellerAdderess] += msg.value;
        delete (idToMarketItem[tokenId][nftAddress]);
        Assets(nftAddress).transferFrom(listedItem.sellerAdderess, msg.sender, tokenId);
        Coins(listedItem.paymentAddress).assetPurchase(msg.sender,listedItem.sellerAdderess,listedItem.price);
    }

    function withdraw() public onlyOwner() {
        uint256 proceeds = sellerEarnings[msg.sender];
        require(proceeds > 0,"No profits to withdraw");

        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        require(success, "Transfer failed");   
    }


}