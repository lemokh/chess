function kingLit() {
	// highlights all possible moves for activeKing
	console.log('ENTERS kingLit()');

	passiveSideCoversId = false;

	// covers king castling
	if (!testingDraw) {
		if (!kingAttackers.length) { // if king not in check
			if (pieceToMove.dataset.side === 'blue') {
				if (!blueKingFirstMove) {
					if (!blueRook1FirstMove) {
						if (['17', '27', '37'].every(id => document.getElementById(id).dataset.side === 'empty')) {
							noCastle = false;

							for (let i = 0; i < 3; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['17', '27', '37'][i])) {
										noCastle = true;
									}
								}
							}
							if (!noCastle) { castleIds.push('27'); }
						}
					}
					if (!blueRook2FirstMove) {
						if (['57', '67'].every(id => document.getElementById(id).dataset.side === 'empty')) {
							noCastle = false;

							for (let i = 0; i < 2; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['57', '67'][i])) {
										noCastle = true;
									}
								}
							}
							if (!noCastle) { castleIds.push('67'); }
							console.log(castleIds);
						}
					}
				}
			}
			else { // since activeSide is orange
				if (!orangeKingFirstMove) {
					if (!orangeRook1FirstMove) {
						if (['10', '20', '30'].every(id => document.getElementById(id).dataset.side === 'empty')) {
							for (let i = 0; i < 3; i++) {
								noCastle = false;

								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['10', '20', '30'][i])) {
										noCastle = true;
									}
								}
							}  if (!noCastle) { castleIds.push('20'); }
						}
					}
					if (!orangeRook2FirstMove) {
						if (['50', '60'].every(id => document.getElementById(id).dataset.side === 'empty')) {
							noCastle = false;

							for (let i = 0; i < 2; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['50', '60'][i])) {
										noCastle = true;
									}
								}
							}
							if (!noCastle) { castleIds.push('60'); }
						}
					}
				}
			}
		}
	}
	
	// lightens & click-listens all castleIds
	if (castleIds.length) { // if king is castling
		castleIds.forEach(id => {
			document.getElementById(id).classList.add('castleLit');
			document.getElementById(id).addEventListener('click', castling);
		});
	}
	// whether or not king can castle, king must be able to move
	kingSpaces = [
		pieceToMove.id[0] + (+pieceToMove.id[1] - 1),
		pieceToMove.id[0] + (+pieceToMove.id[1] + 1),
		(+pieceToMove.id[0] - 1) + pieceToMove.id[1],
		(+pieceToMove.id[0] + 1) + pieceToMove.id[1],
		(+pieceToMove.id[0] - 1) + (+pieceToMove.id[1] - 1).toString(),
		(+pieceToMove.id[0] - 1) + (+pieceToMove.id[1] + 1).toString(),
		(+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] - 1).toString(),
		(+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] + 1).toString()
	].map(space => { // keeps only on-board kingSpaces
		if (onBoard(space)) { // if space is on the board
			if (kingInCheck) {
				if (space !== behindKingId) { return space; }
			}
			else { return space; }
		}
	}).filter(item => { return item !== undefined; });

	console.log('kingSpaces -->');  console.log(kingSpaces);

	// excludes activePiece occupied spaces from kingSpaces array
	openAndOpponentHeldKingSpaces = kingSpaces.filter(kingSpace => {
		// for each kingSpace & each activePiece
		return !activeSide.some(activePiece => {
			// adds kingSpace to oAOHKS array if no activePiece there 
			return (kingSpace === activePiece.id);
		});
	});
	
	console.log('openAndOpponentHeldKingSpaces -->');
	console.log(openAndOpponentHeldKingSpaces);

	// populates litIds with safe kingSpaces
	openAndOpponentHeldKingSpaces.forEach(id => {
		passiveSideCoversId = false;
		// for each oAOHKS & each passivePiece
		for (let i = 0; i < passiveSide.length; i++) {

			if (passiveSide[i].id !== id) {
				// if a passivePiece can check that oAOHKS...(kingSpace id devoid of activePiece)
				if (checkingSpace(passiveSide[i], id)) {
					console.log(passiveSide[i].dataset.side + ' ' + passiveSide[i].dataset.name + ' can attack ' + id);

					passiveSideCoversId = true;
					break;
					
				}
			}
		}
		if (!passiveSideCoversId) { litIds.push(id); }
	});
	console.log('litIds -->');  console.log(litIds);
}  // fills litIds with ids where king can move