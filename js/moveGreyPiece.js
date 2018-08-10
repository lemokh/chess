// imports [toggleSides, eat, swapSide, selectGreyPiece]
// exports to moveGreyPiece.js

function moveGreyPiece(e) {
	
	console.log('ENTERS moveGreyPiece()');
	
	// resets greyPieceToMove
	greyPieceToMove.classList.remove('mainLit');
	greyPieceToMove.classList.remove('preventMateLit');

	if (greyPieceToMove.dataset.name === 'king') {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById( id );
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	}

	// clears and resets greyLitPieces
	greyLitPieces.forEach(greyLitPiece => {
		greyLitPiece.removeEventListener('click', selectGreyPiece);
		greyLitPiece.classList.remove('preventMateLit');
	});
	greyLitPieces = [];

	removeLitDivHandler(moveGreyPiece);

	if (e.target.dataset.side !== 'empty') { eat(e.target); }

	swapSide(greyPieceToMove, e.target);

	toggleSides();
}