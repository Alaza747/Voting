const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting contract", function () {
  let 
    Voting, 
    voting, 
    owner, 
    addr1,
    addr2,
    addrs;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1, addr2,...addrs] = await ethers.getSigners();
    voting = await Voting.deploy();
    await voting.deployed();
  });

  it("Should create a new vote", async function () {
    const question = "Favourite Number?";
    const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    await voting.createVote(question, options);
    const vote = await voting.getVote(1);
    expect(vote.voteQuestion).to.equal(question);
    expect(vote.voteOptions).to.deep.equal(options);
    expect(vote.openStatus).to.equal(true);
  });

});