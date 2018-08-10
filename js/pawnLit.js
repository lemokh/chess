function pawnLit() {
	console.log('enters pawnLit()');
	// highlights all possible moves for blue pawnToMove
	if (activeKing.dataset.side === 'blue') {
		// if enPassant attack is possible, covers enPassant attack
		if (enPassanting) { // same as: if (pawnJumpDiv.length) ?
			// if bluePawnToMove is beside pawnJump,
			if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
			|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
				// adds bluePawnToMove's enPassant-attack-div to litIds
				enPassantDiv = document.getElementById(
					pawnJumpDiv.id[0] + (pawnJumpDiv.id[1] - 1) 
				);
				litIds.push( enPassantDiv.id );
			}
		}
		// collects potential normal attack divs
		passiveSide.forEach(passivePiece => {
			// if passivePiece is one row ahead of blue pawnToMove
			if (passivePiece.id[1] == (pieceToMove.id[1] - 1)) {
				// if passivePiece is right beside blue pawnToMove
				if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
					litIds.push(passivePiece.id);
				}
				// if passivePiece is left beside blue pawnToMove
				if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
					litIds.push(passivePiece.id);
				}
			}
		});
		// collects empty space one ahead of blue pawnToMove
		if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).dataset.side === 'empty') { 
			litIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));

			// collects empty space two ahead of blue pawnToMove
			// if blue pawnToMove in row 6
			if (pieceToMove.id[1] === '6') {
				// if empty cell two ahead of blue pawnToMove
				if (document.getElementById(pieceToMove.id[0]
				+ (pieceToMove.id[1] - 2)).dataset.side === 'empty') {
					litIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));
				}
			}
		}
	}
	else { // since orange's turn
		// if enPassant attack is possible
		if (enPassanting) { // same as if pawnJumpDiv.length?
			if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
			|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
				// adds enPassant attack div to litIds
				enPassantDiv = document.getElementById(
					pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1)
				);
				litIds.push( enPassantDiv.id );
			}
		}
		// collects potential normal attack divs
		passiveSide.forEach(passivePiece => {
			// if passivePiece is one row ahead of orange pawnToMove
			if (passivePiece.id[1] == (+pieceToMove.id[1] + 1)) {
				// if passivePiece is right beside orange pawnToMove
				if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
					litIds.push(passivePiece.id);
				}
				// if passivePiece is left beside orange pawnToMove
				if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
					litIds.push(passivePiece.id);
				}
			}
		});
		
		if (document.getElementById(
			pieceToMove.id[0] + (+pieceToMove.id[1] + 1)
		).dataset.side === 'empty') {
			// collects empty space one ahead of orange pawnToMove
			litIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));
			
			// collects empty space two ahead of orange pawnToMove
			if (pieceToMove.id[1] === '1') { // if orange pawnToMove in row 1
				// if empty cell two ahead of orange pawnToMove
				if (document.getElementById(
					pieceToMove.id[0] + (+pieceToMove.id[1] + 2)
				).dataset.side === 'empty') {
					// pushes that empty cell to litIds array
					litIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 2));
				}
			}
		}
	}
} // fills litIds with ids where pawn can move