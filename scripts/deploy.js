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

// ----------------------------------------------------------------------------------------------------  
  // Deployment
  console.log(`Deployed to ${vote.address}`);

// ----------------------------------------------------------------------------------------------------
  // Create Votes
  await vote.createVote("Favourite Number?", ["0","1","2","3","4","5","6","7","8","9","10"])
  await vote.createVote("Favourite Color?", ["white", "black", "brown", "red", "orange", "yellow", "green", "blue",])
  await vote.createVote("Favourite Word?", ["abc", "def", "ghi"])
  
  // Cast a vote
  await vote.castVote(1, 3);

  
  // Get a Vote
  result = await vote.getVote(3);
  console.log("Vote question: ", result.voteQuestion);
  if(result.openStatus === true) {
    console.log("Vote status: open");
  } else {
    console.log("Vote status: closed");  
  }
  for(i = 0; i < result.voteOptions.length; i++) {
    console.log("Answer option %i: %s", i, result.voteOptions[i]);
  }

  // Close a Vote
  await vote.closeVote(3);
  result = await vote.getVote(3);
  console.log("Vote question: ", result.voteQuestion);
  if(result.openStatus === true) {
    console.log("Vote status: open");
  } else {
    console.log("Vote status: closed");  
  }


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
