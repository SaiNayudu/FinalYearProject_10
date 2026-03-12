const hre = require("hardhat");

async function main() {
  const MediaVerification = await hre.ethers.getContractFactory("MediaVerification");
  const contract = await MediaVerification.deploy();

  await contract.waitForDeployment();

  console.log("MediaVerification deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
