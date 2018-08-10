// imports [cleanUpAfterFirstClick, movePiece, pinnedPieceLit, possibleMoves, addLitDivHandler]
// exports to index.js

function wherePieceCanMove(e) {
	// if not first click of this turn
	if (newPieceClicked !== undefined) {
		// on-clicking new piece, enables clicking prior clicked piece
		newPieceClicked.addEventListener('click', wherePieceCanMove);
	}
	newPieceClicked = e.target;
	// disables re-clicking this piece until new piece clicked
	e.target.removeEventListener('click', wherePieceCanMove);
	// ------------------------------------------------------
	cleanUpAfterFirstClick();
	// ----------------------------------------
	if (!enPassanting) { goToDiv = undefined; }
	// ----------------------------------------
	pieceToMove = e.target;
	pieceToMove.classList.add('mainLit');
	// --------------------------------------
	// lights where pinned pieceToMove can go
	if (pieceToMove.dataset.pinned === 'true') { pinnedPieceLit(); }
	else {
		possibleMoves();
		if (litIds.length) { addLitDivHandler(movePiece); }
	}
}