var pieces, knightCells, pinningPiece, rubbishIds, pawnBlocksKingAttacker, pathToCheck, idToBlock, kingAttackers= [], greyLitPieces = [], defenders = [], pawnDefenders = [], enPassantCell = '', orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1, enPassanting = false,
heroics = [], anId, pins, kingLitIds = [], tempLitIds, checkSpaceId, pinnedLitIds, behindKingId, kingLitPiece, kingStuck, preventMateIds = [], kingMovesOutOfCheck = [], possiblePinnedMoves, kingMovesOutOfCheck, newPieceClicked, pinnerPiece, tempPinnedPieces, greyPieceToMove, pathPiece, activePieceIsPinned, litSpace, blocker, mate = false, passiveSideCoversId, canEatKingAttacker = [], greyLitDivs, canBlockPathOfCheck = [], gameOver, kingSlayer, checkPath, emptySpaces, knightLight, bishopPathId, rookPathId, blueKingFirstMove, blueRook1FirstMove, activeKing, blueRook2FirstMove,  orangeKingFirstMove, orangeRook1FirstMove, orangeRook2FirstMove, castleIds = [], noCastle, kingAble, pieceToMove, goToDiv, enPassantDiv, prevGoToDiv, enPassantGoToDiv, pawnJumpDiv, enPassantables2 = [], enPassantedPawn, knightLight, takenOrangeBox, takenBlueBox, gameEnds, tempSide, movedPiece, mainLitDiv, litIds, unLitDivs, img, index1, index2, tempPiece, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, defenders, pinnedPieces, pathOfCheck = [], nails, whites, blacks;

const board = document.getElementById('board');

var blueNodes = board.querySelectorAll("[data-side='blue']");
var orangeNodes = board.querySelectorAll("[data-side='orange']");

var blues = Array.from(blueNodes);
var oranges = Array.from(orangeNodes);

var activeSide = blues;
var passiveSide = oranges;

///////////////////////////
///////////////////////////

function clocks() {
	return;
}

function toggleClocks() {
	return;
}

function inCheck() {

	console.log('ENTERS inCheck()');
	console.log('behindKingId -->');  console.log(behindKingId);

	console.log('litIds -->');  console.log(litIds);

	checkPath = pathOfCheck;
	
	console.log('checkPath -->');  console.log(checkPath);

	if (checkPath.includes(behindKingId)) {
		checkPath.splice(checkPath.indexOf(behindKingId), 1);
	}
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
	else { kingStuck = true; } // unnecessary?
	
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
	else { // since multiple kingAttackers, only activeKing prevents checkmate...
		// checkmate if king stuck
		if (kingStuck) { return endOfGame(); }
		// else move activeKing
		else { addLitDivHandler(selectGreyPiece); }
	}
}

