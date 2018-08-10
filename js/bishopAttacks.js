function bishopAttacks(bishop) {
	// checks for clear path between bishop.id & checkSpaceId
	bishopMoves = []; // collects spaces bishop attacks enroute to checkSpaceId
	nails = []; // collects possible pinnedPieces
	
	bishopX = +bishop.id[0];
	bishopY = +bishop.id[1];

	// bishop & checkSpaceId cannot have the same id
	if (bishop.id === checkSpaceId) { return false; }

	// collects ids between bishop & checkSpaceId
	if (+bishop.id[0] < +checkSpaceId[0]) {
		// bishop attacks in a southEast diagonal
		if (+bishop.id[1] < +checkSpaceId[1]) {
			// if bishop's path aligns with checkSpaceId
			if (+checkSpaceId[0] - +bishop.id[0]
			=== +checkSpaceId[1] - +bishop.id[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] + 1) + (+checkSpaceId[1] + 1).toString();
				}
				// collects bishop's attack path to checkSpaceId
				while ( bishopX < (+checkSpaceId[0] - 1) ) {
					bishopX += 1;
					bishopY += 1;
					bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop can't checkSpaceId
		}
		else { // since bishop attacks in a northEast diagonal
			// if bishop aligns with checkSpaceId
			if ( +checkSpaceId[0] - +bishop.id[0]
			=== +bishop.id[1] - +checkSpaceId[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] + 1) + (+checkSpaceId[1] - 1).toString();							
				}
				// collects bishop's attack path to checkSpaceId
				while ( bishopX < (+checkSpaceId[0] - 1) ) {
					bishopX += 1;
					bishopY -= 1;
					bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop cannot checkSpaceId
		}
	}
	else { // since bishop attacks in a southWest diagonal
		if (+bishop.id[1] < +checkSpaceId[1]) {
			// if bishop aligns with checkSpaceId
			if ( +bishop.id[0] - +checkSpaceId[0]
			=== +checkSpaceId[1] - +bishop.id[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] - 1) + (+checkSpaceId[1] + 1).toString();							
				}
				// collects bishop's attack path to checkSpaceId
				while ( bishopX > (+checkSpaceId[0] + 1) ) {
					bishopX -= 1;
					bishopY += 1;
					bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop can't checkSpaceId
		}
		else { // since bishop attacks in a northWest diagonal
			// if bishop aligns with checkSpaceId
			if ( +bishop.id[0] - +checkSpaceId[0]
			=== +bishop.id[1] - +checkSpaceId[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] - 1) + (+checkSpaceId[1] - 1).toString();
				}
				// collects bishop's attack path to checkSpaceId
				while ( bishopX > (+checkSpaceId[0] + 1) ) {
					bishopX -= 1;
					bishopY -= 1;
					bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop can't attack king
		}
	}
	console.log('bishopMoves -->');  console.log(bishopMoves);
	
	if (bishopMoves.length) {
		// populates nails with pieces that block bishop's path to checkSpaceId
		bishopMoves.forEach(bishopMove => {
			if (onBoard(bishopMove)) {
				blocker = document.getElementById( bishopMove );
				if (blocker.dataset.side !== 'empty') {
					nails.push(blocker);
				}
			}
		});
		console.log('nails -->');  console.log(nails);
	}
	// note: nails may contain pieces from both sides
	// returns true/false if no piece blocks bishop's path to checkSpaceId
	if (!nails.length) {
		// pathOfCheck array becomes bishop's id route to checkSpaceId
		pathOfCheck = bishopMoves;
		console.log('pathOfCheck -->');  console.log(pathOfCheck);
		return true; // bishop can attack checkSpaceId
	}
	if (nails.length === 1) {
		if (checkSpaceId === activeKing.id) {
			// if that nail & bishop aren't on the same side
			if (nails[0].dataset.side !== bishop.dataset.side) {
				if (nails[0] !== activeKing) {
					// collects bishop & nails[0]
					pinnedPieces.push(
						{ pinner: bishop, pinned: nails[0] }
					);
					// sets dataset.pinned & dataset.pinner for nails[0]
					nails[0].setAttribute('data-pinned', true);
					
					// alert(nails[0].dataset.side + ' ' + nails[0].dataset.name + ' IS PINNED');
					console.log('pinnedPieces -->');  console.log(pinnedPieces);
				}
			}
		}
	}
	return false; // bishop cannot attack checkSpaceId
} // returns true/false... if bishop can attack checkSpaceId,
// that is, if no piece blocks bishop's path to checkSpaceId
