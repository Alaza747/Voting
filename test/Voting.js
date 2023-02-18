const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting contract", function () {
  let
    Voting,
    voting;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
    await voting.deployed();
  });

  it("Should create a new vote", async function () {
    const question = "Favourite Number?";
    const options = ["1", "2", "3", "4", "5", "6", "7", "8", "abc", "def"];
    await voting.createVote(question, options);
    const vote = await voting.getVote(1);

    expect(vote[0]).to.equal(question);
    expect(vote[1]).to.deep.equal(options);
    expect(vote[2]).to.equal(true);
  });

  // ----------------------------------------------------------------

  describe("Functionality Tests", function () {
    beforeEach(async function () {
      const question = "Favourite Number?";
      const options = ["1", "2", "3", "4", "5", "6", "7", "8", "abc", "def"];
      await voting.createVote(question, options);
    })

    it("Should be able to cast a vote and update the vote Count correctly", async function () {
      await voting.castVote(1, 3);
      await voting.castVote(1, 3);
      await voting.castVote(1, 3);
      const vote = await voting.getVote(1);

      const result = await voting.getVoteCount(1, 3);
      expect(result.toNumber()).to.equal(3);

      const result2 = await voting.getVoteCount(1, 4);
      expect(result2.toNumber()).to.equal(0);
    })

    it("Should revert the castVote transaction if the vote is closed and leave voteCount unchanged", async function () {
      const errorMessage = "The vote is closed, i'm sorry";
      await voting.closeVote(1);
      await expect(voting.castVote(1, 1)).to.be.revertedWith(errorMessage);

      const result = await voting.getVoteCount(1, 1);
      expect(result.toNumber()).to.equal(0);
    })

    it("Should change the openStatus to false when the vote is closed", async function () {
      const result = await voting.getVote(1);
      expect(result[2]).to.equal(true);

      await voting.closeVote(1);

      const result1 = await voting.getVote(1);
      expect(result1[2]).to.equal(false);
    })

    it("Should leave openStatus as false when closeVote is called multiple times", async function () {
      const result = await voting.getVote(1);
      expect(result[2]).to.equal(true);

      await voting.closeVote(1);
      await voting.closeVote(1);

      const result1 = await voting.getVote(1);
      expect(result1[2]).to.equal(false);
    })
  })

  // ----------------------------------------------------------------

  describe("Events Tests", function () {
    beforeEach(async function () {
      const question = "Favourite Number?";
      const options = ["1", "2", "3", "4", "5", "6", "7", "8", "abc", "def"];
      await voting.createVote(question, options);
    })

    it("Should emit a VoteCreated event when there is a new vote created", async function () {
      const question2 = "Test Question?";
      const options2 = ["1", "2", "3", "4", "5", "6"];

      const result = await voting.createVote(question2, options2);
      const event = await result.wait();
      expect(event.events[0].event).to.equal("VoteCreated");
    })

    it("Should emit a VoteCast event when there is a new cast", async function () {
      const result = await voting.castVote(1, 3);
      const event = await result.wait();
      expect(event.events[0].event).to.equal("VoteCast");
      expect(event.events[0].args.option.toNumber()).to.equal(3);
      expect(event.events[0].args.voteId.toNumber()).to.equal(1);
    })

    it("Should emit a VoteClosed event when a vote was closed", async function () {
      const result = await voting.closeVote(1);
      const event = await result.wait();
      expect(event.events[0].event).to.equal("VoteClosed");
      expect(event.events[0].args.voteId.toNumber()).to.equal(1);
    })
  })
});
