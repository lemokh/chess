// imports onBoard.js --> exports to checkingSpace.js
function rookAttacks(rook) {
	// checks for clear path between rook.id & checkSpaceId
	rookMoves = []; // collects spaces rook attacks enroute to checkSpaceId
	nails = []; // collects possible pinnedPieces

	// if rook & checkSpaceId share column
	if (rook.id[0] === checkSpaceId[0]) {
		// if rook below checkSpaceId, rook.y++
		if (+rook.id[1] < +checkSpaceId[1]) {
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = checkSpaceId[0] + (+checkSpaceId[1] + 1);
			}
			for (let i = +rook.id[1] + 1; i < +checkSpaceId[1]; i++) {
				rookMoves.push( checkSpaceId[0] + i );
			}
		}
		else { // since rook is above checkSpaceId, rook.id[1]--
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = checkSpaceId[0] + (+checkSpaceId[1] - 1);
			}
			for (let i = +rook.id[1] - 1; i > +checkSpaceId[1]; i--) {
				rookMoves.push( checkSpaceId[0] + i );
			}
		}
	} // pushes column spaces between rook & checkSpaceId to rookMoves

	// else if rook & checkSpaceId share row
	else if (rook.id[1] === checkSpaceId[1]) {
		// if rook left of checkSpaceId, rook.id[0]++
		if (+rook.id[0] < +checkSpaceId[0]) {
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = (+checkSpaceId[0] + 1) + checkSpaceId[1];
			}
			for (let i = +rook.id[0] + 1; i < +checkSpaceId[0]; i++) {
				rookMoves.push( i + checkSpaceId[1] );
			}
		}
		else { // since rook right of checkSpaceId, rook.id[0]--
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = (+checkSpaceId[0] - 1) + checkSpaceId[1];
			}
			for (let i = +rook.id[0] - 1; i > +checkSpaceId[0]; i--) {
				rookMoves.push( i + checkSpaceId[1] );
			}
		}
	}  // pushes row spaces between rook & checkSpaceId to rookMoves
	
	else { return false; } // rook can't checkSpaceId
	// console.log('rookMoves -->');  console.log(rookMoves);
	if (rookMoves.length) {
		// populates nails with pieces that block rook's path to checkSpaceId
		rookMoves.forEach(rookMove => {
			if (onBoard(rookMove)) {
				blocker = document.getElementById( rookMove );
				if (blocker.dataset.side !== 'empty') {
					if (rookMove !== behindKingId) {
						nails.push(blocker);
					}
				}
			}
		});
		console.log('nails -->');  console.log(nails);
	}
	// returns true/false if no piece blocks rook's path to checkSpaceId
	if (!nails.length) { // nails can be both sides
		// pathOfCheck array becomes rook.id route to checkSpaceId
		if (rook.dataset.name === 'queen') {
			pathOfCheck.push( ...rookMoves);
		}
		else { pathOfCheck = rookMoves; }
		return true; // rook can attack checkSpaceId
	}
	if (nails.length === 1) { // if only one nail
		if (checkSpaceId === activeKing.id) {
			// if that nail & rook aren't on the same side
			if (nails[0].dataset.side !== rook.dataset.side) {
				
				pinnedPieces.push(
					{ pinner: rook, pinned: nails[0] }
				);

				nails[0].setAttribute('data-pinned', true);
				
				// alert(nails[0].dataset.side + ' ' + nails[0].dataset.name + ' IS PINNED');
				console.log('pinnedPieces -->');  console.log(pinnedPieces);
			}
		}
	}
	return false; // rook cannot attack checkSpaceId
} // returns true/false if rook can attack checkSpaceId
