import onBoard from './onBoard.js';

export default function onBoardNonActiveIds(id) {
	if (onBoard(id)) {
		if (findingKingAttackers) {
			if ( document.getElementById( id ).dataset.side 
			!== passiveSide[0].dataset.side ) { return id; }
		}
		else {
			if ( document.getElementById( id ).dataset.side 
			!== activeKing.dataset.side ) { return id; }
		}
	}
} // knightLit & knightAttacks helper