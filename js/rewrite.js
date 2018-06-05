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
				// and if not activeKing
				if (activePiece.getAttribute('data-name') !== 'king') {
					// ------------------------------------------------
					pieceToMove = activePiece; // IMPORTANT!
					// -------------------------------------
					// if activePiece checks kingAttacker
					if (checkingSpace(activePiece, kingAttackerId)) {
						// ------------------------------------------
						mate = false;
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
				// if activePiece can eat kingAttacker
				if (checkingSpace(activePiece, kingAttackers[0].id)) {
					// -----------------------------------------------
					canEatKingAttacker.push(activePiece);
				}
			}
		});
	} // this doesn't apply to activeKing

	//================================
	function interceptKingAttacker() {	
		// -------------------------------------
		greyLitPieces = [...canEatKingAttacker];
		// -------------------------------------
		canBlockPathOfCheck.forEach(obj => {
			// ---------------------------------
			greyLitPieces.push(obj.pathBlocker);
		});
		// ----------------------------------------
		if (!greyLitPieces.length) {
			if (!kingMovesOutOfCheck.length) {
				console.log('line 432 --> endOfGame');
				endOfGame();
			}
		}
		// ----------------------------------------
		else { // since able to prevent check mate
			// ------------------------------------
			mate = false;
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
		console.log('king can move out of check');
		// ---------------------------------------
		kingMovesOutOfCheck = litDivs;
		// ---------------------------------
		activeKing.classList.add('greyLit');
		activeKing.addEventListener('click', selectGreyPiece);
		// ---------------------------------------------------
		
		kingAttackers.forEach(kingAttacker => {
			// --------------------------------
			eatOrBlock(kingAttacker.id);
			// THIS DOES NOT WORK HERE?
			// WRITE SOMETHING NEW?
		});
		
		// ---------------------
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
		eatOrBlock(kingAttackers[0].id);
		// -----------------------------------------------------
		// discerns whether an activePiece can prevent checkmate
		mate = true;
		// ---------------------
		interceptKingAttacker();
		// -----------------------
		if (mate) {
			console.log('line 496 --> endOfGame');
			endOfGame();
		}
	}
	// -----------------------------------------------------------
	// checkmate since multiple kingAttackers and king cannot move
	else {
		console.log('line 493 --> endOfGame');
		endOfGame();
	}
}