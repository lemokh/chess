function lit(activeSide, passiveSide) {
	litDivs = []; // contains lit ids on which to apply click-listeners
	kingAttackers = []; // contains all passivePieces that check activeKing
	emptySpaces = openSpaces(boardIds, pieces); // updates emptySpaces
	//===========================
	// function toggleClocks() {}
    //===========================
    function endOfGame() {
        alert('END OF GAME');
        alert(activeKing.getAttribute('data-side') + ' KING CHECKMATED!');
        // ---------------------------------------------------------------------
		console.log(activeKing.getAttribute('data-side') + ' KING CHECKMATED!');
        // ---------------------------------------------------------------------
        document.getElementById('board').classList.add('noClick');
    }
	function isMate() { // since activeKing is in check
		// returns true/false if activeKing checkmated
		// --------------------------------------------------------------------------------
		console.log('ENTERS isMate()');  console.log('litDivs -->');  console.log(litDivs);
		// --------------------------------------------------------------------------------
		checkPath = pathOfCheck;
		pieceToMove = activeKing;
		//=================================
		function eatOrBlockKingAttacker() {
			// returns true/false if an activePiece can EAT or BLOCK kingAttackers[0]
			mate = true;
			// --------------------------------
			activeSide.forEach(activePiece => {
				// if activePiece not pinned
				if (!pinnedPieces.includes(activePiece)) {
					// and if not activeKing
					if (activePiece.getAttribute('data-name') !== 'king') {
						pieceToMove = activePiece;
						//==========================================
						// sees if somePiece can eat or block someId
						function eatOrBlock(somePiece, someId) {
							// if somePiece checks someId
							if (checkingSpace(somePiece, someId)) {
								console.log(somePiece.getAttribute('data-side') + ' ' + somePiece.getAttribute('data-name') + ' at ' + somePiece.id + ' can move to ' + someId);
								// ---------------------------
								mate = false; // no check mate
								// --------------------------------------------
								// grey-lightens & click-listens to activePiece
								greyLitDivs.push(activePiece);
								activePiece.classList.add('greyLit');
								activePiece.addEventListener('click', function greyLit() {
									console.log('ENTERS GREYLIT()');
									// resets litDivs on clicking multiple activeSide pieces
									// if (pieceToMove !== undefined) {
										// un-lightens, clears out & stops click-listening to litDivs
										if (litDivs.length) {
											litDivs.forEach(litDiv => {
												document.getElementById( litDiv ).classList.remove( 'lit' );
												// ---------------------------------------------------------
												document.getElementById( litDiv ).removeEventListener(
													'click', saveKing
												);
											});
											// ----------
											litDivs = [];
										}
										console.log(litDivs);
									// } // ------------------------------------------
									//====================================================
									// lightens & click-listens to someId div
									document.getElementById(someId).classList.add('lit');
									document.getElementById(someId).addEventListener('click', function saveKing(e) {
										//==========================================================================
										// un-lightens & stops click-listening to clicked space
										greyLitDivs.forEach(greyLitDiv => {
											greyLitDiv.removeEventListener('click', greyLit);
											greyLitDiv.classList.remove('greyLit');
										}); // ------------------------------------
										// e.target.classList.remove('mainLitDiv');
										e.target.classList.remove('lit');
										e.target.removeEventListener('click', saveKing);
										// --------------------------------------------
										// moves activePiece to clicked space
										swapSide(activePiece, e.target);
										// --------------------------------
										// begin next turn
										if (activeKing.getAttribute('data-side') === 'blue') { lit(oranges, blues); }
										else { lit(blues, oranges); }
									});
								});
							}
						}
						// --------------------------------------------------
						// grey-lightens pieces that can eat kingAttackers[0]
						eatOrBlock(activePiece, kingAttackers[0].id);
						// ------------------------------------------------------------
						pawnBlocksKingAttacker = true; // prevents pawns from attacking
						// ------------------------------------------------------------
						// grey-lightens pieces that can block kingAttackers[0] path
						checkPath.forEach(pathId => {	
							idToBlock = pathId;
							// if activePiece can move to pathId
							eatOrBlock(activePiece, pathId);
						}); // -----------------------------
						pawnBlocksKingAttacker = false;
					}
				} else {
					if (checkingSpace(pieceToMove, kingAttackers[0].id)) {
						litDivs.push(kingAttackers[0].id);
					}
				}
			}); // WORKS!
			console.log('mate -->');  console.log(mate);
			if (!mate) { inCheckButNotMate = true; }
			return mate; // discerns whether activeKing is checkmated
        }
        // -----------------------------------------------------------------
		// populates litDivs where activeKing can move, runs checkingSpace()
		kingLit();
		// -------------------------------
		// if king can move, no check mate
		if (litDivs.length) {
            console.log('king can move out of check');
            // ---------------------------------------
            // activeKing escapes check
            activeKing.classList.add('greyLit');
			activeKing.addEventListener('click', pieceLit);
			// --------------------------------------------
			eatOrBlockKingAttacker();
		} // **********************************************
		// since activeKing cannot move
		// checkmate if multiple kingAttackers
		else if (kingAttackers.length > 1) { endOfGame(); }
		else { // checkmate if activeSide cannot eat or block the kingAttacker
			console.log('king unable to move out of check');
			// ---------------------------------------------
			litDivs = []; // resets litDivs
			// ---------------------------------------------------
			// discerns whether an activePiece can save activeKing
			eatOrBlockKingAttacker();  // WASTE return
		} // *******************************
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
	//==================================
	function swapSide (fromDiv, toDiv) {
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
		// removes eaten piece from passiveSide array
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
		// removes click-listeners from activePieces
		activeSide.forEach(activePiece => {
			document.getElementById( activePiece.id ).removeEventListener(
				'click', pieceLit
			);
		}); // ---------------------
		// NECESSARY? --------------
		// pieceToMove = activeKing;
		// kingLit();
		// -------------------------------
		// -------------------------------
		// toggles side & starts next move 
		if (activeKing.getAttribute('data-side') === 'blue') {
			// toggleClocks();
			console.log('toggles activeSide to orange');
			lit(oranges, blues);
		} // ------------------- 
		else {
			// toggleClocks();
			console.log('toggles activeSide to blue');
			lit(blues, oranges);
		}
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
		block1 = false;  block2 = false;  block3 = false;  block4 = false;
		block5 = false;  block6 = false;  block7 = false;  block8 = false;
		// ---------------------------------------------------------------
		// if own piece occupies knight space, no highlight there
		activeSide.forEach(activePiece => {
			switch (+activePiece.id[0]) {
				case (+pieceToMove.id[0] + 1): // if x is one to the right
					if (activePiece.id[1] == (+pieceToMove.id[1] + 2)) { block1 = true; break; }
					if (activePiece.id[1] == (+pieceToMove.id[1] - 2)) { block2 = true; break; }
				case (pieceToMove.id[0] - 1): // if x is one to the left
					if (activePiece.id[1] == (+pieceToMove.id[1] + 2)) { block3 = true; break; }
					if (activePiece.id[1] == (+pieceToMove.id[1] - 2)) { block4 = true; break; }
				case (+pieceToMove.id[0] + 2): // if x is two to the right
					if (activePiece.id[1] == (+pieceToMove.id[1] + 1)) { block5 = true; break; }
					if (activePiece.id[1] == (+pieceToMove.id[1] - 1)) { block6 = true; break; }
				case (pieceToMove.id[0] - 2): // if x is two to the left
					if (activePiece.id[1] == (+pieceToMove.id[1] + 1)) { block7 = true; break; }
					if (activePiece.id[1] == (+pieceToMove.id[1] - 1)) { block8 = true; break; }
			}
		});
		// ----------------------------
		// OMITS OFF-BOARD KNIGHT MOVES
		// using a switch() here breaks knightLit()
		if (!block1) {
			if ((+pieceToMove.id[0] + 1) < 8) {
				if ((+pieceToMove.id[1] + 2) < 8) {
					knightLight = (+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] + 2).toString();
					litDivs.push( knightLight );
				}
			}
		}
		if (!block2) {
			if ((+pieceToMove.id[0] + 1) < 8) {
				if ((pieceToMove.id[1] - 2) >= 0) {
					knightLight = (+pieceToMove.id[0] + 1) + (pieceToMove.id[1] - 2).toString();
					litDivs.push( knightLight );
				}
			}
		}
		if (!block3) {
			if ((+pieceToMove.id[0] - 1) >= 0) {
				if ((+pieceToMove.id[1] + 2) < 8) {
					knightLight = (pieceToMove.id[0] - 1) + (+pieceToMove.id[1] + 2).toString();
					litDivs.push( knightLight );
				}
			}
		}
		if (!block4) {
			if ((+pieceToMove.id[0] - 1) >= 0) {
				if ((+pieceToMove.id[1] - 2) >= 0) {
					knightLight = (pieceToMove.id[0] - 1) + (pieceToMove.id[1] - 2).toString();
					litDivs.push(knightLight);
				}
			}
		}
		if (!block5) {
			if ((+pieceToMove.id[0] + 2) < 8) {
				if ((+pieceToMove.id[1] + 1) < 8) {
					knightLight = (+pieceToMove.id[0] + 2) + (+pieceToMove.id[1] + 1).toString();
					litDivs.push( knightLight );
				}
			}
		}
		if (!block6) {
			if ((+pieceToMove.id[0] + 2) < 8) {
				if ((+pieceToMove.id[1] - 1) >= 0) {
					knightLight = (+pieceToMove.id[0] + 2) + (pieceToMove.id[1] - 1).toString();
					litDivs.push( knightLight );
				}
			}
		}
		if (!block7) {
			if ((+pieceToMove.id[0] - 2) >= 0) {
				if ((+pieceToMove.id[1] + 1) < 8) {
					knightLight = (pieceToMove.id[0] - 2) + (+pieceToMove.id[1] + 1).toString();
					litDivs.push( knightLight );
				}
			}
		}
		if (!block8) {
			if ((+pieceToMove.id[0] - 2) >= 0) {
				if ((+pieceToMove.id[1] - 1) >= 0) {
					knightLight = (pieceToMove.id[0] - 2) + (pieceToMove.id[1] - 1).toString();
					litDivs.push( knightLight );
				}
			}
		}
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
				(+pieceToMove.id[0] - 1) + (+pieceToMove.id[1] - 1).toString(),
				(+pieceToMove.id[0] - 1) + pieceToMove.id[1],
				(+pieceToMove.id[0] - 1) + (+pieceToMove.id[1] + 1).toString(),
				pieceToMove.id[0] + (+pieceToMove.id[1] - 1),
				pieceToMove.id[0] + (+pieceToMove.id[1] + 1),
				(+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] - 1).toString(),
				(+pieceToMove.id[0] + 1) + pieceToMove.id[1],
				(+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] + 1).toString()
			].map(space => { // keeps only on-board kingSpaces
				if ( (+space[0] >= 0) && (+space[0] <= 7) ) {
					if ( (+space[1] >= 0) && (+space[1] <= 7) ) {
						return space;
					}
				}
			}).filter(item => { return item !== undefined; });
			// --------------------------------------------------
			// excludes activePiece occupied spaces from kingSpaces array
			openAndOpponentHeldKingSpaces = kingSpaces.filter(kingSpace => {
				// for each kingSpace & each activePiece
				return !activeSide.some(activePiece => {
					// adds kingSpace to oAOHKS array if no activePiece there 
					return (kingSpace === activePiece.id);
				});
			}); // WORKS!
			// ----------------------------------------------------
			// populates litDivs with safe kingSpaces
			openAndOpponentHeldKingSpaces.forEach(checkSpaceId => {
				// for each oAOHKS & each passivePiece
				for (let i = 0; i < passiveSide.length; i++) {
					// if passivePiece can check the oAOHKS...(kingSpace devoid of activePiece)
					if (checkingSpace(passiveSide[i], checkSpaceId)) {
						console.log(passiveSide[i].getAttribute('data-side') + ' ' + passiveSide[i].getAttribute('data-name') + ' can attack ' + checkSpaceId);
						canCheck = true;  break;
					}
				}
				if (!canCheck) { litDivs.push(checkSpaceId); }
				// if (!litDivs.includes(checkSpaceId)) { _ }
			});  console.log('litDivs -->');  console.log(litDivs);
		} // WORKS!
	} // WORKS!
	//====================
	function pieceLit(e) {
		console.log('ENTERS pieceLit(e)');
		// -----------------------------------------------------
		// resets litDivs on clicking multiple activeSide pieces
		if (pieceToMove !== undefined) {
			// un-lightens & stops click-listening to pieceToMove
			pieceToMove.removeEventListener( 'click', movePiece );
			pieceToMove.classList.remove( 'mainLit' );
			// ----------------------------------------------------------
			// un-lightens, clears out & stops click-listening to litDivs
			if (litDivs.length) {
				litDivs.forEach(litDiv => {
					document.getElementById( litDiv ).classList.remove( 'lit' );
					// ---------------------------------------------------------
					document.getElementById( litDiv ).removeEventListener(
						'click', movePiece
					);
				});
				// ----------
				litDivs = [];
			} // ----------------------------------------------------------
			// un-lightens, clears out & stops click-listening to castleIds
			if (castleIds.length) { // if king ready to castle
				castleIds.forEach(id => { // reset castling process 
					document.getElementById( id ).classList.remove( 'castleLit' );
					// -----------------------------------------------------------
					document.getElementById( id ).removeEventListener(
						'click', castling
					);
				});
				// ------------
				castleIds = [];
			}
		}
		//\/\/\/\/\/\/\/\/\/\//
        pieceToMove = e.target;
		// ----------------------------------------
		if (!enPassanting) { goToDiv = undefined; }
		// ----------------------------------------
		// lightens pieceToMove
		pieceToMove.classList.add('mainLit');
		// ----------------------------------
		// highlights all of clicked piece's possible moves
		function possibleMoves() {
			switch (pieceToMove.getAttribute('data-name')) {
				case 'pawn':   pawnLit();    break;
				case 'knight': knightLit();  break;
				case 'bishop': bishopLit();  break;
				case 'rook':   rookLit();    break;
				case 'queen':  bishopLit();  rookLit();  break;
				case 'king':   kingLit();    break;
				default: alert('default ERROR! pieceToMove is empty');
			}
        } // ------------------------------------
		if (pinnedPieces.includes(pieceToMove)) {
            pinningPieceId = pinnerPieces[ pinnedPieces.indexOf(pieceToMove) ].id;
            // if the pinned pieceToMove can eat its pinning piece
            if (checkingSpace(pieceToMove, pinningPieceId)) {
                litDivs.push(pinningPieceId);
            }
        } else { possibleMoves(); }
		// -----------------------------------------------------
		// lightens & click-listens all litDivs --> movePiece(e)
		if (litDivs.length) {
			litDivs.forEach(litDiv => {
				document.getElementById( litDiv ).classList.add('lit');
				document.getElementById( litDiv ).addEventListener('click', movePiece);
			}); // enters movePiece(e) on litDiv-click, unless castling
		}
    } // WORKS!
    // ---------------
    // ---------------
    // ---------------
    // ---------------
	// sets activeKing
	for (i = 0; i < activeSide.length; i++) {
		if (activeSide[i].getAttribute('data-name') === 'king') {
			activeKing = activeSide[i];  break;
		}
	}  console.log('activeKing -->');  console.log(activeKing);
	// --------------------------------------------------------------------
	// populates kingAttackers with any passivePiece that checks activeKing
	passiveSide.forEach(passivePiece => {
		if (checkingSpace(passivePiece, activeKing.id)) {
			kingAttackers.push(passivePiece);
		}
	});  console.log('kingAttackers -->');  console.log(kingAttackers);
	// ----------------------------------------------------------------
	// if activeKing in check
	if (kingAttackers.length) { isMate(); }
		// ***************************
		// ***************************
		// ***************************
		// since activeKing in check, but not check mate
        // alert(activeKing.getAttribute('data-side') + ' king IN CHECK --> not mate!');
        // console.log(activeKing.getAttribute('data-side') + ' king IN CHECK --> not mate!');
        // console.log('litDivs -->');  console.log(litDivs);
        // // -----------------------------------------------
        // UNNECESSARY --> isMate() already covers this
        // if (!litDivs.length) { // if activeKing cannot move
        //     console.log('ENTERS PreventCheckMate()')
        //     // ---------------------------------------------------------
        //     // grey-lightens & click-listens only to heroic activePieces                
        //     if (kingAttackers.length > 1) { endOfGame(); }
                // -----------------------------------------------------
        //     else { // since king paralyzed and only one kingAttacker
        //         console.log('ENTERS else statement --> activeKing paralyzed and only one kingAttacker');
        //         // heroics = activeSide.map(piece => !pinnedPieces.includes(piece));
        //         // heroics is an array of unpinned activePieces
        //         // -----------------------------------------------
        //         // for each id in kingAttacker's pathOfCheck array
        //         checkPath.forEach(emptyId => {
        //             // for each unpinned activePiece
        //             heroics.forEach(activePiece => {
        //                 // if activePiece is not a king
        //                 if (activePiece.getAttribute('data-name') !== 'king') {
        //                     // if activePiece can take emptyId
        //                     if (checkingSpace(activePiece, emptyId)) {
        //                         // grey-lighten & click-listen to activePiece
        //                         activePiece.classList.add('greyLit');
        //                         activePiece.addEventListener('click', lit1);
        //                     }
        //                 }
        //             });
        //         });
        //     }
        // }
        // ****************************************************
        // ****************************************************
        // ****************************************************
	// -----------------------------------------------------------------------------------
	else { // since activeKing not in check, runs pieceLit(e) for all clicked activePieces
		activeSide.forEach(activePiece => {	
			activePiece.addEventListener('click', pieceLit);
		});
    }
}
//=======================================
lit(blues, oranges); // begins first move
//=======================================

//==============================================
//==============================================
//==============================================