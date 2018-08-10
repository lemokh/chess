function cleanUpAfterFirstClick() {
	// resets litIds on clicking multiple activeSide pieces
	if (pieceToMove !== undefined) {
		// un-lightens & stops click-listening to pieceToMove
		pieceToMove.removeEventListener( 'click', movePiece );
		pieceToMove.classList.remove( 'mainLit' );
		
		// un-lightens, clears out & stops click-listening to litIds
		if (litIds.length) { removeLitDivHandler(movePiece); }
		// un-lightens, clears out & stops click-listening to litIds
		if (pinnedLitIds) {
			pinnedLitIds.forEach( pinnedLitId => {
				litPiece = document.getElementById( pinnedLitId );
				litPiece.classList.remove( 'lit' );
				litPiece.removeEventListener( 'click', movePiece );
			});
		}
		
		// un-lightens, clears out & stops click-listening to castleIds
		if (castleIds.length) { // if king ready to castle
			
			castleIds.forEach(id => { // resets castling process
				document.getElementById( id ).classList.remove( 'castleLit' );
				document.getElementById( id ).removeEventListener( 'click', castling );
			});
			castleIds = [];
		}
	}
}