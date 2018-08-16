import pawnLit from './pawnLit.js';
import knightLit from './knightLit.js';
import bishopLit from './bishopLit.js';
import rookLit from './rookLit.js';
import kingLit from './kingLit.js';

export default function possibleMoves() {
	console.log('ENTERS possibleMoves()');
	// populates litIds with piece's possible moves
	switch (pieceToMove.dataset.name) {
		case 'pawn':    pawnLit();				break;
		case 'knight':  knightLit();			break;
		case 'bishop':  bishopLit();            break;
		case 'rook':    rookLit();              break;
		case 'queen':   bishopLit(); rookLit(); break;
		case 'king':    kingLit();              break;
		// default: alert('default ERROR! pieceToMove is empty');
	}
}