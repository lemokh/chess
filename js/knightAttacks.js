import knightSpaces from './knightSpaces.js';
import onBoardNonActiveIds from './onBoardNonActiveIds.js';

// exports to checkingSpace.js
export default function knightAttacks(knight) {

	function attacks(id) {
		if (id === checkSpaceId) { return id; }
	}
	
	if (knightSpaces(knight).filter(onBoardNonActiveIds).filter(attacks).length) {
		return true; 
	}
} // returns true/false if knight can attack checkSpaceId
