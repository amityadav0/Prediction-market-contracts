
# Avax Price Prediction Market

[*Avax Price Prediction Market*](https://focused-leavitt-899e39.netlify.app/) is a fun and simple decentralized prediction market.

## Take part in market

It's easy to take part:

* Predict if the price of AVAX/USDT will be higher or lower than it was when the “LIVE” phase starts.
* If you enter an “UP” position, and the AVAX/USDT “Closed Price” is higher than the “Locked Price” at the end of the 5 minute LIVE phase, you WIN! And if it’s lower, you lose.
* If you enter a “DOWN” position, and the AVAX/USDT “Closed Price” is higher than the “Locked Price” at the end of the 5 minute LIVE phase, you LOSE! If it’s lower, you win.

## Guide

Check [prediction-guide.md](./prediction-guide.md) for detailed walkthrough of using AVAX prediction market.

## Config

The following config has been added to `config.json`:
* *avaxPredictionContract*: address of deployed contract
* *oracleAddress*: address of oracle (chainlink AVAX/USDT price feed)
* *adminAddress*: address of admin (and operator) which is the controller
* *interval*: interval of rounds (set to `30 min`)
* *bufferSeconds*: timeperiod for admin/operator to execute rounds
* *oracleUpdateAllowance*
* *treasuryFee*: set as 5%

The network config is set in `hardhat.config.js` (in networks.avalanche)

# UI

Frontend code for this project can be found [here](https://github.com/amityadav0/Prediction-market-ui).
Dapp can be found at [https://focused-leavitt-899e39.netlify.app/](https://focused-leavitt-899e39.netlify.app/).

## RoadMap

UI is referenced from [pancakeswap.finance](https://pancakeswap.finance/), and our focus has been on contracts integration and a smooth flow of an automated price prediction market.

In the future we plan to improve the existing UI and launch a complete dapp on the Avalanche Mainnet. We would love to have a frontend developer to contribute to this project.