function selectGreyPiece(e) {

	if (greyPieceToMove !== undefined) {
		greyPieceToMove.classList.remove('mainLit');
		greyPieceToMove.addEventListener('click', selectGreyPiece);
	}

	console.log('litIds -->'); console.log(litIds);

	// removeLitDivHandler(moveGreyPiece); --> without litIds = []
	if (litIds.length) { // resets each litId of class & click-listeners
		litIds.forEach( id => {
			litPiece = document.getElementById( id );
			// --------------------------------------
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	} litIds = [];

	if (kingLitIds.length) {
		kingLitIds.forEach( id => {
			litPiece = document.getElementById( id );
			// --------------------------------------
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	}

	greyPieceToMove = e.target;
	// temporarily disables clicking of this piece
	greyPieceToMove.removeEventListener('click', selectGreyPiece);
	greyPieceToMove.classList.add('mainLit');

	if (greyPieceToMove.dataset.name === 'king') {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById( id );
			litPiece.classList.add( 'lit' );
			litPiece.addEventListener( 'click', moveGreyPiece );
		});
	}

	if (canEatKingAttacker.includes(e.target)) {
		litIds.push(kingAttackers[0].id);
	}

	canBlockPathOfCheck.forEach(obj => {
		if (obj.pathBlocker === e.target) {
			litIds.push(obj.emptyDivId);
		}
	});

	addLitDivHandler(moveGreyPiece);
}

function moveGreyPiece(e) {
	
	console.log('ENTERS moveGreyPiece()');
	
	// resets greyPieceToMove
	greyPieceToMove.classList.remove('mainLit');
	greyPieceToMove.classList.remove('preventMateLit');

	if (greyPieceToMove.dataset.name === 'king') {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById( id );
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	}

	// clears and resets greyLitPieces
	greyLitPieces.forEach(greyLitPiece => {
		greyLitPiece.removeEventListener('click', selectGreyPiece);
		greyLitPiece.classList.remove('preventMateLit');
	});
	greyLitPieces = [];

	removeLitDivHandler(moveGreyPiece);

	if (e.target.dataset.side !== 'empty') { eat(e.target); }

	swapSide(greyPieceToMove, e.target);

	toggleSides();
}

function wherePieceCanMove(e) { // pieceLit(e)
	// if not first click of this turn
	if (newPieceClicked !== undefined) {
		// on-clicking new piece, enables clicking prior clicked piece
		newPieceClicked.addEventListener('click', wherePieceCanMove);
	}
	
	newPieceClicked = e.target;
	// disables further clicking of this piece
	e.target.removeEventListener('click', wherePieceCanMove);

	cleanUpAfterFirstClick();

	pieceToMove = e.target;

	if (!enPassanting) { goToDiv = undefined; }

	pieceToMove.classList.add('mainLit');

	if (pieceToMove.dataset.pinned === 'true') {
		pinnedPieceLit(); // gets pinnedIds where pinned pieceToMove can go
		if (pinnedLitIds.length) {
			pinnedLitIds.forEach( pinnedLitId => {
				litPiece = document.getElementById( pinnedLitId );
				litPiece.classList.add( 'lit' );
				litPiece.addEventListener( 'click', movePiece );
			});
		}
	}
	else { possibleMoves(); }
}

function possibleMoves() {

	console.log('ENTERS possibleMoves()');
	// highlights clicked piece's possible moves

	switch (pieceToMove.dataset.name) {
		case 'pawn':    pawnLit();              break;
		case 'knight':  knightLit();            break;
		case 'bishop':  bishopLit();            break;
		case 'rook':    rookLit();              break;
		case 'queen':   bishopLit(); rookLit(); break;
		case 'king':    kingLit();              break;
		
		default: alert('default ERROR! pieceToMove is empty');
	}
	// lightens & click-listens to litIds --> movePiece(e)
	if (litIds.length) { addLitDivHandler(movePiece); }
}

function movePiece(e) {

	console.log('ENTERS movePiece(e)');

	console.log('removes click-listener from litIds & pieceToMove');

	// removes click-listener from pieceToMove
	pieceToMove.removeEventListener( 'click', wherePieceCanMove );

	// un-lightens mainDiv
	pieceToMove.classList.remove( 'mainLit' );

	if (pieceToMove.dataset.pinned === 'true') {
		pinnedLitIds.forEach( pinnedLitId => {
			litPiece = document.getElementById( pinnedLitId );
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', movePiece );
		});
	}
	else { removeLitDivHandler(movePiece); }

	// prevents castling after king's first move
	if (pieceToMove.dataset.name === 'king') {
		if (pieceToMove.dataset.side === 'blue') {
			blueKingFirstMove = true;
		} 
		else { orangeKingFirstMove = true; }
	}
	
	// prevents castling after rook's first move
	if (pieceToMove.dataset.name === 'rook') {
		if (pieceToMove.dataset.side === 'blue') {
			if (pieceToMove.id === '07') { blueRook1FirstMove = true; }
			else if (pieceToMove.id === '77') { blueRook2FirstMove = true; }
		} 
		else {
			if (pieceToMove.id === '00') { orangeRook1FirstMove = true; }
			else if (pieceToMove.id === '70') { orangeRook2FirstMove = true; }
		}
	}
	console.log('un-lightens mainDiv & litIds');
	
	goToDiv = e.target; // unnecessary, use e.target instead
	
	console.log('pieceToMove -->');  console.log(pieceToMove);
	console.log('goToDiv -->');      console.log(goToDiv);
	console.log('pawnJumpDiv -->');  console.log(pawnJumpDiv);
	
	// covers enPassant pawn attack
	if (goToDiv.dataset.side === 'empty') {
		console.log('goToDiv IS empty');            

		if (pieceToMove.dataset.name === 'pawn') {
			
			if (enPassanting) {
				if (goToDiv === enPassantDiv) {
					console.log('enPassant pawn attack is happening');
					eat(pawnJumpDiv);                       
					// sets pawnJumpDiv to empty cell
					pawnJumpDiv.setAttribute('data-name', 'empty');
					pawnJumpDiv.setAttribute('data-side', 'empty');
					pawnJumpDiv.setAttribute('src', './images/transparent.png');
				} 
			}
			// covers bluePawn taking a NON-enPassant empty space
			if (activeKing.dataset.side === 'blue') { // if blue's turn
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
	else { // covers pieceToMove eats goToDiv
		console.log('since goToDiv is NOT empty, pieceToMove eats goToDiv');
		eat(goToDiv);
	}
	// covers pawnToMove moving one or two empty spaces
	swapSide(pieceToMove, goToDiv);
	toggleSides();
}

function pawnEvolve(e) {
	// uses pieceToMove for pawn & e.target for new piece

	// re-informs goToDiv
	goToDiv.setAttribute('data-name', e.target.dataset.name);
	goToDiv.setAttribute('data-side', e.target.dataset.side);
	goToDiv.setAttribute('src', e.target.src);

	// gets pieceToMove's activeSide index
	index1 = passiveSide.indexOf(pieceToMove);

	// removes now-empty pieceToMove from activeSide    
	passiveSide.splice(index1, 1);

	// updates activeSide & pieces array
	passiveSide.push(goToDiv);
	// pieces = [...activeSide, ...passiveSide];

	// un-informs pieceToMove
	pieceToMove.setAttribute('data-name', 'empty');
	pieceToMove.setAttribute('data-side', 'empty');
	pieceToMove.setAttribute('src', './images/transparent.png');

	// closes modal window
	if (e.target.dataset.side === 'blue') {
		document.querySelector('.modalBlue').classList.toggle("show-modal");
	}
	else if (e.target.dataset.side === 'orange') { document.querySelector('.modalOrange').classList.toggle("show-modal"); }
}

function swapSide(fromDiv, toDiv) {
	// swaps pieceToMove & goToDiv info
	console.log('ENTERS swapSide()');
	// handles blue pawn evolution modal window
	if ( (fromDiv.dataset.name === 'pawn') && (toDiv.id[1] === '0') ) {
		document.querySelector('.modalBlue').classList.toggle("show-modal");
		document.getElementById('blueQueen').addEventListener(
			'click', pawnEvolve
		);
		document.getElementById('blueKnight').addEventListener(
			'click', pawnEvolve
		);
	} // handles orange pawn evolution modal window
	else if ( (fromDiv.dataset.name === 'pawn') && (toDiv.id[1] === '7') ) {
		document.querySelector('.modalOrange').classList.toggle("show-modal");
		document.getElementById('orangeQueen').addEventListener(
			'click', pawnEvolve
		);
		document.getElementById('orangeKnight').addEventListener(
			'click', pawnEvolve
		);
	}
	else { // since no pawn evolution
		// re-informs goToDiv
		toDiv.setAttribute('data-name', fromDiv.dataset.name);
		toDiv.setAttribute('data-side', fromDiv.dataset.side);
		toDiv.setAttribute('src', fromDiv.src);

		// gets pieceToMove's activeSide index
		index1 = activeSide.indexOf(fromDiv);

		// removes now-empty pieceToMove from activeSide    
		activeSide.splice(index1, 1);

		// updates activeSide & pieces array
		activeSide.push(toDiv);
		// pieces = [...activeSide, ...passiveSide];

		// if not an enPassant attack, resets enPassant process
		if (pieceToMove.dataset.name === 'pawn') {
			if (toDiv !== pawnJumpDiv) { enPassantReset(); }
		}
		else { enPassantReset(); }

		// un-informs pieceToMove
		fromDiv.setAttribute('data-name', 'empty');
		fromDiv.setAttribute('data-side', 'empty');
		fromDiv.setAttribute('src', './images/transparent.png');
	}
	console.log('EXITS swapSide()');
}

function eat(piece) {

	// eat(goToDiv); --> normal pawn attack
	// eat(pawnJumpDiv); --> enPassant attack

	console.log('ENTERS eat('+piece+')');

	// puts piece in its takenBox
	if (activeKing.dataset.side === 'blue') { // if blue side
		document.getElementById(
			blueTakenBoxIdCounter.toString()
		).src = piece.src;

		blueTakenBoxIdCounter -= 1;
	}
	else { // since orange turn, does the same
		document.getElementById(
			orangeTakenBoxIdCounter.toString()
		).src = piece.src;

		orangeTakenBoxIdCounter -= 1;
	}

	// gets piece's passiveSide index
	index2 = passiveSide.indexOf(piece);

	// removes piece from passiveSide array
	passiveSide.splice(index2, 1);

	console.log('EXITS eat()');
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
	castleIds = [];  litIds = [];
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
		).removeEventListener('click', wherePieceCanMove);
	});
	
	toggleSides();
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

function addLitDivHandler(funcName) {

	litIds.forEach( litDiv => {
		litPiece = document.getElementById( litDiv );
		litPiece.classList.add( 'lit' );
		litPiece.addEventListener( 'click', funcName );
	});
}

function removeLitDivHandler(funcName) {

	litIds.forEach( litDiv => {
		litPiece = document.getElementById( litDiv );
		litPiece.classList.remove( 'lit' );
		litPiece.removeEventListener( 'click', funcName );
	});
	litIds = [];
}

function cleanUpAfterFirstClick() {
	// resets litIds on clicking multiple activeSide pieces
	if (pieceToMove !== undefined) {
		// un-lightens & stops click-listening to pieceToMove
		pieceToMove.removeEventListener( 'click', movePiece );
		pieceToMove.classList.remove( 'mainLit' );
		
		// un-lightens, clears out & stops click-listening to litIds
		if (litIds.length) { removeLitDivHandler(movePiece); }
		// un-lightens, clears out & stops click-listening to litIds
		if (pinnedLitIds) {
			pinnedLitIds.forEach( pinnedLitId => {
				litPiece = document.getElementById( pinnedLitId );
				litPiece.classList.remove( 'lit' );
				litPiece.removeEventListener( 'click', movePiece );
			});
		}
		
		// un-lightens, clears out & stops click-listening to castleIds
		if (castleIds.length) { // if king ready to castle
			
			castleIds.forEach(id => { // resets castling process
				document.getElementById( id ).classList.remove( 'castleLit' );
				document.getElementById( id ).removeEventListener( 'click', castling );
			});
			castleIds = [];
		}
	}
}

function pinnedPieceLit() {
	console.log('ENTERS pinnedPieceLit()');

	for (let i = 0; i < pinnedPieces.length; i++) {
		// assigns pinned pieceToMove's pinnerPiece
		if (pieceToMove === pinnedPieces[i].pinned) {
			pinnerPiece = pinnedPieces[i].pinner;
			break;
		}
	}
	// provides pinned pieceToMove's id path to pinner piece 
	checkingSpace(pieceToMove, pinnerPiece.id);
	tempLitIds = pathOfCheck;
	// provides pinned pieceToMove's id path to its own king
	checkingSpace(pieceToMove, activeKing.id);
	pinnedLitIds = [...pathOfCheck, ...tempLitIds];
	// if pinned piece can eat its pinnerPiece, add it to pinnedIds 
	if (checkingSpace(pieceToMove, pinnerPiece.id)) {
		pinnedLitIds.push(pinnerPiece.id);
	}
}

function toggleSides() {
	// removes click-listeners from activePieces
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});
	// console.log(activeKing);
	// toggles side & starts next move 
	if (activeSide[0].dataset.side === 'blue') {
		// toggleClocks();
		console.log('toggles activeSide to orange');
		
		activeSide = oranges;
		passiveSide = blues;
		
		lit();
	}
	
	else { // since activeKing is orange
		// toggleClocks();
		console.log('toggles activeSide to blue');
		
		activeSide = blues;
		passiveSide = oranges;
		
		lit();
	}
}

function endOfGame() {
	// document.getElementById( 'board' ).classList.add( 'noClick' );
	
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});


	alert(activeKing.dataset.side + ' KING CHECKMATED!');
	console.log(activeKing.dataset.side + ' KING CHECKMATED!');
	console.log('END OF GAME');
}

