// nothing to import --> exports to moveGreyPiece.js

function eat(piece) {
	console.log('ENTERS eat('+piece+')');
	// eat(goToDiv); --> normal pawn attack
	// eat(pawnJumpDiv); --> enPassant attack

	// puts piece in its takenBox
	if (activeKing.dataset.side === 'blue') {
		document.getElementById(
			blueTakenBoxIdCounter.toString()
		).src = piece.src;

		blueTakenBoxIdCounter -= 1;
	}
	else { // since orange turn, does the same
		document.getElementById(
			orangeTakenBoxIdCounter.toString()
		).src = piece.src;

		orangeTakenBoxIdCounter -= 1;
	}

	// gets piece's passiveSide index
	index2 = passiveSide.indexOf(piece);

	// removes piece from passiveSide array
	passiveSide.splice(index2, 1);

	console.log('EXITS eat()');
}