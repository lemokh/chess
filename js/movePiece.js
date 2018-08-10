function movePiece(e) {

	console.log('ENTERS movePiece(e)');

	console.log('removes click-listener from litIds & pieceToMove');

	// removes click-listener from pieceToMove
	pieceToMove.removeEventListener( 'click', wherePieceCanMove );

	// un-lightens mainDiv
	pieceToMove.classList.remove( 'mainLit' );

	if (pieceToMove.dataset.pinned === 'true') {
		pinnedLitIds.forEach( pinnedLitId => {
			litPiece = document.getElementById( pinnedLitId );
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', movePiece );
		});
	}
	else { removeLitDivHandler(movePiece); }

	// prevents castling after king's first move
	if (pieceToMove.dataset.name === 'king') {
		if (pieceToMove.dataset.side === 'blue') {
			blueKingFirstMove = true;
		} 
		else { orangeKingFirstMove = true; }
	}
	
	// prevents castling after rook's first move
	if (pieceToMove.dataset.name === 'rook') {
		if (pieceToMove.dataset.side === 'blue') {
			if (pieceToMove.id === '07') { blueRook1FirstMove = true; }
			else if (pieceToMove.id === '77') { blueRook2FirstMove = true; }
		} 
		else {
			if (pieceToMove.id === '00') { orangeRook1FirstMove = true; }
			else if (pieceToMove.id === '70') { orangeRook2FirstMove = true; }
		}
	}
	console.log('un-lightens mainDiv & litIds');
	
	goToDiv = e.target; // unnecessary, use e.target instead
	
	// console.log('pieceToMove -->');  console.log(pieceToMove);
	// console.log('goToDiv -->');      console.log(goToDiv);
	// console.log('pawnJumpDiv -->');  console.log(pawnJumpDiv);
	
	// covers enPassant pawn attack
	if (goToDiv.dataset.side === 'empty') {
		console.log('goToDiv IS empty');            

		if (pieceToMove.dataset.name === 'pawn') {
			
			if (enPassanting) {
				if (goToDiv === enPassantDiv) {
					console.log('enPassant pawn attack is happening');
					eat(pawnJumpDiv);                       
					// sets pawnJumpDiv to empty cell
					pawnJumpDiv.setAttribute('data-name', 'empty');
					pawnJumpDiv.setAttribute('data-side', 'empty');
					pawnJumpDiv.setAttribute('src', './images/transparent.png');
				} 
			}
			// covers bluePawn taking a NON-enPassant empty space
			if (activeKing.dataset.side === 'blue') { // if blue's turn
				// if pawnToMove jumps two spaces
				if (goToDiv.id === (pieceToMove.id[0] + (pieceToMove.id[1] - 2))) {
					enPassanting = true;
					console.log('enPassanting = true');

					pawnJumpDiv = goToDiv;
					console.log('pawnJumpDiv = goToDiv');
				}
			}
			else { // since orange's turn
				// if pawnToMove jumps two spaces
				if (goToDiv.id === (pieceToMove.id[0] + (+pieceToMove.id[1] + 2))) {
					enPassanting = true;
					console.log('enPassanting = true');

					pawnJumpDiv = goToDiv;
					console.log('pawnJumpDiv = goToDiv');
				}
			}
		}
	}
	else { // covers pieceToMove eats goToDiv
		console.log('since goToDiv is NOT empty, pieceToMove eats goToDiv');
		eat(goToDiv);
	}
	// covers pawnToMove moving one or two empty spaces
	swapSide(pieceToMove, goToDiv);
	if (noPawnEvolution) { toggleSides(); }
	else {
		// removes click-listeners from activePieces
		activeSide.forEach(activePiece => {
			activePiece.removeEventListener('click', wherePieceCanMove);
		});
	}
	console.log('EXITS movePiece(e)');
}