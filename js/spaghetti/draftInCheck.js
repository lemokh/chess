function inCheck() {

	console.log('ENTERS inCheck()');
	console.log('behindKingId -->');  console.log(behindKingId);

	console.log('litIds -->');  console.log(litIds);

	kingInCheck = true;

	checkPath = pathOfCheck;
	
	console.log('checkPath -->');  console.log(checkPath);

	// if (checkPath.includes(behindKingId)) {
	// 	checkPath.splice(checkPath.indexOf(behindKingId), 1);
	// }
	console.log('checkPath -->');  console.log(checkPath);

	pieceToMove = activeKing;
	kingLit(); // fills litIds with ids where activeKing can move
	
	console.log('greyLitPieces -->');  console.log(greyLitPieces);

	// if king can move, handles moving activeKing
	if (litIds.length) {

		// kingLitIds = litIds that are not in checkPath
		kingLitIds = litIds.filter(litId =>
			!checkPath.some( id => litId === id )
		);

		// checkPath = checkPath ids that are not in litIds
		checkPath = checkPath.filter(id =>
			!litIds.some( litId => id === litId )			
		);
		
		litIds = kingLitIds;
		console.log('litIds -->'); console.log(litIds);
		
		console.log('checkPath -->');  console.log(checkPath);
		console.log('litIds -->');  console.log(litIds);
		console.log('kingLitIds -->');  console.log(kingLitIds);

		greyLitPieces.push(activeKing);
		activeKing.classList.add('preventMateLit');
		activeKing.addEventListener('click', selectGreyPiece);
		
		console.log('greyLitPieces -->');  console.log(greyLitPieces);
	}
	else { kingStuck = true; }
	
	if (kingAttackers.length === 1) { // if only one kingAttacker
		/////////////////////////////////////////////////////
		// populates canEatKingAttacker & canBlockPathOfCheck
		activeSide.forEach(activePiece => {
			pieceToMove = activePiece; // IMPORTANT
			// for each activePiece, if not pinned
			if (activePiece.dataset.pinned === 'false') {
				// if not activeKing
				if (activePiece.dataset.name !== 'king') {
					//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
					// if activePiece checks kingAttacker
					if (checkingSpace(activePiece, kingAttackers[0].id)) {
						console.log(activePiece.id+' can eat '+kingAttackers[0].id);

						canEatKingAttacker.push(activePiece);
					}
					//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
					// prevents pawns from attacking
					pawnBlocksKingAttacker = true;
					// sees if activePiece can move to pathId
					checkPath.forEach(pathId => {
						if (checkingSpace(activePiece, pathId)) {
							console.log(activePiece.id+' can block at '+pathId);

							canBlockPathOfCheck.push(
								{ pathBlocker: activePiece, emptyDivId: pathId }
							);
						}
					});
					pawnBlocksKingAttacker = false;
				}
			}
			// pinnedPiece can only attack in line of its pinner path to king
			else { // since activePiece is pinned
				console.log(activePiece.id+' is pinned');
				pinnedPieceLit();
				return;
			}
		}); // excludes activeKing
		//////////////////////////
		// ------------------------------------
		// begins interceptKingAttacker() logic
		// -------------------------------------
		greyLitPieces.push(...canEatKingAttacker);
		
		console.log('greyLitPieces');  console.log(greyLitPieces);
		
		canBlockPathOfCheck.forEach(obj => {
			greyLitPieces.push(obj.pathBlocker);
		});
		
		console.log('greyLitPieces');  console.log(greyLitPieces);
		
		if (!greyLitPieces.length) {
			if (kingStuck) {
				console.log('since no greyLitPieces and king stuck...endOfGame 1');
				endOfGame();
			}

		}
		else { // since able to prevent check mate
			console.log('since only one kingAttacker and at least one greyLitPiece, no check mate');
				// lightens & click-listens to each greyLitPiece
				greyLitPieces.forEach(greyLitPiece => {
					greyLitPiece.classList.add('preventMateLit');
					greyLitPiece.addEventListener('click', selectGreyPiece);
				});
		}
	}
	else { // since multiple kingAttackers, only moving activeKing prevents checkmate
		if (kingStuck) { return endOfGame(); } // checkmate if king stuck
		else { addLitDivHandler(selectGreyPiece); } // move activeKing
	}
}