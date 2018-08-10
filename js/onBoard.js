function onBoard(id) {
	if (id[0] >= 0) {
		if (id[0] <= 7) {
			if (id[1] >= 0) {
				if (id[1] <= 7) {
					return true;
				}
			}
		}
	}
}

function onBoardNonActiveIds(id) {
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