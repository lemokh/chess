// imports [knightSpaces.js, onBoard.js] --> exports to checkingSpace.js

function knightAttacks(knight) {

	function attacks(id) {
		if (id === checkSpaceId) { return id; }
	}
	
	if (knightSpaces(knight).filter(onBoardNonActiveIds).filter(attacks).length) {
		return true; 
	}
} // returns true/false if knight can attack checkSpaceId