function pawnLit() {

	console.log('enters pawnLit()');

	// highlights all possible moves for blue pawnToMove
	if (activeKing.dataset.side === 'blue') {
		// if enPassant attack is possible
		if (enPassanting) { // same as: if (pawnJumpDiv.length) ?
			// covers enPassant attack
			
			// if bluePawnToMove is beside pawnJump,
			if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
			|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
				// adds bluePawnToMove's enPassant-attack-div to litIds
				enPassantDiv = document.getElementById(
					pawnJumpDiv.id[0] + (pawnJumpDiv.id[1] - 1) 
				);
				litIds.push( enPassantDiv.id );
			}
		}
		// collects potential normal attack divs
		passiveSide.forEach(passivePiece => {
			// if passivePiece is one row ahead of blue pawnToMove
			if (passivePiece.id[1] == (pieceToMove.id[1] - 1)) {
				// if passivePiece is right beside blue pawnToMove
				if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
					litIds.push(passivePiece.id);
				}
				// if passivePiece is left beside blue pawnToMove
				if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
					litIds.push(passivePiece.id);
				}
			}
		});
		// collects empty space one ahead of blue pawnToMove
		if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).dataset.side === 'empty') { 
			litIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));

			// collects empty space two ahead of blue pawnToMove
			// if blue pawnToMove in row 6
			if (pieceToMove.id[1] === '6') {
				// if empty cell two ahead of blue pawnToMove
				if (document.getElementById(pieceToMove.id[0]
				+ (pieceToMove.id[1] - 2)).dataset.side === 'empty') {
					litIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));
				}
			}
		}
	}
	else { // since orange's turn
		// if enPassant attack is possible
		if (enPassanting) { // if (pawnJumpDiv.length) {}
			if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
			|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
				// adds enPassant attack div to litIds
				enPassantDiv = document.getElementById(
					pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1)
				);
				litIds.push( enPassantDiv.id );
			}
		}
		// collects potential normal attack divs
		passiveSide.forEach(passivePiece => {
			// if passivePiece is one row ahead of orange pawnToMove
			if (passivePiece.id[1] == (+pieceToMove.id[1] + 1)) {
				// if passivePiece is right beside orange pawnToMove
				if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
					litIds.push(passivePiece.id);
				}
				// if passivePiece is left beside orange pawnToMove
				if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
					litIds.push(passivePiece.id);
				}
			}
		});
		
		if (document.getElementById(
			pieceToMove.id[0] + (+pieceToMove.id[1] + 1)
		).dataset.side === 'empty') {
			// collects empty space one ahead of orange pawnToMove
			litIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));
			
			// collects empty space two ahead of orange pawnToMove
			if (pieceToMove.id[1] === '1') { // if orange pawnToMove in row 1
				// if empty cell two ahead of orange pawnToMove
				if (document.getElementById(
					pieceToMove.id[0] + (+pieceToMove.id[1] + 2)
				).dataset.side === 'empty') {
					// pushes that empty cell to litIds array
					litIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 2));
				}
			}
		}
	}
} // fills litIds with ids where pawn can move

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
}

