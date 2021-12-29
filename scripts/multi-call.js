const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const MultiCall = await hre.ethers.getContractFactory("Multicall");
  const multiCall = await MultiCall.deploy();

  await multiCall.deployed();
  console.log("Deployed: ", multiCall.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });