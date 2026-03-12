const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contractABI = [
  "function registerMedia(string memory _mediaHash, bool _isAI, uint8 _confidence) public",
  "function verifyMedia(string memory _mediaHash) public view returns (bool,uint8,uint256,address)"
];

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  wallet
);

module.exports = contract;
