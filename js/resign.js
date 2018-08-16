import wherePieceCanMove from './wherePieceCanMove.js';

export default function resign() {
	clearInterval(runTimer);
	board.classList.add('noClick');
	
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});
	
	alert(activeKing.dataset.side + " resigns");
	console.log('END OF GAME');
}