function knightSpaces(knight) { 
	return [
		(+knight.id[0] + 1) + (+knight.id[1] + 2).toString(),
		(+knight.id[0] + 1) +  (knight.id[1] - 2).toString(),
		(knight.id[0] - 1) + (+knight.id[1] + 2).toString(),
		(knight.id[0] - 1) +  (knight.id[1] - 2).toString(),
		(+knight.id[0] + 2) + (+knight.id[1] + 1).toString(),
		(+knight.id[0] + 2) +  (knight.id[1] - 1).toString(),
		(knight.id[0] - 2) + (+knight.id[1] + 1).toString(),
		(knight.id[0] - 2) +  (knight.id[1] - 1).toString()
	];
}

function knightLit() {
	litIds = knightSpaces(pieceToMove).filter(onBoardNonActiveIds);
} // fills litIds with ids where knight can move

function bishopLit() {

	function quadrant(x, y) { // x & y are a number

		let bishopPath = document.getElementById( x.toString() + y );

		if (x >= 0) {
			if (x <= 7) {
				if (y >= 0) {
					if (y <= 7) { // since x & y are on the board..
						// collects id, if empty or passivePiece
						if (bishopPath.dataset.side === 'empty') {
							litIds.push( bishopPath.id );
							// rubbishIds.push( bishopPath.id );
							
							// increments x
							// if x is east of pieceToMove, continue east
							if (x > +pieceToMove.id[0]) { x += 1; }
							else { x -= 1; } // continue west
							
							// increments y
							// if y is south of pieceToMove, continue south
							if (y > +pieceToMove.id[1]) { y += 1; }
							else { y -= 1; } // continue north
							
							quadrant(x, y); // continue path
						}
						else if (bishopPath.dataset.side === passiveSide[0].dataset.side) {
							litIds.push( bishopPath.id ); // path ends
							// rubbishIds.push( bishopPath.id );
						}
					}
				}
			}
		}
	}
	// rubbishIds.push(pieceToMove.id);
	quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] + 1);

	// rubbishIds.push(pieceToMove.id);
	quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] - 1);
	
	// rubbishIds.push(pieceToMove);
	quadrant(+pieceToMove.id[0] - 1, +pieceToMove.id[1] + 1);

	// rubbishIds.push(pieceToMove);
	quadrant(+pieceToMove.id[0] - 1, +pieceToMove.id[1] - 1);
}  // fills litIds with ids where bishop can move

