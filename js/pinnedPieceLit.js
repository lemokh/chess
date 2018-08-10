function pinnedPieceLit() {
	console.log('ENTERS pinnedPieceLit()');
	// ---------------------------------------------------
	if (pieceToMove.dataset.name === 'knight') { return; }
	// ---------------------------------------------------
	// assigns pinned pieceToMove's pinnerPiece
	for (let i = 0; i < pinnedPieces.length; i++) {
		if (pieceToMove === pinnedPieces[i].pinned) {
			pinnerPiece = pinnedPieces[i].pinner;
			break;
		}
	}
	// ---------------------------------------
	if (pieceToMove.dataset.name === 'pawn') {
		if (pieceToMove.dataset.side === 'blue') {
			if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).dataset === 'empty') {
				pinnedLitIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));
				if (pieceToMove.id[1] === '6') {
					if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 2)).dataset === 'empty') {
						pinnedLitIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));
					}
				}
			}
		} 
		else {
			if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 1)).dataset === 'empty') {
				pinnedLitIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));
				if (pieceToMove.id[1] === '1') {
					if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 2)).dataset === 'empty') {
						pinnedLitIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 2));
					}
				}
			}
		}
	}
	else { // since either a bishop, rook, or queen
		// if pieceToMove can eat its pinnerPiece
		if (checkingSpace(pieceToMove, pinnerPiece.id)) {
			pinnedLitIds.push(pinnerPiece.id);
		}
		console.log('pathOfCheck -->');  console.log(pathOfCheck);
		// includes ids from pieceToMove to its pinning piece
		pinnedLitIds.push(...pathOfCheck);
		// ---------------------------------------------
		// includes ids from pieceToMove to its own king
		checkingSpace(pieceToMove, activeKing.id);
		pinnedLitIds.push(...pathOfCheck);
		console.log('pinnedLitIds -->');  console.log(pinnedLitIds);
		// ---------------------------------------------------------
		if (pinnedLitIds.length) {
			pinnedLitIds.forEach( pinnedLitId => {
				litPiece = document.getElementById(pinnedLitId);
				litPiece.classList.add('lit');
				litPiece.addEventListener('click', movePiece);
			});
		}
	}
}