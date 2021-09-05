const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Avax Prediction Market", function () {

  let AvaxPredictionFactory;
  let avaxPredictionContract;

  // depoyment parameters
  let oracleAddress;
  let adminAddress;
  let operatorAddress;
  let intervalSeconds;
  let bufferSeconds;
  let minBetAmount;
  let oracleUpdateAllowance;
  let treasuryFee;

  // setup factory and contracts
  beforeEach(async function () {
    const [oracle, admin, operator] = await ethers.getSigners();
    oracleAddress = oracle.address;
    adminAddress = admin.address;
    operatorAddress = operator.address;
    intervalSeconds = 5 * 60;
    bufferSeconds = 1 * 60;
    minBetAmount = 100 // wei
    oracleUpdateAllowance = 1 * 60;
    treasuryFee = 500; // 5%

    AvaxPredictionFactory = await ethers.getContractFactory("AvaxPrediction");
    avaxPredictionContract = await AvaxPredictionFactory.deploy(
      oracleAddress,
      adminAddress,
      operatorAddress,
      intervalSeconds,
      bufferSeconds,
      minBetAmount,
      oracleUpdateAllowance,
      treasuryFee
    );
  });

  it("Should revert deployment if treasury fee too high", async function () {
    await expect(
      AvaxPredictionFactory.deploy(
        oracleAddress,
        adminAddress,
        operatorAddress,
        intervalSeconds,
        bufferSeconds,
        minBetAmount,
        oracleUpdateAllowance,
        2000 // 20%
      )
    ).to.be.revertedWith("Treasury fee too high");
  });
});