function rookLit() {
	// in case of queen
	if (pieceToMove.dataset.name === 'rook') { litIds = []; }

	function line(x, y) { // x & y are a number

		let rookPath = document.getElementById( x.toString() + y );

		if (x >= 0) {
			if (x <= 7) {
				if (y >= 0) {
					if (y <= 7) { // since x & y are on the board..
						// collects id, if empty or passivePiece
						if (rookPath.dataset.side === 'empty') {

							litIds.push( rookPath.id );
							
							// increments x
							if (x !== +pieceToMove.id[0]) {
								// if x is east of pieceToMove, continue east
								if (x > +pieceToMove.id[0]) { x += 1; }
								else { x -= 1; } // continue west
							}
							
							// increments y
							if (y !== +pieceToMove.id[1]) {
								// if y is south of pieceToMove, continue south
								if (y > +pieceToMove.id[1]) { y += 1; }
								else { y -= 1; } // continue north
							}

							line(x, y); // continue path
						}
						else if (rookPath.dataset.side === passiveSide[0].dataset.side) {
							litIds.push( rookPath.id ); // path ends
						}
					}
				}
			}
		}           
	} 

	line(+pieceToMove.id[0] + 1, +pieceToMove.id[1]);
	line(+pieceToMove.id[0] - 1, +pieceToMove.id[1]);
	line(+pieceToMove.id[0], +pieceToMove.id[1] + 1);
	line(+pieceToMove.id[0], +pieceToMove.id[1] - 1);
} // fills litIds with ids where rook can move

