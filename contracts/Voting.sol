// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Voting {
    // Struct for all future votes, it includes the (string) question, array of options and a mapping for vote count for each option
    struct Vote {
        string voteQuestion;
        string[] voteOptions;
        mapping(uint256 => uint256) voteCount;
        bool openStatus;
    }

    // This event should be emitted when a new vote is created. The event should include the id of the new vote.
    event VoteCreated(uint256 voteId);

    // This event should be emitted when a vote is cast. The event should include the id of the vote and the option that was voted for.
    event VoteCast(uint256 voteId, uint256 option);

    // This event should be emitted when a vote is closed. The event should include the id of the vote.
    event VoteClosed(uint256 voteId);

    // Here is a mapping for votes to their (uint256) IDs
    mapping(uint256 => Vote) public votes;
    uint256 public idVote;

    // This function should create a new vote with the given question and options.
    // The options are represented as an array of uint256 values, each representing the index of the option.
    function createVote(
        string memory _question,
        string[] memory _options
    ) public {
        idVote++;
        Vote storage newVote = votes[idVote];
        newVote.voteQuestion = _question;
        newVote.voteOptions = _options;
        newVote.openStatus = true;

        for (uint i = 0; i < _options.length; i++) {
            newVote.voteCount[i] = 0;
        }
        emit VoteCreated(idVote);
    }

    // This function should return the question, options, and closed status of the vote with the given id.
    function getVote(
        uint256 _voteId
    )
        public
        view
        returns (
            string memory,
            string[] memory,
            bool
        )
    {
        Vote storage vote = votes[_voteId];
        return (vote.voteQuestion, vote.voteOptions, vote.openStatus);
    }

    function getVoteCount(
        uint256 _voteId,
        uint256 _optionId
    )
        public 
        view
        returns (
            uint256
        )
    {
        return votes[_voteId].voteCount[_optionId];
    }

    // This function should cast a vote for the given option in the vote with the given id.
    function castVote(uint256 _voteId, uint256 _option) public {
        Vote storage vote = votes[_voteId];
        require(vote.openStatus == true, "The vote is closed, i'm sorry");
        vote.voteCount[_option]++;
        emit VoteCast(_voteId, _option);
    }

    // This function should close the vote with the given id, after which no more votes can be cast.
    function closeVote(uint256 _voteId) public {
        Vote storage vote = votes[_voteId];
        vote.openStatus = false;
        emit VoteClosed(_voteId);
    }
}
