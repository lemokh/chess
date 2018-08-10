function endOfGame() {
	
	clearInterval(runTimer);
	activeKing.classList.add('checkMate');
	board.classList.add('noClick');
	
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});

	alert(activeKing.dataset.side + ' KING CHECKMATED!');
	console.log(activeKing.dataset.side + ' KING CHECKMATED!');
	console.log('END OF GAME');
}