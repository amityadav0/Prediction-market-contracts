#!/bin/bash
. $HOME/.bashrc
cd /tmp/Prediction-market-contracts
~/.nvm/versions/node/v16.9.1/bin/npx hardhat run scripts/cron-single.js --network avalanche

