function lit(activeSide, passiveSide) {
	// ----------------------------------------------------------------
	litDivs = []; // contains lit ids on which to apply click-listeners
	// --------------------------------------------------------------------
	kingAttackers = []; // contains all passivePieces that check activeKing
	// --------------------------------------------------------------------
	emptySpaces = openSpaces(boardIds, pieces); // updates emptySpaces
	// ---------------------------------------------------------------
	greyPieceToMove = undefined;

	//==========================
	// function toggleClocks() {

	// }
    //====================
    function endOfGame() {
        alert(activeKing.getAttribute('data-side') + ' KING CHECKMATED!');
        // ---------------------------------------------------------------------
		console.log(activeKing.getAttribute('data-side') + ' KING CHECKMATED!');
        // ---------------------------------------------------------------------
		document.getElementById('board').classList.add('noClick');
		// -------------------------------------------------------
		console.log('END OF GAME');
	}
    //======================
    function toggleSides() {
        // removes click-listeners from activePieces
        activeSide.forEach(activePiece => {
			// ------------------------------------------------
            activePiece.removeEventListener('click', pieceLit);
        }); // ------------------------------------------------
        // toggles side & starts next move 
        if (activeKing.getAttribute('data-side') === 'blue') {
            // toggleClocks();
			console.log('toggles activeSide to orange');
			// -----------------------------------------
            lit(oranges, blues);
        } // ------------------- 
        else { // since activeKing is orange
            // toggleClocks();
			console.log('toggles activeSide to blue');
			// ---------------------------------------
            lit(blues, oranges);
        }
	}
	//=================================
	function cleanUpAfterFirstClick() {
		// resets litDivs on clicking multiple activeSide pieces
		if (pieceToMove !== undefined) {
			// un-lightens & stops click-listening to pieceToMove
			pieceToMove.removeEventListener( 'click', movePiece );
			// ---------------------------------------------------
			pieceToMove.classList.remove( 'mainLit' );
			// ----------------------------------------------------------
			// un-lightens, clears out & stops click-listening to litDivs
			if (litDivs.length) {
				// ------------------------
				litDivs.forEach(litDiv => {
					// ---------------------------------------------------------
					document.getElementById( litDiv ).classList.remove( 'lit' );
					// -------------------------------------------------------------------------
					document.getElementById( litDiv ).removeEventListener( 'click', movePiece );
					// -------------------------------------------------------------------------------
					// document.getElementById( litDiv ).removeEventListener( 'click', pinnedPieceEats );
				});
				// ----------
				litDivs = [];
			}
			// --------------------------------------------
			// cleans up after last clicking a pinned piece
			if (pinnedPieces.includes(pieceToMove)) {
				// if (pinCount === 1) { all this below }
				pieceToMove.removeEventListener( 'click', pinnedLit );
				// ---------------------------------------------------------
				pinningPiece.removeEventListener( 'click', pinnedPieceEats );
				// ---------------------------------------------------------
				pinningPiece.classList.remove( 'lit' );
			}
			// ------------------------------------------------------------
			// un-lightens, clears out & stops click-listening to castleIds
			if (castleIds.length) { // if king ready to castle
				// ------------------------------------------------
				castleIds.forEach(id => { // resets castling process
					// -----------------------------------------------------------
					document.getElementById( id ).classList.remove( 'castleLit' );
					// --------------------------------------------------------------------
					document.getElementById( id ).removeEventListener( 'click', castling );
				});
				// ------------
				castleIds = [];
			}
		}
	}
	/*
	//===========================================
	function pinnedPieceAttack(somePinnedPiece) {
		// --------------------------------------
		let pinCounter = 0;
		// ----------------------------------------------
		// counts how many pieces are pinning activePiece
		pinnedPieces.forEach(pinnedPiece => {
			// ------------------------------------------------------------
			if (pinnedPiece.id === somePinnedPiece.id) { pinCounter += 1; }
		});
		console.log(pinCounter);
		// ---------------------
		if (pinCounter === 1) {
			// ------------------------------------------------------------------
			pinningPiece = pinnerPieces[ pinnedPieces.indexOf(somePinnedPiece) ];
			// ------------------------------------------------------------------
			// if somePinnedPiece can eat its pinningPiece
			if (checkingSpace(somePinnedPiece, pinningPiece.id)) {
				// -----------------------------------------------
				cleanUpAfterFirstClick();
				// ---------------------------
				pieceToMove = somePinnedPiece;
				// -----------------------------------======================
				pieceToMove.addEventListener('click', function pinnedLit() {
					// -------------------------------======================
					pieceToMove.classList.add('mainLit');
					// ------------------------------
					pinningPiece.classList.add('lit');
					// ------------------------------------=============================
					pinningPiece.addEventListener('click', function pinnedPieceEats() {
						// --------------------------------=============================
						pieceToMove.removeEventListener('click', pinnedLit);
						// -------------------------------------------------
						pieceToMove.classList.remove('mainLit');
						// -------------------------------------
						pinningPiece.classList.remove('lit');
						// ----------------------------------
						pinningPiece.removeEventListener('click', pinnedPieceEats);
						// --------------------------------------------------------
						eat(pinningPiece);
						// ---------------------------------
						swapSide(pieceToMove, pinningPiece);
						// ---------------------------------
						toggleSides();
					});
				});
			}
		}
	}
	*/
	//===========================
	function selectGreyPiece(e) {
		// ---------------------------------
		if (greyPieceToMove !== undefined) {
			// -----------------------------------------
			greyPieceToMove.classList.remove('mainLit');
		}
		// resets each litDiv
		// ------------------------
		litDivs.forEach(litDiv => {
			// ----------------------------------------
			litSpace = document.getElementById(litDiv);
			// --------------------------------------------------
			litSpace.removeEventListener('click', moveGreyPiece);
			// --------------------------------------------------
			litSpace.classList.remove('lit');
		});
		// ----------
		litDivs = [];
		// ------------------------
		greyPieceToMove = e.target;
		// --------------------------------------
		greyPieceToMove.classList.add('mainLit');
		// -----------------------------------------
		if (canEatKingAttacker.includes(e.target)) {
			// -------------------------------------
			litDivs.push(kingAttacker.id);
		}
		// ---------------------------------
		canBlockPathOfCheck.forEach(obj => {
			// --------------------------------
			if (obj.pathBlocker === e.target) {
				// ----------------------------
				litDivs.push(obj.emptyDivId);
			}
		});
		// ------------------------
		litDivs.forEach(litDiv => {
			// ------------------------------------------
			litSpace = document.getElementById( litDiv );
			// ------------------------------------------
			litSpace.classList.add('lit');
			// -----------------------------------------------
			litSpace.addEventListener('click', moveGreyPiece);
		});
	}
	//=========================
	function moveGreyPiece(e) {
		// resets greyPieceToMove
		// -----------------------------------------
		greyPieceToMove.classList.remove('mainLit');

		// -----------------------------------------
		// clears greyLitDiv pieces
		greyLitPieces.forEach(greyLitPiece => {
			// --------------------------------------------------------
			greyLitPiece.removeEventListener('click', selectGreyPiece);
			// --------------------------------------------------------
			greyLitPiece.classList.remove('greyLit');
		});
		greyLitPieces = [];
		// --------------------
		// clears litDiv spaces
		litDivs.forEach(litDiv => {
			// ------------------------------------------
			litSpace = document.getElementById( litDiv );
			// --------------------------------------------------
			litSpace.removeEventListener('click', moveGreyPiece);
			// --------------------------------------------------
			litSpace.classList.remove('lit');
		});
		litDivs = [];
		// -------------------------------------------------------------------
		if (e.target.getAttribute('data-side') !== 'empty') { eat(e.target); }
		// -------------------------------------------------------------------
		swapSide(greyPieceToMove, e.target);
		// ---------------------------------
		// toggles side & starts next move 
		if (activeKing.getAttribute('data-side') === 'blue') {
			// toggleClocks();
			console.log('toggles activeSide to orange');
			// -----------------------------------------
			lit(oranges, blues);
		} // -------------------
		else { // since activeKing is orange
			// toggleClocks();
			console.log('toggles activeSide to blue');
			// ---------------------------------------
			lit(blues, oranges);
		}
	}
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
			// ------------------------------------------------------------------------
			activeSide.forEach(activePiece => {
				// if activePiece not pinned
				if (!pinnedPieces.includes(activePiece)) {
					// and if not activeKing
					if (activePiece.getAttribute('data-name') !== 'king') {
						// ------------------------------------------------
						pieceToMove = activePiece; // IMPORTANT!
						// -------------------------------------
						// if activePiece checks kingAttacker
						if (checkingSpace(activePiece, kingAttackerId)) {
							// ------------------------------------------
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
						// add kingAttacker's id to litDivs
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
            if (!greyLitPieces.length) { endOfGame(); }
            // ----------------------------------------
            else { // since able to prevent check mate
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
		// -------------------------------
        // if king can move, no check mate
		if (litDivs.length) {
			// ---------------------------------------
            console.log('king can move out of check');
            // ---------------------------------------
            kingAttackers.forEach(kingAttacker => {
                // if king can eat its attacker, collect king
                // ------------------------------------------
                if (litDivs.includes(kingAttacker)) {
                    // ---------------------------------
                    canEatKingAttacker.push(activeKing);
				}
                // -------------------------
				eatOrBlock(kingAttacker.id);
				// THIS DOES NOT WORK HERE, WRITE SOMETHING NEW
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
			// mate = true;
			// ---------------------
			interceptKingAttacker();
			// -----------------------
			// if (mate) { endOfGame(); }
		}
		// -----------------------------------------------------------
		// checkmate since multiple kingAttackers and king cannot move
        else { endOfGame(); }
	}
	//====================
	function castling(e) {
		console.log('enters castling(e)')
		// -------------------------------------------------
		// un-lightens & stops click-listening all castleIds
		castleIds.forEach(id => {
			document.getElementById(id).classList.remove('castleLit');
			document.getElementById(id).removeEventListener('click', castling);
		});
		// -------------------------------------
		pieceToMove.classList.remove('mainLit');
		// -------------------------------------
		castleIds = [];  litDivs = [];
		// ------------------------------------------------
		// castles rook & prevents that side from castling again
		switch (e.target.id) {
			case '27':
				swapSide( document.getElementById('07'), document.getElementById('37') );
				blueKingFirstMove = true;
				break;
			case '67':
				swapSide( document.getElementById('77'), document.getElementById('57') );
				blueKingFirstMove = true;
				break;
			case '20':
				swapSide( document.getElementById('00'), document.getElementById('30') );
				orangeKingFirstMove = true;
				break;
			case '60': // DOESN'T WORK!!
				swapSide( document.getElementById('70'), document.getElementById('50') );
				orangeKingFirstMove = true;
				break;
		}
		// castles king
		swapSide(pieceToMove, e.target);
		// -----------------------------------------
		// removes click-listeners from activePieces
		activeSide.forEach(activePiece => {
			document.getElementById(
				activePiece.id
			).removeEventListener('click', pieceLit);
		});
		//\\//\\//\\//\\//\\//\\//\\//\\//
		// toggles side & starts next move 
		if (activeKing.getAttribute('data-side') === 'blue') {
			// toggleClocks();
			console.log('toggles activeSide to orange');
			lit(oranges, blues);
		} else {
			// toggleClocks();
			console.log('toggles activeSide to blue');
			lit(blues, oranges);
		} //\\//\\//\\//\\//\\//\\//\\//\\//
	} // WORKS!
	//=========================
	function enPassantReset() {
		console.log('ENTERS enPassantReset()');
		// ------------------------------------
		// resets enPassanting
		enPassanting = false;
		console.log('enPassanting = false');
		// ---------------------------------
		// resets pawnJumpDiv
		pawnJumpDiv = undefined;
		console.log('pawnJumpDiv = undefined');
		// ------------------------------------
		// resets enPassantDiv
		enPassantDiv = undefined;
		console.log('enPassantDiv = undefined');
	} // WORKS!
	//=================================
	function swapSide(fromDiv, toDiv) {
		// swaps pieceToMove & goToDiv info
		console.log('ENTERS swapSide()');
		// ------------------------------
		// re-informs goToDiv
		toDiv.setAttribute('data-name', fromDiv.getAttribute('data-name'));
		toDiv.setAttribute('data-side', fromDiv.getAttribute('data-side'));
		toDiv.setAttribute('src', fromDiv.src);
		// ---------------------------------------------
		// gets pieceToMove's activeSide index
		index1 = activeSide.indexOf(fromDiv);
		// ---------------------------------------------
		// removes now-empty pieceToMove from activeSide    
		activeSide.splice(index1, 1);
		// ---------------------------------------------       
		// updates activeSide & pieces array
		activeSide.push(toDiv);
		pieces = [...oranges, ...blues];
		// ---------------------------------------------
		// if not an enPassant attack, resets enPassant process
		if (pieceToMove.getAttribute('data-name') === 'pawn') {
			if (toDiv !== pawnJumpDiv) { enPassantReset(); }
		}
		else { enPassantReset(); }
		// ---------------------------------------------
		// un-informs pieceToMove
		fromDiv.setAttribute('data-name', 'empty');
		fromDiv.setAttribute('data-side', 'empty');
		fromDiv.setAttribute('src', './images/transparent.png');
		// -----------------------------------------------------
		console.log('EXITS swapSide()');
	} // WORKS!
	//=====================
	function eat(element) {
        // element is the eaten piece
        // ------------------------------------
		// eat(goToDiv); --> normal pawn attack
		// eat(pawnJumpDiv); --> enPassant attack
		// ---------------------------------------
		console.log('ENTERS eat('+element+')');
		// ---------------------------------------
		// puts element in its proper takenBox
		if (activeKing.getAttribute('data-side') === 'blue') { // if blue side
			document.getElementById(
				blueTakenBoxIdCounter.toString()
			).src = element.src;
			// ------------------------
			blueTakenBoxIdCounter -= 1;
		}
		else { // since orange turn, does the same
			document.getElementById(
				orangeTakenBoxIdCounter.toString()
			).src = element.src;
			// --------------------------
			orangeTakenBoxIdCounter -= 1;
		}
		// ------------------------------------------------------
		console.log('passiveSide -->'); console.log(passiveSide);
		// ------------------------------------------------------
		// gets element's passiveSide index
		index2 = passiveSide.indexOf(element);
		// ------------------------------------------
		// removes element from passiveSide array
		passiveSide.splice(index2, 1);
		// ---------------------------
		console.log('passiveSide -->');  console.log(passiveSide);
		// -------------------------------------------------------
		console.log('EXITS eat()');
	} // WORKS!
	//=====================
	function movePiece(e) {
		console.log('ENTERS movePiece(e)');
		// --------------------------------------------------------------
		console.log('removes click-listener from litDivs & pieceToMove');
		// --------------------------------------------------------------
		// removes click-listeners from pieceToMove
		document.getElementById(
			pieceToMove.id
		).removeEventListener('click', pieceLit);
		// -------------------------------------
		// removes click-listeners from litDivs
		litDivs.forEach(litDiv => {
			document.getElementById( litDiv ).removeEventListener(
				'click', movePiece
			);
		 }); // -------------------------------------
		// prevents castling after king's first move
		if (pieceToMove.getAttribute('data-name') === 'king') {
			if (pieceToMove.getAttribute('data-side') === 'blue') {
				blueKingFirstMove = true;
			} // ------------------------------- 
			else { orangeKingFirstMove = true; }
		} // ---------------------------------------
		// prevents castling after rook's first move
		if (pieceToMove.getAttribute('data-name') === 'rook') {
			if (pieceToMove.getAttribute('data-side') === 'blue') {
				if (pieceToMove.id === '07') { blueRook1FirstMove = true; }
				else if (pieceToMove.id === '77') { blueRook2FirstMove = true; }
			} 
			else {
				if (pieceToMove.id === '00') { orangeRook1FirstMove = true; }
				else if (pieceToMove.id === '70') { orangeRook2FirstMove = true; }
			}
		} // ----------------------------------------
		console.log('un-lightens mainDiv & litDivs');
		// ------------------------------------------
		// un-lightens mainDiv
		document.getElementById( pieceToMove.id ).classList.remove('mainLit');
		// -------------------------------------------------------------------
		// un-lightens litDivs
		litDivs.forEach(litDiv => {
			document.getElementById( litDiv ).classList.remove('lit');
		}); 
		// ----------------
		goToDiv = e.target;
		// -------------------------------------------------------
		console.log('pieceToMove -->');  console.log(pieceToMove);
		console.log('goToDiv -->');      console.log(goToDiv);
		console.log('pawnJumpDiv -->');  console.log(pawnJumpDiv);
		//--------------------------------------------------------
		// IF goToDiv IS EMPTY
		if (goToDiv.getAttribute('data-side') === 'empty') {
			console.log('goToDiv IS empty');            
			// ------------------------------------
			// covers anySide enPassant pawn attack
			if (pieceToMove.getAttribute('data-name') === 'pawn') {
				if (enPassanting) {
					if (goToDiv === enPassantDiv) {
						eat(pawnJumpDiv);                       
						// sets pawnJumpDiv to empty cell
						pawnJumpDiv.setAttribute('data-name', 'empty');
						pawnJumpDiv.setAttribute('data-side', 'empty');
						pawnJumpDiv.setAttribute('src', './images/transparent.png');
					} 
				} // --------------------------------------------------
				// covers bluePawn taking any NON-enPassant empty space
				if (activeKing.getAttribute('data-side') === 'blue') { // if blue's turn
					// if pawnToMove jumps two spaces
					if (goToDiv.id === (pieceToMove.id[0] + (pieceToMove.id[1] - 2))) {
						enPassanting = true;
						console.log('enPassanting = true');
						// --------------------------------
						pawnJumpDiv = goToDiv;
						console.log('pawnJumpDiv = goToDiv');
					}
				} // ------------------------
				else { // since orange's turn
					// if pawnToMove jumps two spaces
					if (goToDiv.id === (pieceToMove.id[0] + (+pieceToMove.id[1] + 2))) {
						enPassanting = true;
						console.log('enPassanting = true');
						// --------------------------------
						pawnJumpDiv = goToDiv;
						console.log('pawnJumpDiv = goToDiv');
					}
				}
			}
		} // ------------------------------------------------------
		else { // SINCE goToDiv NOT EMPTY, pieceToMove eats goToDiv
			console.log('goToDiv NOT empty');
			eat(goToDiv);
		}
		// covers pawnToMove moving one or two empty spaces
		// ------------------------------------------------
		swapSide(pieceToMove, goToDiv);
        // -----------------------------------------
        toggleSides();
	} // WORKS!
	//==================
	function pawnLit() {
		console.log('enters pawnLit()');
		// -------------------------------------------------
		// highlights all possible moves for blue pawnToMove
		if (activeKing.getAttribute('data-side') === 'blue') { // if blue's turn
			// if enPassant attack is possible
			if (enPassanting) { // same as: if (pawnJumpDiv.length) ?
				// covers enPassant attack
				// if bluePawnToMove is beside pawnJump
				if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
				|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
					// adds bluePawnToMove's enPassant-attack-div to litDivs
					enPassantDiv = document.getElementById(
						pawnJumpDiv.id[0] + (pawnJumpDiv.id[1] - 1) 
					);
					litDivs.push( enPassantDiv.id );
				}
			} // -----------------------------------
			// collects potential normal attack divs
			passiveSide.forEach(passivePiece => {
				// if passivePiece is one row ahead of blue pawnToMove
				if (passivePiece.id[1] == (pieceToMove.id[1] - 1)) {
					// if passivePiece is right beside blue pawnToMove
					if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
						litDivs.push(passivePiece.id);
					} // --------------------------------------------
					// if passivePiece is left beside blue pawnToMove
					if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
						litDivs.push(passivePiece.id);
					}
				}
			}); // ---------------------------------------------
			// collects empty space one ahead of blue pawnToMove
			if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).dataset.side === 'empty') { 
				litDivs.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));
				//--------------------------------------------------------
				// collects empty space two ahead of blue pawnToMove
				// if blue pawnToMove in row 6
				if (pieceToMove.id[1] === '6') {
					// if empty cell two ahead of blue pawnToMove
					if (document.getElementById(pieceToMove.id[0]
					+ (pieceToMove.id[1] - 2)).dataset.side === 'empty') {
						litDivs.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));
					}
				}
			}
		} // WORKS! -----------------
		else { // since orange's turn
			// if enPassant attack is possible
			if (enPassanting) { // if (pawnJumpDiv.length) {}
				if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
				|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
					// adds enPassant attack div to litDivs
					enPassantDiv = document.getElementById(
						pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1)
					); // ------------------------------------------
					litDivs.push( enPassantDiv.id );
				}
			} // -----------------------------------
			// collects potential normal attack divs
			passiveSide.forEach(passivePiece => {
				// if passivePiece is one row ahead of orange pawnToMove
				if (passivePiece.id[1] == (+pieceToMove.id[1] + 1)) {
					// if passivePiece is right beside orange pawnToMove
					if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
						litDivs.push(passivePiece.id);
					}
					// if passivePiece is left beside orange pawnToMove
					if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
						litDivs.push(passivePiece.id);
					}
				}
			});
			// collects empty space one ahead of orange pawnToMove
			if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 1)).dataset.side === 'empty') { 
				litDivs.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));
				//---------------------------------------------------
				//---------------------------------------------------
				// collects empty space two ahead of orange pawnToMove
				// if orange pawnToMove in row 1
				if (pieceToMove.id[1] === '1') {
					// if empty cell two ahead of orange pawnToMove
					if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 2)).dataset.side === 'empty') {
						// adds that empty cell to litDivs array & pawnJumpDiv.id
						// pawnJumpDiv = document.getElementById(pawnJumpDiv.id);
						litDivs.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 2));
					}
				}
			}
		} // WORKS!
	} // WORKS!
    //====================
    function knightLit() {
        //====================================
        function onBoardNotActiveSideIds(id) {
            if (id[0] >= 0) {
                if (id[0] <= 7) {
                    if (id[1] >= 0) {
                        if (id[1] <= 7) {
                            if ( document.getElementById( id ).getAttribute('data-side') 
                            !== activeKing.getAttribute('data-side') ) {
                                return id;
                            }
                        }
                    }
                }
            }
        }
        // --------
        litDivs = [
            // ------------------------------------------------------------
            (+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] + 2).toString(),
            // ------------------------------------------------------------
            (+pieceToMove.id[0] + 1) + (pieceToMove.id[1] - 2).toString(),
            // -----------------------------------------------------------
            (pieceToMove.id[0] - 1) + (+pieceToMove.id[1] + 2).toString(),
            // -----------------------------------------------------------
            (pieceToMove.id[0] - 1) + (pieceToMove.id[1] - 2).toString(),
            // ------------------------------------------------------------
            (+pieceToMove.id[0] + 2) + (+pieceToMove.id[1] + 1).toString(),
            // ------------------------------------------------------------
            (+pieceToMove.id[0] + 2) + (pieceToMove.id[1] - 1).toString(),
            // -----------------------------------------------------------
            (pieceToMove.id[0] - 2) + (+pieceToMove.id[1] + 1).toString(),
            // -----------------------------------------------------------
            (pieceToMove.id[0] - 2) + (pieceToMove.id[1] - 1).toString()
            // ---------------------------------------------------------
        ].filter(onBoardNotActiveSideIds);
	} // WORKS!
    //====================
	function bishopLit() {
		//===================================
		function quadrant(bishopX, bishopY) {
			let bishopPathId = bishopX.toString() + bishopY;
			// ---------------------------------------------
			// while bishop path empty, highlight space
			while (emptySpaces.includes(bishopPathId)) {
				// add id to litDivs
				litDivs.push( bishopPathId );
				// --------------------------
				// increment bishopX
				if (bishopX > +pieceToMove.id[0]) {
					bishopX += 1;
				} else { bishopX -= 1; }
				// ---------------------
				// increment bishopY
				if (bishopY > +pieceToMove.id[1]) {
					bishopY += 1;
				} else { bishopY -= 1; }
				// ---------------------
				// updates bishopPathId
				bishopPathId = bishopX.toString() + bishopY;
			} // -------------------------------------------
			// highlights attackable pieces in bishop's path
			for (let i = 0; i < passiveSide.length; i++) {
				if (passiveSide[i].id === bishopPathId) {
					litDivs.push( bishopPathId );
				}
			}
		} // ----------------------------------------------------
		quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] + 1);
		quadrant(+pieceToMove.id[0] + 1, pieceToMove.id[1] - 1);
		quadrant(pieceToMove.id[0] - 1, +pieceToMove.id[1] + 1);
		quadrant(pieceToMove.id[0] - 1, pieceToMove.id[1] - 1);
	} // WORKS!
	//==================
	function rookLit() {
		// in case of queen 
		if (pieceToMove.dataset.side === 'rook') { litDivs = []; }
		// -------------------------------------------------------
		// pushes correct div ids to litDivs
		//=====================
		function first(rookX) {
		// first(+pieceToMove.id[0] + 1);
		// first(pieceToMove.id[0] - 1);
			// -----------------------------------------------
			rookPathId = rookX.toString() + pieceToMove.id[1];
			// -----------------------------------------------
			// while rook path empty, highlight space
			while (emptySpaces.includes( rookPathId )) {
				// add rookPathId to litDivs
				litDivs.push( rookPathId );
				// ------------------------
				// increment rookX
				if (rookX > +pieceToMove.id[0]) { rookX += 1; }
				// --------------------------------------------
				else { rookX -= 1; }
				// ------------------
				// updates rookPathId
				rookPathId = rookX.toString() + pieceToMove.id[1];
			} // -------------------------------------------------
			// highlights attackable pieces in rook's path
			for (let i = 0; i < passiveSide.length; i++) {
				if (passiveSide[i].id === rookPathId) {
					litDivs.push( rookPathId );
				}
			}
		}
		//======================
		function second(rookY) {
		// second(+pieceToMove.id[1] + 1);
		// second(pieceToMove.id[1] - 1);
			// -----------------------------------------------
			rookPathId = pieceToMove.id[0].toString() + rookY;
			// while rook path empty, highlight space
			while (emptySpaces.includes( rookPathId )) {
				// add rookPathId to litDivs
				litDivs.push( rookPathId );
				// ------------------------
				// increment rookY
				if (rookY > +pieceToMove.id[1]) { rookY += 1; }
				// --------------------------------------------
				else { rookY -= 1; }
				// ------------------
				// updates rookPathId
				rookPathId = pieceToMove.id[0].toString() + rookY;
			} // -------------------------------------------------
			// highlights attackable pieces in rook's path
			for (let i = 0; i < passiveSide.length; i++) {
				if (passiveSide[i].id === rookPathId) {
					litDivs.push( rookPathId );
				}
			}
		} // -------------------------
		first(+pieceToMove.id[0] + 1);
		first(pieceToMove.id[0] - 1);
		// ----------------------------
		second(+pieceToMove.id[1] + 1);
		second(pieceToMove.id[1] - 1);
	} // WORKS!
	//==================
	function kingLit() {
		// highlights all possible moves for activeKing
		console.log('ENTERS kingLit()');
		// ----------------------------
		canCheck = false;
		// ------------------------
		kingSpacesUnderAttack = [];
		// ------------------------
		// covers king castling
		if (!kingAttackers.length) { // if king not in check
			if (pieceToMove.getAttribute('data-side') === 'blue') {
				if (!blueKingFirstMove) {
					if (!blueRook1FirstMove) {
						if (['17', '27', '37'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
							noCastle = false;
							// --------------------------
							for (let i = 0; i < 3; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['17', '27', '37'][i])) {
										noCastle = true;
									}
								}
							}  if (!noCastle) { castleIds.push('27'); }
						}
					} // >>>>>>>>>>>>>>>>>>>>>
					if (!blueRook2FirstMove) {
						if (['57', '67'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
							noCastle = false;
							// --------------------------
							for (let i = 0; i < 2; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['57', '67'][i])) {
										noCastle = true;
									}
								} // ----------------------------------
							}  if (!noCastle) { castleIds.push('67'); }
						}
					}
				}
			}  // ------------------------------
			else { // since activeSide is orange
				if (!orangeKingFirstMove) {
					if (!orangeRook1FirstMove) {
						if (['10', '20', '30'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
							for (let i = 0; i < 3; i++) {
								noCastle = false;
								// -------------------------------------------
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['10', '20', '30'][i])) {
										noCastle = true;
									}
								} // ----------------------------------
							}  if (!noCastle) { castleIds.push('20'); }
						}
					} // >>>>>>>>>>>>>>>>>>>>>>>
					if (!orangeRook2FirstMove) {
						if (['50', '60'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
							noCastle = false;
							// --------------------------
							for (let i = 0; i < 2; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['50', '60'][i])) {
										noCastle = true;
									}
								} // ----------------------------------
							}  if (!noCastle) { castleIds.push('60'); }
						}
					}
				}
			}
		} // ------------------------------------
		// lightens & click-listens all castleIds
		if (castleIds.length) { // if king is castling
			castleIds.forEach(id => {
				document.getElementById(id).classList.add('castleLit');
				document.getElementById(id).addEventListener('click', castling);
			});
		} // ----------------------------
		else { // since king not castling
			kingSpaces = [
				// ------------------------------------------------------------
				(+pieceToMove.id[0] - 1) + (+pieceToMove.id[1] - 1).toString(),
				// ------------------------------------------------------------
				(+pieceToMove.id[0] - 1) + pieceToMove.id[1],
				// ------------------------------------------------------------
				(+pieceToMove.id[0] - 1) + (+pieceToMove.id[1] + 1).toString(),
				// ------------------------------------------------------------
				pieceToMove.id[0] + (+pieceToMove.id[1] - 1),
				// ------------------------------------------
				pieceToMove.id[0] + (+pieceToMove.id[1] + 1),
				// ------------------------------------------------------------
				(+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] - 1).toString(),
				// ------------------------------------------------------------
				(+pieceToMove.id[0] + 1) + pieceToMove.id[1],
				// -----------------------------------------------------------
				(+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] + 1).toString()
				// -----------------------------------------------------------
			].map(space => { // keeps only on-board kingSpaces
				if ( (+space[0] >= 0) && (+space[0] <= 7) ) {
					// ----------------------------------------------------------
					if ( (+space[1] >= 0) && (+space[1] <= 7) ) { return space; }
				}
			}).filter(item => { return item !== undefined; });
			// ----------------------------------------------------------
			// excludes activePiece occupied spaces from kingSpaces array
			openAndOpponentHeldKingSpaces = kingSpaces.filter(kingSpace => {
				// for each kingSpace & each activePiece
				return !activeSide.some(activePiece => {
					// adds kingSpace to oAOHKS array if no activePiece there 
					return (kingSpace === activePiece.id);
				});
            }); // WORKS!
            console.log('openAndOpponentHeldKingSpaces -->'); console.log(openAndOpponentHeldKingSpaces);
			// --------------------------------------
			// populates litDivs with safe kingSpaces
			openAndOpponentHeldKingSpaces.forEach(id => {
                canCheck = false;
				// for each oAOHKS & each passivePiece
				for (let i = 0; i < passiveSide.length; i++) {
					// if passivePiece can check the oAOHKS...(kingSpace devoid of activePiece)
					if (checkingSpace(passiveSide[i], id)) {
						// ------------------------------------------------------------------------------------------------------------------------------------
						console.log(passiveSide[i].getAttribute('data-side') + ' ' + passiveSide[i].getAttribute('data-name') + ' can attack ' + id);
						// -------------  ------
                        canCheck = true;  break;
					}
				}
				// -------------------------------------------
				if (!canCheck) { litDivs.push(id); }
				// if (!litDivs.includes(checkSpaceId)) { _ }
			});  console.log('litDivs -->');  console.log(litDivs);
		} // WORKS!
	} // WORKS!
	//====================
	function pieceLit(e) {
		// -------------------------------
		console.log('ENTERS pieceLit(e)');
		// -------------------------------
		cleanUpAfterFirstClick();
		// ----------------------
        pieceToMove = e.target;
		// ----------------------------------------
		if (!enPassanting) { goToDiv = undefined; }
		// ----------------------------------------
		// lightens pieceToMove
		pieceToMove.classList.add('mainLit');
		// ------------------------------------------------
		// highlights all of clicked piece's possible moves
		switch (pieceToMove.getAttribute('data-name')) {
			// -----------------------------------------
			case 'pawn':     pawnLit();     break;
			// -----------------------------------
			case 'knight':   knightLit();   break;
			// -----------------------------------
			case 'bishop':   bishopLit();   break;
			// -----------------------------------
			case 'rook':     rookLit();     break;
			// ------------------------------------------------
			case 'queen':    bishopLit();   rookLit();   break;
			// ------------------------------------------------
			case 'king':     kingLit();     break;
			// ---------------------------------------------------
			default: alert('default ERROR! pieceToMove is empty');
		}
		/*
		// -----------------------------------------------------------
		// sees if any pinned pieces match pieceToMove
		if (pinnedPieces.includes(pieceToMove)) {
			// finds the id path from pieceToMove TO AND INCLUDING its pinnerPiece
			//   and excludes any ids from litDivs that are not in that path
			
			let idPath = []; // include obj.pinner.id
			// POPULATE idPath with divs between pieceToMove aand its pinner piece
			
			// pinnedPieces[?].pinner.getAttribute('data-name');

			// interceptPinnedPiece()?

			// checkingSpace(pinnedPieces[?].pinner, pieceToMove.id);

			// pinnedPieces should be an array of { pinned: piece, pinner: piece }

			////////////////////////////////////////////////////////////////////////////////
			// if pieceToMove can capture an idPath space, pushes pieceToMove to tempLitDivs
			idPath.forEach(id => {
				// ----------------------------------
				if (checkingSpace(pieceToMove, id)) {
					// ------------------------------
					tempLitDivs.push(pieceToMove);
				};
			}); // do this instead of switch... or else remove it

			////////////////////////////////////////////////////////
			// creates a new array of litDivs that are on the idPath
			tempLitDivs = litDivs.map(litDiv => {
				// ------------------------------
				if (idPath.includes(litDiv)) {
					// -----------------------
					return litDiv;
				}	
			});

			//////////////////////
			// -------------------
			litDivs = tempLitDivs;
		}
		*/
		// -----------------------------------------------------
		// lightens & click-listens all litDivs --> movePiece(e)
		if (litDivs.length) {
			// ------------------------
			litDivs.forEach(litDiv => {
				// ----------------------------------------------------
				document.getElementById( litDiv ).classList.add('lit');
				// --------------------------------------------------------------------
				document.getElementById( litDiv ).addEventListener('click', movePiece);
			}); // enters movePiece(e) on litDiv-click, unless castling
		}
    } // WORKS!

    // ****************
    // chess meta-logic
    // ****************

	// sets activeKing
	for (i = 0; i < activeSide.length; i++) {
		// ------------------------------------------------------
		if (activeSide[i].getAttribute('data-name') === 'king') {
			// ------------------------  ------
			activeKing = activeSide[i];  break;
		}
    }  console.log('activeKing -->');  console.log(activeKing);
	// --------------------------------------------------------------------
	// populates kingAttackers with any passivePiece that checks activeKing
	passiveSide.forEach(passivePiece => {
		// ----------------------------------------------
		if (checkingSpace(passivePiece, activeKing.id)) {
			// ------------------------------
			kingAttackers.push(passivePiece);
		}
	});  console.log('kingAttackers -->');  console.log(kingAttackers);
	// ----------------------------------------------------------------
	// if activeKing in check
	if (kingAttackers.length) { isMate(); }
	// ------------------------------------------------------
	// since activeKing not in check & there are pinnedPieces
	else if (pinnedPieces.length) {
		// --------------------------------
		activeSide.forEach(activePiece => {
			// ------------------------------------------------------------------------
			if (pinnedPieces.includes(activePiece)) { pinnedPieceAttack(activePiece); }
			// ------------------------------------------------------
			else { activePiece.addEventListener('click', pieceLit); }
		});
	}
    // -----------------------------------------------------
	else { // since activeKing not in check & no pinnedPieces
		// -------------------------------------------------
		activeSide.forEach(activePiece => {
			// ---------------------------------------------
			activePiece.addEventListener('click', pieceLit);
		});
	}
}