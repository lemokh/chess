// imports [bishopAttacks.js, rookAttacks.js] --> exports to checkingSpace.js

function queenAttacks(queen) {
    
	if (bishopAttacks(queen, checkSpaceId)) { return true; }
	if (rookAttacks(queen, checkSpaceId)) { return true; }
	return false;
} // returns true/false if queen can attack checkSpaceId
