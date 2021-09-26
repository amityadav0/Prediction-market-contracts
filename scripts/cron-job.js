const hre = require("hardhat");
const cron = require('node-cron');
const fs = require("fs");

async function execute(harmonyPredictionContract) {
  const paused = await harmonyPredictionContract.paused();
  console.log('is_contract_paused ', paused);

  const currentEpoch = await (await harmonyPredictionContract.currentEpoch()).toNumber();
  console.log('currentEpoch ', currentEpoch);

  let skipped = false;
  if (!paused) {
    const genesisStartOnce = await harmonyPredictionContract.genesisStartOnce();
    const genesisLockOnce = await harmonyPredictionContract.genesisLockOnce();
    console.log('genesisStartOnce ', genesisStartOnce);
    console.log('genesisLockOnce ', genesisLockOnce);

    if (genesisStartOnce === false) {
      console.log('\nstarting genesis round...');
      try {
        const tx = await harmonyPredictionContract.genesisStartRound();
        await tx.wait();
      } catch (error) {
        console.log('error ', error);
      }

      const newEpoch = await (await harmonyPredictionContract.currentEpoch()).toNumber();
      console.log('Current epoch now: ', newEpoch);
      skipped = true;
    }

    if (!skipped && genesisLockOnce === false) {
      console.log('\nlocking genesis round...');
      try {
        const tx = await harmonyPredictionContract.genesisLockRound();
        await tx.wait();
      } catch (error) {
        console.log('error ', error);
      }

      const newEpoch = await (await harmonyPredictionContract.currentEpoch()).toNumber();
      console.log('Current epoch now: ', newEpoch);
      skipped = true;
    }

    if (!skipped && genesisStartOnce && genesisLockOnce) {
      console.log('\nExecuting round...');
      try {
        const tx = await harmonyPredictionContract.executeRound();
        await tx.wait();
      } catch (error) {
        console.log('error ', error);
      }

      const newEpoch = await (await harmonyPredictionContract.currentEpoch()).toNumber();
      console.log('Current epoch now: ', newEpoch);
      skipped = true;
    }
  }
}
async function main() {
  const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

  const signer = await hre.ethers.provider.getSigner(config.adminAddress);
  const harmonyPredictionContract = await hre.ethers.getContractAt(
    'harmonyPrediction',
    config.harmonyPredictionContract,
    signer
  );

  await execute(harmonyPredictionContract);

  setInterval(async () => {
    await execute(harmonyPredictionContract);
  }, (config.interval + 15) * 1000);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  // .then(() => process.exit(0))
  // .catch((error) => {
  //   console.error(error);
  //   process.exit(1);
  // });
