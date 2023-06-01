// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {
    event DonationReceived(address indexed donor, uint256 amount);

    function donate() external payable {
        emit DonationReceived(msg.sender, msg.value);
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
