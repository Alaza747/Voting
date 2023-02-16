// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Voting = await hre.ethers.getContractFactory("Voting");
  const vote = await Voting.deploy();

  await vote.deployed();

  // console.log(`Deployed to ${vote.address}`);

  await vote.createVote("Favourite Number?", [0,1,2,3,4,5,6,7,8,9,10])
  let result = await vote.votes(1);
  // console.log("New Vote added ID[%i] : %s", await vote.idVote(), result);


  await vote.createVote("Favourite Color?", [1, 2])
  result = await vote.votes(2);
  // console.log("New Vote added ID[%i] : %s", await vote.idVote(), result);

  result = await vote.getVote(1);
  // console.log("Vote question: ", result.voteQuestion);  
  // for(i = 0; i < result.voteOptions.length; i++) {
  //   console.log("Answer option %i: %i", i, result.voteOptions[i].toNumber());
  // }

  await vote.castVote(1, 3);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
