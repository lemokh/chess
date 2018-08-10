function selectGreyPiece(e) {

	if (greyPieceToMove !== undefined) {
		greyPieceToMove.classList.remove('mainLit');
		greyPieceToMove.addEventListener('click', selectGreyPiece);
	}

	console.log('litIds -->'); console.log(litIds);

	// removeLitDivHandler(moveGreyPiece); --> without litIds = []
	if (litIds.length) { // resets each litId of class & click-listeners
		litIds.forEach( id => {
			litPiece = document.getElementById( id );
			// --------------------------------------
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	} litIds = [];

	if (kingLitIds.length) {
		kingLitIds.forEach( id => {
			litPiece = document.getElementById( id );
			// --------------------------------------
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	}

	greyPieceToMove = e.target;
	// temporarily disables clicking of this piece
	greyPieceToMove.removeEventListener('click', selectGreyPiece);
	greyPieceToMove.classList.add('mainLit');

	if (greyPieceToMove.dataset.name === 'king') {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById( id );
			litPiece.classList.add( 'lit' );
			litPiece.addEventListener( 'click', moveGreyPiece );
		});
	}

	if (canEatKingAttacker.includes(e.target)) {
		litIds.push(kingAttackers[0].id);
	}

	canBlockPathOfCheck.forEach(obj => {
		if (obj.pathBlocker === e.target) {
			litIds.push(obj.emptyDivId);
		}
	});

	addLitDivHandler(moveGreyPiece);
}