const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

  const signer = await hre.ethers.provider.getSigner(config.adminAddress);
  const harmonyPredictionContract = await hre.ethers.getContractAt(
    'HarmonyPrediction',
    config.harmonyPredictionContract,
    signer
  );

  await harmonyPredictionContract.pause();
  console.log("Contract Paused!!");

  await harmonyPredictionContract.unpause();
  console.log("Contract unpaused!!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });