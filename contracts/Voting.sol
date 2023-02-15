// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Voting {

    struct Vote {
        string voteQuestion;
        uint256[] voteOptions;
        mapping (uint256 => uint256) voteCount;
    }

    mapping (uint16 => Vote) public votes;
    uint16 public idVote;

    function createVote(string memory _question, uint256[] memory _options) public {
    // This function should create a new vote with the given question and options. 
    // The options are represented as an array of uint256 values, each representing the index of the option.
    idVote++;
    votes[idVote] = 
     


    }

}


// function castVote(uint256 _voteId, uint256 _option) public
// This function should cast a vote for the given option in the vote with the given id.

// function closeVote(uint256 _voteId) public
// This function should close the vote with the given id, after which no more votes can be cast.

// function getVote(uint256 _voteId) public view returns (string memory, uint256[], bool)
// This function should return the question, options, and closed status of the vote with the given id.

// Your contract should also have the following events:

// event VoteCreated(uint256 voteId)
// This event should be emitted when a new vote is created. The event should include the id of the new vote.

// event VoteCast(uint256 voteId, uint256 option)
// This event should be emitted when a vote is cast. The event should include the id of the vote and the option that was voted for.

// event VoteClosed(uint256 voteId)
// This event should be emitted when a vote is closed. The event should include the id of the vote.

// To test your contract, you should also write a series of unit tests that call the contract's functions and assert the expected results.