//=====================================
function lit(activeSide, passiveSide) {
	// -------------------------
	canBlockPathOfCheck = [];
	// ----------------------
	canEatKingAttacker = [];
	// ----------------------------
	pawnBlocksKingAttacker = false;
	// -------------------------
	tempPinnedPieces = [];
	// -------------------
	kingStuck = false;

	//===================================
	function addLitDivHandler(funcName) {
		// ------------------------------
		litDivs.forEach( litDiv => {
			// ------------------------------------------
			litPiece = document.getElementById( litDiv );
			// ------------------------------------------
			litPiece.classList.add( 'lit' );
			// --------------------------------------------
			litPiece.addEventListener( 'click', funcName );
		});
	}
	//======================================
	function removeLitDivHandler(funcName) {
		// -----------------------------------
		litDivs.forEach( litDiv => {
			// ------------------------------------------
			litPiece = document.getElementById( litDiv );
			// ------------------------------------------
			litPiece.classList.remove( 'lit' );
			// -----------------------------------------------
			litPiece.removeEventListener( 'click', funcName );
		});
		// ----------
		litDivs = [];
	}

	//=========================
	function pinnedPieceLit() {
		// ------------------------------------
		console.log('ENTERS pinnedPieceLit()');
		//===========================
		function movePinnedPiece(e) {
			// -------------------------------------
			pieceToMove.classList.remove('mainLit');
			// -------------------------------------
			removeLitDivHandler(movePinnedPiece);
			// ----------------------------------
			swapSide(pieceToMove, e.target);
			// -----------------------------
			toggleSides();
		}
		// ---------------------------------------------------
		pinnerPiece = pieceToMove.getAttribute('data-pinner');
		// ---------------------------------------------------
		if (checkingSpace(pieceToMove, pinnerPiece.id)) {
			// if pinned piece can eat pinner piece
			pinnerPiece.classList.add('lit');
			// ------------------------------
			litDivs.push(pinnerPiece.id);
			// ---------------------------------------------------
			pinnerPiece.addEventListener('click', movePinnedPiece);
		}
		// ---------------------------
		pawnBlocksKingAttacker = true;
		// --------------------------------------------------
		// provides id path from pinner piece to pinned piece
		checkingSpace(pinnerPiece, pieceToMove.id);
		// ---------------------------------------
		pathOfCheck.forEach(id => {
			// ---------------------------------------
			pathPiece = document.getElementById( id );
			// ---------------------------------------
			if (checkingSpace(pieceToMove, id)) {
				// ------------------------------
				pathPiece.classList.add('lit');
				// ----------------------------
				litDivs.push(id);
				// --------------------------------------------------
				pathPiece.addEventListener('click', movePinnedPiece);
			}
		});
		// ----------------------------
		pawnBlocksKingAttacker = false;
		// -------------------------------------------------
		// provides id path for pinned piece to its own king
		checkingSpace(pieceToMove, activeKing.id);
		// ---------------------------------------
		pathOfCheck.forEach(id => {
			// ---------------------------------------
			pathPiece = document.getElementById( id );
			// ---------------------------------------
			if (checkingSpace(pieceToMove, id)) {
				// ------------------------------
				pathPiece.classList.add('lit');
				// ----------------------------
				litDivs.push(id);
				// --------------------------------------------------
				pathPiece.addEventListener('click', movePinnedPiece);
			}
		});
	}

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
				// ------------------------------
				removeLitDivHandler(movePiece);
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
    //===========================
	function selectGreyPiece(e) {
		// ---------------------------------
		if (greyPieceToMove !== undefined) {
			// -----------------------------------------
			greyPieceToMove.classList.remove('mainLit');
		}
		// resets each litDiv
		removeLitDivHandler(moveGreyPiece);
		// --------------------------------
		if (litDivs.length) {
			// -------------------------------------
			litDivs.forEach( id => {
				// ------------------------------------------
				litPiece = document.getElementById( id );
				// ------------------------------------------
				litPiece.classList.remove( 'lit' );
				// -----------------------------------------------
				litPiece.removeEventListener( 'click', moveGreyPiece );
			});
		}
		//-------------------------
		greyPieceToMove = e.target;
		// --------------------------------------
		greyPieceToMove.classList.add('mainLit');
		// --------------------------------------
		if (greyPieceToMove.getAttribute('data-name') === 'king') {
			// ----------------------------------------------------
			litDivs.forEach(id => {
			// --------------------------------
				litPiece = document.getElementById( id );
				// ------------------------------------------
				litPiece.classList.add( 'lit' );
				// -------------------------------------------------
				litPiece.addEventListener( 'click', moveGreyPiece );
			});
		}
		// -----------------------------------------
		if (canEatKingAttacker.includes(e.target)) {
			// -------------------------------------
			litDivs.push(kingAttackers[0].id);
		}
		// ---------------------------------
		canBlockPathOfCheck.forEach(obj => {
			// --------------------------------
			if (obj.pathBlocker === e.target) {
				// ----------------------------
				litDivs.push(obj.emptyDivId);
			}
		});
		// -----------------------------
		addLitDivHandler(moveGreyPiece);
	}
	//=========================
	function moveGreyPiece(e) {
		// resets greyPieceToMove
		console.log('ENTERS moveGreyPiece()');
		// -----------------------------------------
		greyPieceToMove.classList.remove('mainLt');
		// -----------------------------------------
		greyPieceToMove.classList.remove('greyLit');
		// -----------------------------------------
		if (greyPieceToMove.getAttribute('data-name') === 'king') {
			// ----------------------------------------------------
			litDivs.forEach(id => {
			// --------------------------------
				litPiece = document.getElementById( id );
				// ------------------------------------------
				litPiece.classList.remove( 'lit' );
				// --------------------------------------------
				litPiece.removeEventListener( 'click', moveGreyPiece );
			});
		}

		// clears greyLitDiv pieces
		greyLitPieces.forEach(greyLitPiece => {
			// --------------------------------------------------------
			greyLitPiece.removeEventListener('click', selectGreyPiece);
			// --------------------------------------------------------
			greyLitPiece.classList.remove('greyLit');
		});
		greyLitPieces = [];
		// --------------------------------
		removeLitDivHandler(moveGreyPiece);
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

	/*
	//================================
	function pinnedEatsPinner(obj) {
		// ------------------------------------
		obj.pinned.classList.remove('mainLit');
		// ------------------------------------
		obj.pinner.classList.remove('lit');
		// -------------------------------------------------------
		obj.pinner.removeEventListener('click', pinnedEatsPinner);
		// -------------------------------------------------------
		eat(obj.pinner);
		// -----------------------------
		swapSide(pieceToMove, obj.pinner);
		// -----------------------------
		toggleSides();
	}
	*/
}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
function lit(activeSide, passiveSide) {

	litIds = []; // contains litIds on which to apply click-listeners
	kingAttackers = []; // contains passivePieces that check activeKing
	emptySpaces = openSpaces(boardIds, pieces); // updates emptySpaces
	greyPieceToMove = undefined;
    newPieceClicked = [];

    function wherePieceCanMove(e) {
        // if not first click this turn
        if (newPieceClicked !== undefined) {
            newPieceClicked.addEventListener('click', wherePieceCanMove);
        }
        
        newPieceClicked = e.target;
        e.target.removeEventListener('click', wherePieceCanMove);

        cleanUpAfterFirstClick();

        pieceToMove = e.target;

        if (!enPassanting) { goToDiv = undefined; }

		pieceToMove.classList.add('mainLit');

        if (pieceToMove.getAttribute('data-pinned') === 'true') { pinnedPieceLit(); }
		else { possibleMoves(); }
    }

    function possibleMoves() {
		console.log('ENTERS possibleMoves()');
		// highlights clicked piece's possible moves
		switch (pieceToMove.getAttribute('data-name')) {
			case 'pawn':    pawnLit();              break;
			case 'knight':  knightLit();            break;
			case 'bishop':  bishopLit();            break;
			case 'rook':    rookLit();              break;
			case 'queen':   bishopLit(); rookLit(); break;
			case 'king':    kingLit();              break;
			default: alert('default ERROR! pieceToMove is empty');
		}
		// lightens & click-listens to litDivs --> movePiece(e)
		if (litDivs.length) { addLitDivHandler(movePiece); }
    }
    
	function inCheck() { 
		// since activeKing is in check...
		// --------------------------------------------------------------------------------
		console.log('ENTERS isMate()');  console.log('litDivs -->');  console.log(litDivs);
		// --------------------------------------------------------------------------------
		checkPath = pathOfCheck;
		// ----------------------
		pieceToMove = activeKing;

		// populates litDivs where activeKing can move
		kingLit();

		// if multiple kingAttackers, only king can prevent checkmate...
		if (kingAttackers.length > 1) {
			// if king stuck, then checkmate
			if (!litDivs.length) { return endOfGame(); }

			// else click greyPiece to selectGreyPiece()
			else { return addLitDivHandler(selectGreyPiece); }
		}
		else { // since only one kingAttacker
			// if king can move, handles moving activeKing
			if (litDivs.length) {
				// ----------------------------
				greyLitPieces.push(activeKing);
				// ---------------------------------
				activeKing.classList.add('greyLit');
				// ---------------------------------------------------
				activeKing.addEventListener('click', selectGreyPiece);
			}
			else { kingStuck = true; }
			
			/////////////////////////////////////////////////////
			// populates canEatKingAttacker & canBlockPathOfCheck
			// excludes activeKing
			activeSide.forEach(activePiece => {
				// for each activePiece, if not pinned
				if (activePiece.getAttribute('data-pinned') === 'false') {
					// if not activeKing
					if (activePiece.getAttribute('data-name') !== 'king') {
						// ------------------------------------------------
						pieceToMove = activePiece; // IMPORTANT!
						// -------------------------------------
						// if activePiece checks kingAttacker
						if (checkingSpace(activePiece, kingAttackers[0].id)) {
							// ---------------------------------------------------------
							console.log(activePiece.id+' can eat '+kingAttackers[0].id);
							// ---------------------------------------------------------
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
				else { // since activePiece is pinned
					console.log(activePiece.id+' is pinned');
					// if activePiece can eat kingAttacker
					if (checkingSpace(activePiece, kingAttackers[0].id)) {
						// -----------------------------------------------
						canEatKingAttacker.push(activePiece);
						console.log(activePiece.id+' can eat '+kingAttackers[0].id);
					}
				}
			}); // doesn't apply to activeKing
			///////////////////////////////////////

			// ------------------------------------
			// begins interceptKingAttacker() logic
			// -------------------------------------
			greyLitPieces = [...canEatKingAttacker];
			
			console.log('greyLitPieces');  console.log(greyLitPieces);
			// -------------------------------------------------------
			
			canBlockPathOfCheck.forEach(obj => {
				greyLitPieces.push(obj.pathBlocker);
			});
			
			console.log('greyLitPieces');  console.log(greyLitPieces);
			// -------------------------------------------------------
			
			if (!greyLitPieces.length) {
				if (kingStuck) {
					console.log('since no greyLitPieces and king stuck...endOfGame 1');
					endOfGame();
				}

			}
			// ----------------------------------------
			else { // since able to prevent check mate
				// ------------------------------------
				console.log('since only one kingAttacker and at least one greyLitPiece, no check mate');
					// ---------------------------------------------------------------------------------
					// lightens & click-listens to each greyLitPiece
					greyLitPieces.forEach(greyLitPiece => {
						// -----------------------------------
						greyLitPiece.classList.add('greyLit');
						// -----------------------------------------------------
						greyLitPiece.addEventListener('click', selectGreyPiece);
					});
			}
		}
	}

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
			case '60':
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
	}

    function enPassantReset() {
		console.log('ENTERS enPassantReset()');
        
        // resets enPassanting
		enPassanting = false;
		console.log('enPassanting = false');
        
        // resets pawnJumpDiv
		pawnJumpDiv = undefined;
		console.log('pawnJumpDiv = undefined');
        
        // resets enPassantDiv
		enPassantDiv = undefined;
		console.log('enPassantDiv = undefined');
	}

    function swapSide(fromDiv, toDiv) {
		// swaps pieceToMove & goToDiv info
		console.log('ENTERS swapSide()');

        // re-informs goToDiv
		toDiv.setAttribute('data-name', fromDiv.getAttribute('data-name'));
		toDiv.setAttribute('data-side', fromDiv.getAttribute('data-side'));
		toDiv.setAttribute('src', fromDiv.src);

        // gets pieceToMove's activeSide index
		index1 = activeSide.indexOf(fromDiv);

        // removes now-empty pieceToMove from activeSide    
		activeSide.splice(index1, 1);

        // updates activeSide & pieces array
		activeSide.push(toDiv);
		pieces = [...oranges, ...blues];

        // if not an enPassant attack, resets enPassant process
		if (pieceToMove.getAttribute('data-name') === 'pawn') {
			if (toDiv !== pawnJumpDiv) { enPassantReset(); }
		}
		else { enPassantReset(); }

        // un-informs pieceToMove
		fromDiv.setAttribute('data-name', 'empty');
		fromDiv.setAttribute('data-side', 'empty');
		fromDiv.setAttribute('src', './images/transparent.png');

        console.log('EXITS swapSide()');
	}

    function eat(element) {
        // element is the eaten piece

        // eat(goToDiv); --> normal pawn attack
		// eat(pawnJumpDiv); --> enPassant attack

        console.log('ENTERS eat('+element+')');

        // puts element in its proper takenBox
		if (activeKing.getAttribute('data-side') === 'blue') { // if blue side
			document.getElementById(
				blueTakenBoxIdCounter.toString()
			).src = element.src;

            blueTakenBoxIdCounter -= 1;
		}
		else { // since orange turn, does the same
			document.getElementById(
				orangeTakenBoxIdCounter.toString()
			).src = element.src;

            orangeTakenBoxIdCounter -= 1;
		}

        console.log('passiveSide -->'); console.log(passiveSide);

        // gets element's passiveSide index
		index2 = passiveSide.indexOf(element);

        // removes element from passiveSide array
		passiveSide.splice(index2, 1);

        console.log('passiveSide -->');  console.log(passiveSide);
		console.log('EXITS eat()');
	}

    function movePiece(e) {
		console.log('ENTERS movePiece(e)');
		console.log('removes click-listener from litDivs & pieceToMove');

        // removes click-listeners from pieceToMove
		document.getElementById( pieceToMove.id ).removeEventListener( 'click', pieceLit );

        // un-lightens mainDiv
		document.getElementById( pieceToMove.id ).classList.remove( 'mainLit' );

        removeLitDivHandler(movePiece);

        // prevents castling after king's first move
		if (pieceToMove.getAttribute('data-name') === 'king') {
			if (pieceToMove.getAttribute('data-side') === 'blue') {
				blueKingFirstMove = true;
			} 
			else { orangeKingFirstMove = true; }
		}
        
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
		}
		console.log('un-lightens mainDiv & litDivs');
		
		goToDiv = e.target;
		
		console.log('pieceToMove -->');  console.log(pieceToMove);
		console.log('goToDiv -->');      console.log(goToDiv);
		console.log('pawnJumpDiv -->');  console.log(pawnJumpDiv);
        
        // If goToDiv EMPTY
		if (goToDiv.getAttribute('data-side') === 'empty') {
			console.log('goToDiv IS empty');            

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
				}
				// covers bluePawn taking a NON-enPassant empty space
				if (activeKing.getAttribute('data-side') === 'blue') { // if blue's turn
					// if pawnToMove jumps two spaces
					if (goToDiv.id === (pieceToMove.id[0] + (pieceToMove.id[1] - 2))) {
						enPassanting = true;
						console.log('enPassanting = true');

                        pawnJumpDiv = goToDiv;
						console.log('pawnJumpDiv = goToDiv');
					}
				}
				else { // since orange's turn
					// if pawnToMove jumps two spaces
					if (goToDiv.id === (pieceToMove.id[0] + (+pieceToMove.id[1] + 2))) {
						enPassanting = true;
						console.log('enPassanting = true');

                        pawnJumpDiv = goToDiv;
						console.log('pawnJumpDiv = goToDiv');
					}
				}
			}
		}
		else { // SINCE goToDiv NOT EMPTY, pieceToMove eats goToDiv
			console.log('goToDiv NOT empty');
            eat(goToDiv);
		}
		// covers pawnToMove moving one or two empty spaces
		swapSide(pieceToMove, goToDiv);
        toggleSides();
    }
    
	function pawnLit() {
		console.log('enters pawnLit()');

        // highlights all possible moves for blue pawnToMove
		if (activeKing.getAttribute('data-side') === 'blue') {
			// if enPassant attack is possible
			if (enPassanting) { // same as: if (pawnJumpDiv.length) ?
				// covers enPassant attack
				// if bluePawnToMove is beside pawnJump,
				if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
				|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
					// adds bluePawnToMove's enPassant-attack-div to litDivs
					enPassantDiv = document.getElementById(
						pawnJumpDiv.id[0] + (pawnJumpDiv.id[1] - 1) 
					);
					litDivs.push( enPassantDiv.id );
				}
			}
            // collects potential normal attack divs
			passiveSide.forEach(passivePiece => {
				// if passivePiece is one row ahead of blue pawnToMove
				if (passivePiece.id[1] == (pieceToMove.id[1] - 1)) {
					// if passivePiece is right beside blue pawnToMove
					if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
						litDivs.push(passivePiece.id);
					}
					// if passivePiece is left beside blue pawnToMove
					if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
						litDivs.push(passivePiece.id);
					}
				}
			});
			// collects empty space one ahead of blue pawnToMove
			if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).dataset.side === 'empty') { 
				litDivs.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));

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
		}
		else { // since orange's turn
			// if enPassant attack is possible
			if (enPassanting) { // if (pawnJumpDiv.length) {}
				if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
				|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
					// adds enPassant attack div to litDivs
					enPassantDiv = document.getElementById(
						pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1)
					);
					litDivs.push( enPassantDiv.id );
				}
			}
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
		}
    }
    
    function knightLit() {

        function onBoardNotActiveSideIds(id) {
            if (id[0] >= 0) {
                if (id[0] <= 7) {
                    if (id[1] >= 0) {
                        if (id[1] <= 7) {
                            if ( document.getElementById( id ).getAttribute('data-side') 
                            !== activeKing.getAttribute('data-side') ) { return id; }
                        }
                    }
                }
            }
        }

        litDivs = [
            (+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] + 2).toString(),
            (+pieceToMove.id[0] + 1) +  (pieceToMove.id[1] - 2).toString(),
             (pieceToMove.id[0] - 1) + (+pieceToMove.id[1] + 2).toString(),
             (pieceToMove.id[0] - 1) +  (pieceToMove.id[1] - 2).toString(),
            (+pieceToMove.id[0] + 2) + (+pieceToMove.id[1] + 1).toString(),
            (+pieceToMove.id[0] + 2) +  (pieceToMove.id[1] - 1).toString(),
             (pieceToMove.id[0] - 2) + (+pieceToMove.id[1] + 1).toString(),
             (pieceToMove.id[0] - 2) +  (pieceToMove.id[1] - 1).toString()
        ].filter(onBoardNotActiveSideIds);
	}

    function bishopLit() {

        function quadrant(bishopX, bishopY) {

            let bishopPathId = bishopX.toString() + bishopY;

            // while bishop path empty, highlight space
			while (emptySpaces.includes(bishopPathId)) {
				// add id to litDivs
				litDivs.push( bishopPathId );

                // increment bishopX
				if (bishopX > +pieceToMove.id[0]) { bishopX += 1; }
				else { bishopX -= 1; }

                // increment bishopY
				if (bishopY > +pieceToMove.id[1]) { bishopY += 1; }
				else { bishopY -= 1; }

                // updates bishopPathId
				bishopPathId = bishopX.toString() + bishopY;
            }
            
			// highlights attackable pieces in bishop's path
			for (let i = 0; i < passiveSide.length; i++) {
				if (passiveSide[i].id === bishopPathId) {
					litDivs.push( bishopPathId );
				}
			}
        }
        
		quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] + 1);
		quadrant(+pieceToMove.id[0] + 1,  pieceToMove.id[1] - 1);
		quadrant( pieceToMove.id[0] - 1, +pieceToMove.id[1] + 1);
		quadrant( pieceToMove.id[0] - 1,  pieceToMove.id[1] - 1);
    }
    
	function rookLit() {
		// in case of queen 
		if (pieceToMove.dataset.side === 'rook') { litDivs = []; }
		// pushes correct div ids to litDivs

        function first(rookX) {
		    // first(+pieceToMove.id[0] + 1);
		    // first(pieceToMove.id[0] - 1);

            rookPathId = rookX.toString() + pieceToMove.id[1];

            // while rook path empty, highlight space
			while (emptySpaces.includes( rookPathId )) {

                litDivs.push( rookPathId );

                // increment rookX
				if (rookX > +pieceToMove.id[0]) { rookX += 1; }
                else { rookX -= 1; }

				rookPathId = rookX.toString() + pieceToMove.id[1];
			}
            
            // highlights attackable pieces in rook's path
			for (let i = 0; i < passiveSide.length; i++) {
				if (passiveSide[i].id === rookPathId) {
					litDivs.push( rookPathId );
				}
			}
        }
        
		function second(rookY) {
		    // second(+pieceToMove.id[1] + 1);
		    // second(pieceToMove.id[1] - 1);

            rookPathId = pieceToMove.id[0].toString() + rookY;

            // while rook path empty, highlight space
            while (emptySpaces.includes( rookPathId )) {

                // add rookPathId to litDivs
				litDivs.push( rookPathId );

                // increment rookY
				if (rookY > +pieceToMove.id[1]) { rookY += 1; }
                else { rookY -= 1; }

                // updates rookPathId
				rookPathId = pieceToMove.id[0].toString() + rookY;
            }
            
			// highlights attackable pieces in rook's path
			for (let i = 0; i < passiveSide.length; i++) {
				if (passiveSide[i].id === rookPathId) {
					litDivs.push( rookPathId );
				}
			}
        } 

        first(+pieceToMove.id[0] + 1);
		first( pieceToMove.id[0] - 1);
        
        second(+pieceToMove.id[1] + 1);
		second( pieceToMove.id[1] - 1);
    }
    
	function kingLit() {
		// highlights all possible moves for activeKing
		console.log('ENTERS kingLit()');

        canCheck = false;
        kingSpacesUnderAttack = [];

        // covers king castling
		if (!kingAttackers.length) { // if king not in check
			if (pieceToMove.getAttribute('data-side') === 'blue') {
				if (!blueKingFirstMove) {
                    if (!blueRook1FirstMove) {
						if (['17', '27', '37'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
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
						if (['57', '67'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
							noCastle = false;

                            for (let i = 0; i < 2; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['57', '67'][i])) {
										noCastle = true;
									}
								}
                            }
                            if (!noCastle) { castleIds.push('67'); }
						}
					}
				}
			}
			else { // since activeSide is orange
				if (!orangeKingFirstMove) {
					if (!orangeRook1FirstMove) {
						if (['10', '20', '30'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
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
						if (['50', '60'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
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
		// lightens & click-listens all castleIds
		if (castleIds.length) { // if king is castling

            castleIds.forEach(id => {

                document.getElementById(id).classList.add('castleLit');

                document.getElementById(id).addEventListener('click', castling);
			});
		}
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
					// ----------------------------------------------------------
					if ( (+space[1] >= 0) && (+space[1] <= 7) ) { return space; }
				}
			}).filter(item => { return item !== undefined; });

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

            // populates litDivs with safe kingSpaces
			openAndOpponentHeldKingSpaces.forEach(id => {
                canCheck = false;
				// for each oAOHKS & each passivePiece
				for (let i = 0; i < passiveSide.length; i++) {
					// if passivePiece can check the oAOHKS...(kingSpace devoid of activePiece)
					if (checkingSpace(passiveSide[i], id)) {

                        console.log(passiveSide[i].getAttribute('data-side') + ' ' + passiveSide[i].getAttribute('data-name') + ' can attack ' + id);

                        canCheck = true;
						break;
					}
				}
				if (!canCheck) { litDivs.push(id); }
            });
            console.log('litDivs -->');  console.log(litDivs);
		}
	}

    // returns true/false if somePiece can attack checkSpaceId
    function checkingSpace(somePiece, checkSpaceId) {
        
        pinnedPieces = [];
        pathOfCheck = [];

        function pawnAttacks(pawn) {

            if (pawnBlocksKingAttacker) {
                // inCheck() sets pawnBlocksKingAttacker
                // sees if pawn can block checkSpaceId
                if (pawn.getAttribute('data-side') === 'blue') {
                    // if blue turn
                    if (checkSpaceId === pawn.id[0] + (pawn.id[1] - 1)) {
                        // if checkSpaceId is one ahead of blue pawnToMove
                        return true;
                    }
                    else if (document.getElementById(
                        pawn.id[0] + (pawn.id[1] - 1)
                    ).getAttribute('data-side') === 'empty') {
                        // if empty cell one ahead of bluePawn
                        if (pawn.id[1] === '6') {
                            // if blue pawnToMove in row 6
                            if (checkSpaceId === pawn.id[0] + (pawn.id[1] - 2)) {
                                // if checkSpaceId is two ahead of blue pawnToMove
                                return true;
                            }
                        }
                    }
                    return false;
                }
                else { // since orange turn
                    // collects empty space one ahead of orange pawnToMove
                    if (checkSpaceId === pawn.id[0] + (+pawn.id[1] + 1)) {
                        // if checkSpaceId is one ahead of orange pawnToMove
                        return true;
                    }
                    // collects empty space two ahead of orange pawnToMove
                    else if (document.getElementById(
                        pawn.id[0] + (+pawn.id[1] + 1)
                    ).getAttribute('data-side') === 'empty') {
                        // if empty cell one ahead of orangePawn
                        if (pawn.id[1] === '1') {
                            // if orange pawnToMove in row 1
                            if (checkSpaceId === pawn.id[0] + (+pawn.id[1] + 2)) {
                                // if checkSpaceId is two ahead of orange pawnToMove
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }
            else { // since !pawnBlocksKingAttacker
                // sees if pawn can eat checkSpaceId
                if (pawn.id[0] - 1 == checkSpaceId[0]
                || (+pawn.id[0] + 1) == checkSpaceId[0]) {
                    // if pawn is blue
                    if (pawn.getAttribute('data-side') === 'blue') {
                        return checkSpaceId[1] == (pawn.id[1] - 1);
                    }
                    // since pawn is orange
                    else { return checkSpaceId[1] == (+pawn.id[1] + 1); }
                }
                return false;
            }
        }

        // returns true/false if knight can attack checkSpaceId
        function knightAttacks(knight) {
            // to hold two spaces where knight might checkSpaceId
            knightMoves = [];
            // if knight is left of checkSpaceId
            if (knight.id[0] < checkSpaceId[0]) {
                // and if knight is above checkSpaceId
                if (knight.id[1] < checkSpaceId[1]) {

                    knightMoves.push(
                        (+knight.id[0] + 1) +
                        (+knight.id[1] + 2).toString()
                    );
                    // console.log('knightMoves -->'); console.log(knightMoves);
                    knightMoves.push(
                        (+knight.id[0] + 2) +
                        (+knight.id[1] + 1).toString()
                    ); 
                    // console.log('knightMoves -->'); console.log(knightMoves);
                }
                else { // since knight is left of & below checkSpaceId
                    knightMoves.push(
                        (+knight.id[0] + 1) +
                        (knight.id[1] - 2).toString()
                    );
                    knightMoves.push(
                        (+knight.id[0] + 2) +
                        (knight.id[1] - 1).toString()
                    );
                }
            }
            else { // since knight is right of & above checkSpaceId
                if (knight.id[1] < checkSpaceId[1]) {
                    knightMoves.push(
                        (knight.id[0] - 1) +
                        (+knight.id[1] + 2).toString()
                    );
                    knightMoves.push(
                        (knight.id[0] - 2) +
                        (+knight.id[1] + 1).toString()
                    );
                }
                else { // since knight is right of & below checkSpaceId
                    knightMoves.push(
                        (knight.id[0] - 1) +
                        (knight.id[1] - 2).toString()
                    );
                    knightMoves.push(
                        (knight.id[0] - 2) +
                        (knight.id[1] - 1).toString()
                    );
                }
            }
            return knightMoves.includes(checkSpaceId); 
        }

        // returns true/false if bishop can attack checkSpaceId
        function bishopAttacks(bishop) {
            // checks for clear path between bishop.id & checkSpaceId
            bishopMoves = []; // collects spaces bishop attacks enroute to checkSpaceId
            nails = []; // collects possible pinnedPieces
            bishopX = +bishop.id[0];
            bishopY = +bishop.id[1];

            // bishop & checkSpaceId cannot have the same id
            if (bishop.id === checkSpaceId) { return false; }

            // (LEFT BOARD SIDE) if bishop.id is left of checkSpaceId
            if (bishop.id[0] < checkSpaceId[0]) {
                // (FIRST QUADRANT) and if bishop is above checkSpaceId
                if (bishop.id[1] < checkSpaceId[1]) {
                    // if bishop's path aligns with checkSpaceId
                    if ( (checkSpaceId[0] - bishop.id[0]) 
                    === (checkSpaceId[1] - bishop.id[1]) ) {
                        // collects bishop's attack path to checkSpaceId
                        while ( bishopX < (checkSpaceId[0] - 1) ) {
                            bishopX += 1;
                            bishopY += 1;
                            bishopMoves.push( bishopX + bishopY.toString() );
                        }
                    }
                    else { return false; } // bishop can't checkSpaceId
                }
                else { // (THIRD QUADRANT) bishop is left of & below checkSpaceId
                    // if bishop aligns with checkSpaceId
                    if ( (checkSpaceId[0] - bishop.id[0])
                    === (bishop.id[1] - checkSpaceId[1]) ) {
                        // collects bishop's attack path to checkSpaceId
                        while ( (bishopX < checkSpaceId[0] - 1) ) {
                            bishopX += 1;
                            bishopY -= 1;
                            bishopMoves.push( bishopX + bishopY.toString() );
                        }
                    }
                    else { return false; } // bishop cannot checkSpaceId
                }
            }
            else { // (RIGHT BOARD SIDE) since bishop is right of checkSpaceId
                // (SECOND QUADRANT) & since bishop is above checkSpaceId
                if (bishop.id[1] < checkSpaceId[1]) {
                    // if bishop aligns with checkSpaceId
                    if ( (bishop.id[0] - checkSpaceId[0])
                    === (checkSpaceId[1] - bishop.id[1]) ) {
                        // collects bishop's attack path to checkSpaceId
                        while ( bishopX > (checkSpaceId[0] + 1) ) {
                            bishopX -= 1;
                            bishopY += 1;
                            bishopMoves.push( bishopX + bishopY.toString() );
                        }
                    }
                    else { return false; } // bishop can't checkSpaceId
                }
                else { // (FOURTH QUADRANT)
                    // since bishop is right of & below checkSpaceId
                    // if bishop aligns with checkSpaceId
                    if ( (bishop.id[0] - checkSpaceId[0])
                    === (bishop.id[1] - checkSpaceId[1]) ) {
                        // collects bishop's attack path to checkSpaceId
                        while ( bishopX > (checkSpaceId[0] + 1) ) {
                            bishopX -= 1;
                            bishopY -= 1;
                            bishopMoves.push( bishopX + bishopY.toString() );
                        }
                    }
                    else { return false; } // bishop can't attack king
                }
            }
            console.log('bishopMoves -->');  console.log(bishopMoves);

            // populates nails with pieces that block bishop's path to checkSpaceId
            bishopMoves.forEach(bishopMove => {
                blocker = document.getElementById( bishopMove );
                if (blocker.getAttribute('data-side') !== 'empty') { nails.push(blocker); }
            });
            console.log('nails -->');  console.log(nails);

            // returns true/false if no piece blocks bishop's path to checkSpaceId
            if (!nails.length) { // note: nails may contain pieces from both sides
                // pathOfCheck array becomes bishop's id route to checkSpaceId
                pathOfCheck = bishopMoves;
                console.log('pathOfCheck -->');  console.log(pathOfCheck);
                return true; // bishop can attack checkSpaceId
            }
            if (nails.length === 1) { // if only one nail
                if (nails[0] !== activeKing) {
                    // if that nail & bishop aren't on the same side
                    if (nails[0].getAttribute('data-side') !== bishop.getAttribute('data-side')) {
                        pinnedPieces.push(
                            { pinner: bishop, pinned: nails[0] }
                        );
                        tempPinnedPieces.push(
                            { pinner: bishop, pinned: nails[0] }
                        );
                        nails[0].setAttribute('data-pinned', true);
                        nails[0].setAttribute('data-pinner', bishop);
                        alert(nails[0].getAttribute('data-side') + ' ' + nails[0].getAttribute('data-name') + ' IS PINNED');
                        console.log('pinnedPieces -->');  console.log(pinnedPieces);
                    }
                }
            }
            return false; // bishop cannot attack checkSpaceId
        }

        // returns true/false if rook can attack checkSpaceId
        function rookAttacks(rook) {
            // checks for clear path between rook.id & checkSpaceId
            rookMoves = []; // collects spaces rook attacks enroute to checkSpaceId
            nails = []; // collects possible pinnedPieces
            // if rook & checkSpaceId share column
            if (rook.id[0] === checkSpaceId[0]) {
                // if rook below checkSpaceId, rook.y++
                if (rook.id[1] < checkSpaceId[1]) {
                    for (let i = (+rook.id[1] + 1); i < checkSpaceId[1]; i++) {
                        rookMoves.push( checkSpaceId[0] + i ); // an id
                    }
                }
                else { // since rook is above checkSpaceId, rook.id[1]--
                    for (let i = (rook.id[1] - 1); i > checkSpaceId[1]; i--) {
                        rookMoves.push( checkSpaceId[0] + i ); // an id
                    }
                }
            } // pushes column spaces between rook & checkSpaceId to rookMoves

            // else if rook & checkSpaceId share row
            else if (rook.id[1] === checkSpaceId[1]) {
                // if rook left of checkSpaceId, rook.id[0]++
                if (rook.id[0] < checkSpaceId[0]) {
                    for (let i = (+rook.id[0] + 1); i < checkSpaceId[0]; i++) {
                        rookMoves.push( i + checkSpaceId[1] ); // an id
                    }
                }
                else { // since rook right of checkSpaceId, rook.id[0]--
                    for (let i = (rook.id[0] - 1); i > checkSpaceId[0]; i--) {
                        rookMoves.push( i + checkSpaceId[1] ); // an id
                    }
                }
            }  // pushes row spaces between rook & checkSpaceId to rookMoves
            
            else { return false; } // rook can't checkSpaceId
            // console.log('rookMoves -->');  console.log(rookMoves);
            
            // populates nails with pieces that block rook's path to checkSpaceId
            rookMoves.forEach(rookMove => {
                blocker = document.getElementById( rookMove );
                if (blocker.getAttribute('data-side') !== 'empty') { nails.push(blocker); }
            });
            // console.log('nails -->');  console.log(nails);
            
            // returns true/false if no piece blocks rook's path to checkSpaceId
            if (!nails.length) { // nails can be both sides
                // pathOfCheck array becomes rook.id route to checkSpaceId
                if (rook.getAttribute('data-name') === 'queen') {
                    pathOfCheck = [...pathOfCheck, ...rookMoves];
                }
                else { pathOfCheck = rookMoves; }
                return true; // rook can attack checkSpaceId
            }
            if (nails.length === 1) { // if only one nail
                // if that nail & rook aren't on the same side
                if (nails[0].getAttribute('data-side') !== rook.getAttribute('data-side')) {
                    pinnedPieces.push(
                        { pinner: rook, pinned: nails[0] }
                    );
                    tempPinnedPieces.push(
                        { pinner: rook, pinned: nails[0] }
                    );
                    nails[0].setAttribute('data-pinned', true);
                    nails[0].setAttribute('data-pinner', rook);
                    alert(nails[0].getAttribute('data-side') + ' ' + nails[0].getAttribute('data-name') + ' IS PINNED');
                    console.log('pinnedPieces -->');  console.log(pinnedPieces);
                }
            }
            return false; // rook cannot attack checkSpaceId
        }

        // returns true/false if queen can attack checkSpaceId
        function queenAttacks(queen) {
            return (
                bishopAttacks(queen, checkSpaceId) 
                || rookAttacks(queen, checkSpaceId)
            );
        }

        // returns true if king can attack checkSpaceId
        function kingAttacks(king) {
            
            switch (+checkSpaceId[0]) { // if checkSpaceId's column equals...
                case +king.id[0]: // king's column
                    return (
                        ( +checkSpaceId[1] === (+king.id[1] + 1) )
                        || 
                        ( +checkSpaceId[1] === (king.id[1] - 1) )
                    );
                case +king.id[0] + 1: // king's column + 1
                    return (
                        (  checkSpaceId[1] ===   king.id[1] )
                        ||
                        ( +checkSpaceId[1] === (+king.id[1] + 1) )
                        ||
                        ( +checkSpaceId[1] ===  (king.id[1] - 1) )
                    );
                case king.id[0] - 1: // king's column - 1
                    return (
                        ( checkSpaceId[1] === king.id[1] )
                        ||
                        ( +checkSpaceId[1] === (+king.id[1] + 1) )
                        ||
                        ( +checkSpaceId[1] === (king.id[1] - 1) )
                    );
                default: return false;
            }
        }

        // sees if somePiece can check space
        switch (somePiece.getAttribute('data-name')) {
            case 'pawn':    return pawnAttacks(somePiece);
            case 'knight':  return knightAttacks(somePiece); 
            case 'bishop':  return bishopAttacks(somePiece);
            case 'rook':    return rookAttacks(somePiece);
            case 'queen':   return queenAttacks(somePiece);
            case 'king':    return kingAttacks(somePiece);
        }
    } // returns true/false if somePiece can attack checkSpaceId


    // ********** META-LOGIC **********

    // startsActiveClock();
    
    // sets activeKing
	for (i = 0; i < activeSide.length; i++) {      
        if (activeSide[i].getAttribute('data-name') === 'king') {
            activeKing = activeSide[i];
            break;
		}
    }  console.log('activeKing -->');  console.log(activeKing);

    // pushes passivePieces that check activeKing into kingAttackers
	passiveSide.forEach(passivePiece => {

        if (checkingSpace(passivePiece, activeKing.id)) {
            kingAttackers.push(passivePiece);
			console.log('pathOfCheck -->');  console.log(pathOfCheck);
		}
    });  console.log('kingAttackers -->');  console.log(kingAttackers);

    if (kingAttackers.length) { inCheck(); } // if in check
    
	else { // since not in check
		activeSide.forEach(activePiece => {
			activePiece.addEventListener('click', wherePieceCanMove);
		});
	}
}

