//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

interface IBatchRegistry {
	function checkIn() external;
}

contract CheckIn {
	IBatchRegistry batchRegistry;

	constructor(address _batchRegistryAddress) {
		batchRegistry = IBatchRegistry(_batchRegistryAddress);
	}

	function callCheckIn() public {
		// This function will call the checkIn function of the BatchRegistry contract
		batchRegistry.checkIn();
	}
}
