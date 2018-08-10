function swapSide(fromDiv, toDiv) {
	// swaps pieceToMove & goToDiv info
	console.log('ENTERS swapSide()');
	// handles blue pawn evolution modal window
	if ( (fromDiv.dataset.name === 'pawn') && (toDiv.id[1] === '0') ) {
		document.querySelector('#modalBlue').classList.toggle('showModal');
		document.getElementById('blueQueen').addEventListener('click', pawnEvolve);	
		document.getElementById('blueKnight').addEventListener('click', pawnEvolve);
		document.getElementById('blueRook').addEventListener('click', pawnEvolve);
		document.getElementById('blueBishop').addEventListener('click', pawnEvolve);
	} // handles orange pawn evolution modal window
	else if ( (fromDiv.dataset.name === 'pawn') && (toDiv.id[1] === '7') ) {
		document.querySelector('#modalOrange').classList.toggle('showModal');
		document.getElementById('orangeQueen').addEventListener('click', pawnEvolve);
		document.getElementById('orangeKnight').addEventListener('click', pawnEvolve);
		document.getElementById('orangeRook').addEventListener('click', pawnEvolve);
		document.getElementById('orangeBishop').addEventListener('click', pawnEvolve);
	}
	else { // since no pawn evolution
		noPawnEvolution = true;
		// re-informs goToDiv
		toDiv.setAttribute('data-name', fromDiv.dataset.name);
		toDiv.setAttribute('data-side', fromDiv.dataset.side);
		toDiv.setAttribute('src', fromDiv.src);

		// gets pieceToMove's activeSide index
		index1 = activeSide.indexOf(fromDiv);

		// removes now-empty pieceToMove from activeSide    
		activeSide.splice(index1, 1);

		// updates activeSide & pieces array
		activeSide.push(toDiv);

		// if not an enPassant attack, resets enPassant process
		if (pieceToMove.dataset.name === 'pawn') {
			if (toDiv !== pawnJumpDiv) { enPassantReset(); }
		}
		else { enPassantReset(); }

		// un-informs pieceToMove
		fromDiv.setAttribute('data-name', 'empty');
		fromDiv.setAttribute('data-side', 'empty');
		fromDiv.setAttribute('src', './images/transparent.png');
		fromDiv.removeEventListener('click', wherePieceCanMove);
	}
	console.log('EXITS swapSide()');
}