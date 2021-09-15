const hre = require("hardhat");
const cron = require('node-cron');
const fs = require("fs");

async function execute(avaxPredictionContract) {
  const paused = await avaxPredictionContract.paused();
  console.log('is_contract_paused ', paused);

  const currentEpoch = await (await avaxPredictionContract.currentEpoch()).toNumber();
  console.log('currentEpoch ', currentEpoch);

  let skipped = false;
  if (!paused) {
    const genesisStartOnce = await avaxPredictionContract.genesisStartOnce();
    const genesisLockOnce = await avaxPredictionContract.genesisLockOnce();
    console.log('genesisStartOnce ', genesisStartOnce);
    console.log('genesisLockOnce ', genesisLockOnce);

    if (genesisStartOnce === false) {
      console.log('\nstarting genesis round...');
      try {
        const tx = await avaxPredictionContract.genesisStartRound();
        await tx.wait();
      } catch (error) {
        console.log('error ', error);
      }

      const newEpoch = await (await avaxPredictionContract.currentEpoch()).toNumber();
      console.log('Current epoch now: ', newEpoch);
      skipped = true;
    }

    if (!skipped && genesisLockOnce === false) {
      console.log('\nlocking genesis round...');
      try {
        const tx = await avaxPredictionContract.genesisLockRound();
        await tx.wait();
      } catch (error) {
        console.log('error ', error);
      }

      const newEpoch = await (await avaxPredictionContract.currentEpoch()).toNumber();
      console.log('Current epoch now: ', newEpoch);
      skipped = true;
    }

    if (!skipped && genesisStartOnce && genesisLockOnce) {
      console.log('\nExecuting round...');
      try {
        const tx = await avaxPredictionContract.executeRound();
        await tx.wait();
      } catch (error) {
        console.log('error ', error);
      }

      const newEpoch = await (await avaxPredictionContract.currentEpoch()).toNumber();
      console.log('Current epoch now: ', newEpoch);
      skipped = true;
    }
  }
}
async function main() {
  const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

  const signer = await hre.ethers.provider.getSigner(config.adminAddress);
  const avaxPredictionContract = await hre.ethers.getContractAt(
    'AvaxPrediction',
    config.avaxPredictionContract,
    signer
  );

  await execute(avaxPredictionContract);

  setInterval(async () => {
    await execute(avaxPredictionContract);
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
