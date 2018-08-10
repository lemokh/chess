function toggleSides() {
	// removes click-listeners from activePieces
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});
	if (activeSide[0].dataset.side === 'blue') {
		console.log('toggles activeSide to orange');
		activeSide = oranges;
		passiveSide = blues;
	}
	else { // since activeKing is orange
		console.log('toggles activeSide to blue');
		activeSide = blues;
		passiveSide = oranges;
	}
	lit(); // starts next move 
}