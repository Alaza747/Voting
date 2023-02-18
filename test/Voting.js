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
    const options = ["1", "2", "3", "4", "5", "6", "7", "8", "abc", "def"];
    await voting.createVote(question, options);
    
    const vote = await voting.getVote(1);
    console.log(vote);


    expect(vote[0]).to.equal(question);
    expect(vote[1]).to.deep.equal(options);
    expect(vote[2]).to.equal(true);
  });

  // describe("Other functions", function () {
  //   beforeEach(async function () {
  //     const question = "Favourite Number?";
  //     const options = ["1", "2", "3", "4", "5", "6", "7", "8", "abc", "def"];
  //     await voting.createVote(question, options);
  //   })
    
  //   it("Should be able to cast a vote", async function () {
  //     await voting.castVote(1, 3);
  //     const vote = await voting.getVote(1);
  //     console.log(vote);
  //     // expect(vote.voteCount[3].to.equal(1));
  //   })

  // })



});