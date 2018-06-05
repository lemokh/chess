//=================
function isMate() { 
	// since activeKing is in check...
	// --------------------------------------------------------------------------------
	console.log('ENTERS isMate()');  console.log('litDivs -->');  console.log(litDivs);
	// --------------------------------------------------------------------------------
	checkPath = pathOfCheck;
	// ----------------------
	pieceToMove = activeKing;
	
	//===================================
	function eatOrBlock(kingAttackerId) {
		console.log('ENTERS eatOrBlock()');
		// populates canEatKingAttacker & canBlockPathOfCheck, excluding activeKing
		activePieceIsPinned = false;
		// ------------------------------------------------------------------------
		activeSide.forEach(activePiece => {
			// if activePiece not pinned
			for (let i = 0; i < pinnedPieces.length; i++) {
				// ------------------------------------------
				if (pinnedPieces[i].pinned === activePiece) {
					// --------------------------------------
					activePieceIsPinned = true;
					break;
				}
			}
			if (!activePieceIsPinned) {
				// and if activePiece is not activeKing
				if (activePiece.getAttribute('data-name') !== 'king') {
					// ------------------------------------------------
					pieceToMove = activePiece; // IMPORTANT!
					// -------------------------------------
					// if activePiece checks kingAttacker
					if (checkingSpace(activePiece, kingAttackerId)) {
						// ------------------------------------------
						mate = false;  
						console.log(activePiece.id+' can eat '+kingAttacker.id);
						// ----------------------------------
						canEatKingAttacker.push(activePiece);
					}
					// -----------------------------
					// prevents pawns from attacking
					pawnBlocksKingAttacker = true;
					// --------------------------------------
					// sees if activePiece can move to pathId
					checkPath.forEach(pathId => {
						// --------------------------------------
						if (checkingSpace(activePiece, pathId)) {
							// ----------------------------------
							mate = false;
							console.log(activePiece.id+' can block at '+pathId);
							// ----------------------
							canBlockPathOfCheck.push(
								// ---------------------------------------------
								{ pathBlocker: activePiece, emptyDivId: pathId }
							);
						}
					});
					// ----------------------------
					pawnBlocksKingAttacker = false;
				}
			}
			else { // since activePiece is pinned
				console.log(activePiece.id+' is pinned');
				// if activePiece can eat kingAttacker
				if (checkingSpace(activePiece, kingAttackers[0].id)) {
					// -----------------------------------------------
					canEatKingAttacker.push(activePiece);
					console.log(activePiece.id+' can eat '+kingAttackers[0].id);
				}
			}
		});
	} // doesn't apply to activeKing

	//================================
	function interceptKingAttacker() {
		console.log('ENTERS interceptKingAttacker()');
		// -------------------------------------
		greyLitPieces = [...canEatKingAttacker];
		
		console.log(greyLitPieces);
		// -------------------------------------
		canBlockPathOfCheck.forEach(obj => {
			// ---------------------------------
			greyLitPieces.push(obj.pathBlocker);
		});

		console.log(greyLitPieces);
		// ----------------------------------------
		if (!greyLitPieces.length) {
			if (!kingMovesOutOfCheck.length) {
				console.log('since no greyLitPieces and king stuck...endOfGame 1');
				endOfGame();
			}
		}
		// ----------------------------------------
		else { // since able to prevent check mate
			// ------------------------------------
			mate = false;
			console.log('since there are greyLitPieces, no check mate');
			// ------------------------------------
			kingAttackers.forEach(kingAttacker => {
				// ---------------------------------------------
				// lightens & click-listens to each greyLitPiece
				greyLitPieces.forEach(greyLitPiece => {
					// -----------------------------------
					greyLitPiece.classList.add('greyLit');
					// -----------------------------------------------------
					greyLitPiece.addEventListener('click', selectGreyPiece);
				});
			});
		}
	}
	// ---------------------------------------------------------------
	// populates litDivs where activeKing can move via checkingSpace()
	kingLit();
	// --------------------------
	// if king can move, not mate
	if (litDivs.length) {
		// --------------
		mate = false;
		// ---------------------------------------
		console.log('king can move, no check mate');
		// ---------------------------------------
		kingMovesOutOfCheck = litDivs;
		// ---------------------------------
		activeKing.classList.add('greyLit');
		activeKing.addEventListener('click', selectGreyPiece);
		// ---------------------------------------------------
		
		kingAttackers.forEach(kingAttacker => {
			// --------------------------------
			console.log('eatOrBlock('+kingAttacker.id+');');
			eatOrBlock(kingAttacker.id);
			// THIS DOES NOT WORK HERE?
			// WRITE SOMETHING NEW?
		});
		// ---------------------
		console.log('interceptKingAttacker();')
		interceptKingAttacker();
	}
	// ----------------------------------------------------------
	// since activeKing cannot move, if only one kingAttacker...
	// checkmate if activeSide cannot eat or block a kingAttacker
	// ----------------------------------------------------------
	else if (kingAttackers.length === 1) {
		// ---------------------------------------------
		console.log('king unable to move out of check');
		// -----------------------------
		console.log('eatOrBlock('+kingAttackers[0].id+');');
		eatOrBlock(kingAttackers[0].id);
		// -----------------------------------------------------
		// discerns whether an activePiece can prevent checkmate
		mate = true;  console.log('mate = true');
		// ---------------------
		console.log('interceptKingAttacker();');
		interceptKingAttacker();
		// -----------------------
		if (mate) {
			console.log('since only one kingAttacker, king stuck & mate is true... endOfGame 2');
			endOfGame();
		}
	}
	// -----------------------------------------------------------
	// checkmate since multiple kingAttackers and king cannot move
	else {
		console.log('since multiple kingAttackers & king stuck... endOfGame 3');
		endOfGame();
	}
}