function kingLit() {
	// highlights all possible moves for activeKing
	console.log('ENTERS kingLit()');

	passiveSideCoversId = false;
	// kingSpacesUnderAttack = [];  // unnecessary

	// covers king castling
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
	// lightens & click-listens all castleIds
	if (castleIds.length) { // if king is castling
		castleIds.forEach(id => {
			document.getElementById(id).classList.add('castleLit');
			document.getElementById(id).addEventListener('click', castling);
		});
	}
	else { // since king not castling
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
			if (space !== behindKingId) {
				// if space is on the board
				if (onBoard(space)) { return space; }
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
	}
}  // fills litIds with ids where king can move

////////////////////////////////////////////////////////

function pawnAttacks(pawn) {

	if (pawnBlocksKingAttacker) { // set by inCheck()
		// sees if pawn can block checkSpaceId
		if (pawn.dataset.side === 'blue') {
			// if blue turn
			if (checkSpaceId === pawn.id[0] + (pawn.id[1] - 1)) {
				// if checkSpaceId is one ahead of blue pawnToMove
				return true;
			}
			else if (document.getElementById(
				pawn.id[0] + (pawn.id[1] - 1)
			).dataset.side === 'empty') {
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
			).dataset.side === 'empty') {
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
		if (+pawn.id[0] - 1 == checkSpaceId[0]
		|| (+pawn.id[0] + 1) == checkSpaceId[0]) {
			// if pawn is blue
			if (pawn.dataset.side === 'blue') {
				return checkSpaceId[1] == (pawn.id[1] - 1);
			}
			// since pawn is orange
			else { return checkSpaceId[1] == (+pawn.id[1] + 1); }
		}
		return false;
	}
} // returns true/false if pawn can attack checkSpaceId

// returns true/false if knight can attack checkSpaceId
function knightAttacks(knight) {

	function attacks(id) {
		if (id === checkSpaceId) { return id; }
	}
	
	if (knightSpaces(knight).filter(onBoardNonActiveIds).filter(attacks).length) {
		return true; 
	}
}

// returns true/false... if bishop can attack checkSpaceId,
// that is, if no piece blocks bishop's path to checkSpaceId
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
	else {
		// since bishop attacks in a southWest diagonal
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
				if (blocker.dataset.side !== 'empty') { nails.push(blocker); }
			}
		});
		console.log('nails -->');  console.log(nails);
	}

	// returns true/false if no piece blocks bishop's path to checkSpaceId
	if (!nails.length) { // note: nails may contain pieces from both sides
		// pathOfCheck array becomes bishop's id route to checkSpaceId
		pathOfCheck = bishopMoves;
		console.log('pathOfCheck -->');  console.log(pathOfCheck);
		return true; // bishop can attack checkSpaceId
	}
	if (nails.length === 1) { // if only one nail
		// if that nail & bishop aren't on the same side
		if (nails[0].dataset.side !== bishop.dataset.side) {
			if (nails[0] !== activeKing) {
				// collects bishop & nails[0]
				pinnedPieces.push(
					{ pinner: bishop, pinned: nails[0] }
				);
				// sets dataset.pinned & dataset.pinner for nails[0]
				nails[0].setAttribute('data-pinned', true);
				
				alert(nails[0].dataset.side + ' ' + nails[0].dataset.name + ' IS PINNED');
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
		// if that nail & rook aren't on the same side
		if (nails[0].dataset.side !== rook.dataset.side) {
			
			pinnedPieces.push(
				{ pinner: rook, pinned: nails[0] }
			);

			nails[0].setAttribute('data-pinned', true);
			
			alert(nails[0].dataset.side + ' ' + nails[0].dataset.name + ' IS PINNED');
			console.log('pinnedPieces -->');  console.log(pinnedPieces);
		}
	}
	return false; // rook cannot attack checkSpaceId
}

// returns true/false if queen can attack checkSpaceId
function queenAttacks(queen) {

	if (bishopAttacks(queen, checkSpaceId)) {
		queenAttack = 'bishop';
		return true;
	}
	if (rookAttacks(queen, checkSpaceId)) {
		queenAttack = 'rook';
		return true;
	}
	return false;
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

function checkingSpace(somePiece, someId) {
	checkSpaceId = someId;
	// sees if somePiece can check someId
	switch (somePiece.dataset.name) {
		case 'pawn':    return pawnAttacks(somePiece);
		case 'knight':  return knightAttacks(somePiece); 
		case 'bishop':  return bishopAttacks(somePiece);
		case 'rook':    return rookAttacks(somePiece);
		case 'queen':   return queenAttacks(somePiece);
		case 'king':    return kingAttacks(somePiece);
	}
} // returns true/false if somePiece can attack checkSpaceId

////////////////////////////////////////////////////////////

function lit() {

	pinnedLitIds = [];
	pinnedPieces = [];
	litIds = [];
	kingIds = [];
	kingAttackers = []; // passivePieces that check activeKing
	greyPieceToMove = undefined;
	newPieceClicked = undefined;
	pathOfCheck = [];
	canBlockPathOfCheck = [];
	canEatKingAttacker = [];
	pawnBlocksKingAttacker = false;
	kingStuck = false;
	findingKingAttackers = true;
	pins = [];

    // ********** META-LOGIC **********

	previousPinnedPieces = board.querySelectorAll("[data-pinned='true']");
	console.log('previousPinnedPieces -->');  console.log(previousPinnedPieces);

    // startsActiveClock();
    
    // sets activeKing
	for (i = 0; i < activeSide.length; i++) {      
        if (activeSide[i].dataset.name === 'king') {
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
	});

	if (previousPinnedPieces.length) {
		// collects each pinned piece into pins
		pinnedPieces.forEach(obj => { pins.push(obj.pinned); });
		console.log('pins -->');  console.log(pins);

		// for each previousPinnedPiece, if not in pins, un-pins that piece
		for (let i = 0; i < previousPinnedPieces.length; i++) {
			if (!pins.includes(previousPinnedPieces[i])) {
				console.log('unpins '+previousPinnedPieces[i]);
				// sets dataset.pinned to 'false' & dataset.pinner to 'empty'
				previousPinnedPieces[i].setAttribute('data-pinned', 'false');
			}
		}
	}

	console.log('pinnedPieces -->');  console.log(pinnedPieces);
	console.log('kingAttackers -->');  console.log(kingAttackers);
	
	findingKingAttackers = false;

    if (kingAttackers.length) { inCheck(); } // if in check
    
	else { // since not in check
		activeSide.forEach(activePiece => {
			activePiece.addEventListener('click', wherePieceCanMove);
		});
	}
}