// imports all files below
// exports to index.js

function checkingSpace(somePiece, someId) {
	checkSpaceId = someId;
	// sees if somePiece can check someId
	switch (somePiece.dataset.name) {
		case 'pawn':    return pawnAttacks(somePiece);
		case 'knight':  return knightAttacks(somePiece); 
		case 'bishop':  return bishopAttacks(somePiece);
		case 'rook':    return rookAttacks(somePiece);
		case 'queen':   return queenAttacks(somePiece);
		case 'king':    return kingAttacks(somePiece);
	}
} // returns true/false if somePiece can attack someId