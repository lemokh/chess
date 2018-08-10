// imports toggleSides
// exports to swapSide.js

function pawnEvolve(e) {
	// uses pieceToMove for pawn & e.target for new piece
	console.log('ENTERS pawnEvolve(e)');
	// re-informs goToDiv
	goToDiv.setAttribute('data-name', e.target.dataset.name);
	goToDiv.setAttribute('data-side', e.target.dataset.side);
	goToDiv.setAttribute('src', e.target.src);

	// gets pieceToMove's activeSide index
	index1 = activeSide.indexOf(pieceToMove);

	// removes now-empty pieceToMove from activeSide    
	activeSide.splice(index1, 1);

	// updates activeSide & pieces array
	activeSide.push(goToDiv);

	// un-informs pieceToMove
	pieceToMove.setAttribute('data-name', 'empty');
	pieceToMove.setAttribute('data-side', 'empty');
	pieceToMove.setAttribute('src', './images/transparent.png');

	// closes modal window
	if (e.target.dataset.side === 'blue') {
		document.getElementById('modalBlue').classList.toggle("showModal");
	}
	else if (e.target.dataset.side === 'orange') { 
		document.getElementById('modalOrange').classList.toggle("showModal");
	}

	toggleSides();
	console.log('EXITS pawnEvolve(e)');
}