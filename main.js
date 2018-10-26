var kingAttackers = [],
	greyLitPieces = [],
	kingLitIds = [],
	pathOfCheck = [],
	canBlockPathOfCheck = [],
	canEatKingAttacker = [],
	castleIds = [],
	moveHistory = [],
	bluePawnTakenBoxIdCounter = -1,
	blueTakenBoxIdCounter = -1,
	orangeTakenBoxIdCounter = 1,
	orangePawnTakenBoxIdCounter = 1,
	nails, storedGreyPieceToMove,
	enPassanting = false, drawForced = false,
	pins, kingInCheck, stuckActivePieces, litIds, storedLitIds,
	checkSpaceId, pinnedLitIds, behindKingId, pawnBlocksKingAttacker,
	kingStuck, newPieceClicked, pinnerPiece, greyPieceToMove, noCastle,
	blocker, passiveSideCoversId, checkPath, blueKingFirstMove,
	blueRook1FirstMove, activeKing, blueRook2FirstMove, pieceToMove,
	orangeKingFirstMove, orangeRook1FirstMove, orangeRook2FirstMove,
	goToDiv, enPassantDiv, pawnJumpDiv, index, index1, index2, pinnedPieces,
	moves, bishopMoves, bishopX, bishopY, openAndOpponentHeldKingSpaces,
	rookMoves, kingSpaces, isCastle, enPassantMove, currentBoard, pieceIds,
	firstReview, message, gameOver;

var board = document.getElementById('board'),
	
	blueGameOverModal = document.getElementById('modalGameOverBlue'),
	OrangeGameOverModal = document.getElementById('modalGameOverOrange'),
	
	blueNodes = board.querySelectorAll("[data-side='blue']"),
	orangeNodes = board.querySelectorAll("[data-side='orange']"),

	blues = Array.from(blueNodes),
	oranges = Array.from(orangeNodes),

	activeSide = blues,
	passiveSide = oranges,

	setBoard = blues.concat(oranges).map(piece => [piece.id, piece.src]),

	/////////////////////////////////////////////////////////////////////

	userInput = 10,
	obj,
	runTimer,
	clock1,
	clock2,
	blueTime = {
		minutes: userInput,
		tenths: 0,
		hundredths: 0
	},
	orangeTime = {
		minutes: userInput,
		tenths: 0,
		hundredths: 0
	};

// collects all initial piece positions 
for (let k = 2; k < 6; k++) {
	for (let i = 0; i < 8; i++) {
		setBoard.push([i + '' + k, './images/transparent.png']);
	}
}

///////////////////////////////////////////////////////////////////

function startClock() { runTimer = setInterval(countDown, 1000); };

function countDown() {

	obj.hundredths -= 1;

	if (obj.hundredths < 0) {
		obj.tenths -= 1;
		obj.hundredths = 9;
	}
	if (obj.tenths < 0) {
		obj.minutes -= 1;
		obj.tenths = 5;
	}
	if (obj.minutes < 0) { return resign(); }

	clockToUpdate.innerHTML =
		obj.minutes + ':' + obj.tenths + obj.hundredths;
}

function toggleClocks() {

	clearInterval(runTimer);

	if (activeSide[0].dataset.side === 'blue') {
		obj = blueTime;
		clockToUpdate = clock1;
	}
	else {
		obj = orangeTime;
		clockToUpdate = clock2;
	}
	
	startClock();
}

function flipBoard() {
	// transitions player views
	if (moveHistory.length) {
		board.classList.toggle('noClick');
		board.classList.toggle('fade');
		
		setTimeout( () => {
			setBoard.forEach(arr => document.getElementById(arr[0]).classList.toggle('rotateBoard'));
			board.classList.toggle('rotateBoard');
			board.classList.toggle('noClick');
		}, 800 );

		setTimeout( () => board.classList.toggle('fade'), 1500 );
	}
}

///////////////////////////

function inCheck() {

	checkPath = [];
	kingInCheck = true;
	pieceToMove = activeKing;

	kingLit(); // fills litIds with ids where activeKing can move

	// if king can move, handles moving activeKing
	if (litIds.length) {

		// kingLitIds occurs in selectGreyPiece() & moveGreyPiece()
		kingLitIds = litIds;

		// click-handling greyLit activeKing
		greyLitPieces.push(activeKing);
		activeKing.classList.add('preventMateLit');
		activeKing.addEventListener('click', selectGreyPiece);

	} // else { kingStuck = true; } unnecessary

	if (kingAttackers.length === 1) { // if only one kingAttacker
		/////////////////////////////////////////////////////////
		// populates checkPath with kingAttacker's id path to king
		switch (kingAttackers[0].dataset.name) {
			case 'bishop':
			case 'queen':
				checkSpaceId = activeKing.id;
				bishopAttacks(kingAttackers[0]);
				checkPath.push(...bishopMoves);
			case 'rook':
			case 'queen':
				checkSpaceId = activeKing.id;
				rookAttacks(kingAttackers[0]);
				checkPath.push(...rookMoves);
		}

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

						canEatKingAttacker.push(activePiece);
					}
					//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
					if (!openAndOpponentHeldKingSpaces.includes(kingAttackers[0].id)) {
						if (kingAttackers[0].dataset.name !== 'knight') {
							// prevents pawns from attacking on this turn,
							// pawns can only move forward to block kingAttacker
							pawnBlocksKingAttacker = true;

							// CAN ACTIVEPIECE BLOCK KINGATTACKER?
							// sees if activePiece can move to pathId
							checkPath.forEach(pathId => {
								if (checkingSpace(activePiece, pathId)) {

									canBlockPathOfCheck.push({ pathBlocker: activePiece, emptyDivId: pathId });
								}
							});

							pawnBlocksKingAttacker = false;
						}
					}
				}
			}
		});

		greyLitPieces.push(...canEatKingAttacker);

		canBlockPathOfCheck.forEach(obj => {
			greyLitPieces.push(obj.pathBlocker);
		});
	}
	//////////////////////////////////////////////
	//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	//////////////////////////////////////////////
	if (greyLitPieces.length) { // since able to prevent check mate		
		// lightens & click-listens to each greyLitPiece
		greyLitPieces.forEach(greyLitPiece => {
			greyLitPiece.classList.add('preventMateLit');
			greyLitPiece.addEventListener('click', selectGreyPiece);
		});
	}
	else {
		endOfGame();
	}
}

///////////////////////////

function selectGreyPiece(e) {

	if (greyPieceToMove) {
		greyPieceToMove.classList.remove('mainLit');
		greyPieceToMove.addEventListener('click', selectGreyPiece);
	}
	// removeLitDivHandler(moveGreyPiece); --> without litIds = []
	if (litIds.length) { // resets each litId of class & click-listeners
		litIds.forEach(id => {
			litPiece = document.getElementById(id);
			// ------------------------------------
			litPiece.classList.remove('lit');
			litPiece.removeEventListener('click', moveGreyPiece);
		});
	}
	litIds = [];

	if (kingLitIds.length) {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById(id);
			// --------------------------------------
			litPiece.classList.remove('lit');
			litPiece.removeEventListener('click', moveGreyPiece);
		});
	}

	greyPieceToMove = e.target;
	// temporarily disables clicking of this piece
	greyPieceToMove.removeEventListener('click', selectGreyPiece);
	greyPieceToMove.classList.add('mainLit');

	if (greyPieceToMove.dataset.name === 'king') {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById(id);
			litPiece.classList.add('lit');
			litPiece.addEventListener('click', moveGreyPiece);
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
	// resets greyPieceToMove
	greyPieceToMove.classList.remove('mainLit');
	greyPieceToMove.classList.remove('preventMateLit');

	if (greyPieceToMove.dataset.name === 'king') {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById(id);
			litPiece.classList.remove('lit');
			litPiece.removeEventListener('click', moveGreyPiece);
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

///////////////////////////

function wherePieceCanMove(e) {
	// if not first click of this turn
	if (newPieceClicked !== undefined) {
		// on-clicking new piece, enables clicking prior clicked piece
		newPieceClicked.addEventListener('click', wherePieceCanMove);
	}
	newPieceClicked = e.target;
	// disables re-clicking this piece until new piece clicked
	e.target.removeEventListener('click', wherePieceCanMove);
	// ------------------------------------------------------
	cleanUpAfterFirstClick();
	// ----------------------------------------
	if (!enPassanting) { goToDiv = undefined; }
	// ----------------------------------------
	pieceToMove = e.target;
	pieceToMove.classList.add('mainLit');
	// --------------------------------------
	// lights where pinned pieceToMove can go
	if (pieceToMove.dataset.pinned === 'true') { pinnedPieceLit(); }
	else {
		possibleMoves();
		if (litIds.length) { addLitDivHandler(movePiece); }
	}
}

function possibleMoves() {
	// populates litIds with piece's possible moves
	switch (pieceToMove.dataset.name) {
		case 'pawn':
			pawnLit();
			break;
		case 'knight':
			knightLit();
			break;
		case 'bishop':
			bishopLit();
			break;
		case 'rook':
			rookLit();
			break;
		case 'queen':
			bishopLit();
			rookLit();
			break;
		case 'king':
			kingLit();
	}
}

function movePiece(e) {
	// removes click-listener from pieceToMove
	pieceToMove.removeEventListener('click', wherePieceCanMove);

	// un-lightens mainDiv
	pieceToMove.classList.remove('mainLit');

	if (pieceToMove.dataset.pinned === 'true') {
		pinnedLitIds.forEach(pinnedLitId => {
			litPiece = document.getElementById(pinnedLitId);
			litPiece.classList.remove('lit');
			litPiece.removeEventListener('click', movePiece);
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
	goToDiv = e.target;
	// covers enPassant pawn attack
	if (goToDiv.dataset.side === 'empty') {
		if (pieceToMove.dataset.name === 'pawn') {
			if (enPassanting) {
				if (goToDiv === enPassantDiv) {
					eat(pawnJumpDiv);
					// collects pawnJumpDiv for moveHistory
					enPassantMove = true;
					moveHistory.push({ from: [pawnJumpDiv.id], image: [pawnJumpDiv.src] });
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
					pawnJumpDiv = goToDiv;
				}
			}
			else { // since orange's turn
				// if pawnToMove jumps two spaces
				if (goToDiv.id === (pieceToMove.id[0] + (+pieceToMove.id[1] + 2))) {
					enPassanting = true;
					pawnJumpDiv = goToDiv;
				}
			}
		}
	}
	else { // covers pieceToMove eats goToDiv
		eat(goToDiv);
	}
	// covers pawnToMove moving one or two empty spaces
	swapSide(pieceToMove, goToDiv);
	if (noPawnEvolution) { toggleSides(); }
	else { // since pawn evolves
		// removes click-listeners from activePieces
		activeSide.forEach(activePiece => {
			activePiece.removeEventListener('click', wherePieceCanMove);
		});
	}
}

///////////////////////////
///////////////////////////

function pawnEvolve(e) {
	// uses pieceToMove for pawn & e.target for new piece
	// re-informs goToDiv
	goToDiv.setAttribute('data-name', e.target.dataset.name);
	goToDiv.setAttribute('data-side', e.target.dataset.side);
	goToDiv.setAttribute('src', e.target.src);

	// replaces moveHistory's current move (pawn) image with e.target.src
	moveHistory[moveHistory.length - 1].image.push(e.target.src);

	// gets pieceToMove's activeSide index
	index1 = activeSide.indexOf(pieceToMove);

	// removes now-empty pieceToMove from activeSide    
	activeSide.splice(index1, 1);

	// updates activeSide & pieces array
	activeSide.push(goToDiv);

	// un-informs pieceToMove
	pieceToMove.setAttribute('data-name', 'empty');
	pieceToMove.setAttribute('data-side', 'empty');
	pieceToMove.setAttribute('src', './images/transparent.png');

	// closes modal window
	if (e.target.dataset.side === 'blue') {
		document.getElementById('modalBlue').classList.toggle("showModal");
	}
	else if (e.target.dataset.side === 'orange') {
		document.getElementById('modalOrange').classList.toggle("showModal");
	}

	toggleSides();
}

function swapSide(fromDiv, toDiv) {

	console.log('swapSide');

	

	if (isCastle || enPassantMove) {
		let priorMove = moveHistory[moveHistory.length - 1];
		
		priorMove.from.push(fromDiv.id);
		priorMove.from.push(toDiv.id);
		priorMove.image.push(fromDiv.src);
		priorMove.image.push(toDiv.src);
	}
	else {
		moveHistory.push({
			from: [fromDiv.id, toDiv.id],
			image: [fromDiv.src, toDiv.src]
		});
	}
	// swaps pieceToMove & goToDiv info
	// handles blue pawn evolution modal window
	if ((fromDiv.dataset.name === 'pawn') && (toDiv.id[1] === '0')) {
		document.getElementById('modalBlue').classList.toggle('showModal');
		document.getElementById('blueQueen').addEventListener('click', pawnEvolve);
		document.getElementById('blueKnight').addEventListener('click', pawnEvolve);
		document.getElementById('blueRook').addEventListener('click', pawnEvolve);
		document.getElementById('blueBishop').addEventListener('click', pawnEvolve);
	} // handles orange pawn evolution modal window
	else if ((fromDiv.dataset.name === 'pawn') && (toDiv.id[1] === '7')) {
		document.getElementById('modalOrange').classList.toggle('showModal');
		document.getElementById('orangeQueen').addEventListener('click', pawnEvolve);
		document.getElementById('orangeKnight').addEventListener('click', pawnEvolve);
		document.getElementById('orangeRook').addEventListener('click', pawnEvolve);
		document.getElementById('orangeBishop').addEventListener('click', pawnEvolve);
	}
	else { // since no pawn evolution
		noPawnEvolution = true;
		// re-informs goToDiv
		toDiv.setAttribute('data-name', fromDiv.dataset.name);
		toDiv.setAttribute('data-side', fromDiv.dataset.side);
		toDiv.setAttribute('src', fromDiv.src); // ___!___

		// gets pieceToMove's activeSide index
		index1 = activeSide.indexOf(fromDiv);

		// removes now-empty pieceToMove from activeSide    
		activeSide.splice(index1, 1);

		// updates activeSide & pieces array
		activeSide.push(toDiv);

		// if not an enPassant attack, resets enPassant process
		if (pieceToMove.dataset.name === 'pawn') {
			if (toDiv !== pawnJumpDiv) { enPassantReset(); }
		}
		else { enPassantReset(); }

		// un-informs pieceToMove
		fromDiv.setAttribute('data-name', 'empty');
		fromDiv.setAttribute('data-side', 'empty');
		fromDiv.setAttribute('src', './images/transparent.png');
		fromDiv.removeEventListener('click', wherePieceCanMove);
	}
}

function eat(piece) {
	// eat(goToDiv); --> normal attack
	// eat(pawnJumpDiv); --> enPassant attack

	// 1. puts eaten piece in its takenBox
	if (activeKing.dataset.side === 'blue') {
		if (piece.dataset.name === 'pawn') {
			document.getElementById(
				'p' + bluePawnTakenBoxIdCounter
			).src = piece.src;
			bluePawnTakenBoxIdCounter -= 1;
		}
		else {
			document.getElementById(
				'' + blueTakenBoxIdCounter
			).src = piece.src;
			blueTakenBoxIdCounter -= 1;
		}
	}
	else { // since orange turn, does the same
		if (piece.dataset.name === 'pawn') {
			document.getElementById(
				'p' + orangePawnTakenBoxIdCounter
			).src = piece.src;
			orangePawnTakenBoxIdCounter += 1;
		}
		else {
			document.getElementById(
				'' + orangeTakenBoxIdCounter
			).src = piece.src;
			orangeTakenBoxIdCounter += 1;
		}
	}
	// gets eaten piece's index within passiveSide array
	index2 = passiveSide.indexOf(piece);

	// 2. removes eaten piece from passiveSide array
	passiveSide.splice(index2, 1);
}

function castling(e) {
	
	if (litIds.length) { removeLitDivHandler(movePiece); }
	// -------------------------------------------------
	// un-lightens & stops click-listening all castleIds
	castleIds.forEach(id => {
		document.getElementById(id).classList.remove('castleLit');
		document.getElementById(id).removeEventListener('click', castling);
	});
	// -------------------------------------
	pieceToMove.classList.remove('mainLit');
	// -------------------------------------
	castleIds = [];
	// -----------------------------------------------------
	// castles rook & prevents that side from castling again
	switch (e.target.id) {
		case '27':
			swapSide(document.getElementById('07'), document.getElementById('37'));
			blueKingFirstMove = true;
			break;
		case '67':
			swapSide(document.getElementById('77'), document.getElementById('57'));
			blueKingFirstMove = true;
			break;
		case '20':
			swapSide(document.getElementById('00'), document.getElementById('30'));
			orangeKingFirstMove = true;
			break;
		case '60':
			swapSide(document.getElementById('70'), document.getElementById('50'));
			orangeKingFirstMove = true;
			break;
	}
	isCastle = true;
	// castles king
	swapSide(pieceToMove, e.target);
	// -----------------------------------------
	// removes click-listeners from activePieces
	activeSide.forEach(activePiece => {
		document.getElementById(
			activePiece.id
		).removeEventListener('click', wherePieceCanMove);
	});

	if (litIds.length) { removeLitDivHandler(movePiece); }

	toggleSides();
}

///////////////////////////

function enPassantReset() {
	// resets enPassanting
	enPassanting = false;
	// resets pawnJumpDiv
	pawnJumpDiv = undefined;
	// resets enPassantDiv
	enPassantDiv = undefined;
}

function addLitDivHandler(funcName) {

	litIds.forEach(litDiv => {
		litPiece = document.getElementById(litDiv);
		litPiece.classList.add('lit');
		litPiece.addEventListener('click', funcName);
	});
}

function removeLitDivHandler(funcName) {

	litIds.forEach(litDiv => {
		litPiece = document.getElementById(litDiv);
		litPiece.classList.remove('lit');
		litPiece.removeEventListener('click', funcName);
	});

	litIds = [];
}

function cleanUpAfterFirstClick() {
	// resets litIds on clicking multiple activeSide pieces
	if (pieceToMove !== undefined) {
		// un-lightens & stops click-listening to pieceToMove
		pieceToMove.removeEventListener('click', movePiece);
		pieceToMove.classList.remove('mainLit');

		// un-lightens, clears out & stops click-listening to litIds
		if (litIds.length) { removeLitDivHandler(movePiece); }
		// un-lightens, clears out & stops click-listening to litIds
		if (pinnedLitIds) {
			pinnedLitIds.forEach(pinnedLitId => {
				litPiece = document.getElementById(pinnedLitId);
				litPiece.classList.remove('lit');
				litPiece.removeEventListener('click', movePiece);
			});
		}

		// un-lightens, clears out & stops click-listening to castleIds
		if (castleIds.length) { // if king ready to castle

			castleIds.forEach(id => { // resets castling process
				document.getElementById(id).classList.remove('castleLit');
				document.getElementById(id).removeEventListener('click', castling);
			});
			castleIds = [];
		}
	}
}

///////////////////////////

function pinnedPieceLit() {
	// ---------------------------------------------------
	if (pieceToMove.dataset.name === 'knight') { return; }
	// ---------------------------------------------------
	// assigns pinned pieceToMove's pinnerPiece
	for (let i = 0; i < pinnedPieces.length; i++) {
		if (pieceToMove === pinnedPieces[i].pinned) {
			pinnerPiece = pinnedPieces[i].pinner;
			break;
		}
	}
	// --------------------------------------
	// if pieceToMove can eat its pinnerPiece
	if (checkingSpace(pieceToMove, pinnerPiece.id)) {
		pinnedLitIds.push(pinnerPiece.id);
	}
	else if (pieceToMove.dataset.name === 'pawn') {
		// if pinnerPiece is rook or queen && shares same column as pawn
		if (['rook', 'queen'].includes(pinnerPiece.dataset.name)) {
			if (pinnerPiece.id[0] === pieceToMove.id[0]) {
				if (pieceToMove.dataset.side === 'blue') {
					// if pinnerPiece is ABOVE blue pawn
					if (pinnerPiece.id[1] < pieceToMove.id[1]) {
						// allows blue pawn to only move regularly one or two without eating...
						if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).dataset.name === 'empty') {
							pinnedLitIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));
							if (pieceToMove.id[1] === '6') {
								if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 2)).dataset.name === 'empty') {
									pinnedLitIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));
								}
							}
						}
					}
				}
				else { // since orange pawn to move
					// if pinnerPiece is BENEATH orange pawn
					if (pinnerPiece.id[1] > pieceToMove.id[1]) {
						// allows orange pawn to only move regularly one or two without eating...
						if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 1)).dataset.name === 'empty') {
							pinnedLitIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));
							if (pieceToMove.id[1] === '1') {
								if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 2)).dataset.name === 'empty') {
									pinnedLitIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 2));
								}
							}
						}
					}
				}
			}
		}
	}
	else {
		return;
	}
	// -------------------------------------
	// since either a bishop, rook, or queen
	if (pieceToMove.dataset.name !== 'pawn') {

		// includes ids from pieceToMove to its pinning piece
		pinnedLitIds.push(...pathOfCheck);
		// ---------------------------------------------
		// includes ids from pieceToMove to its own king
		checkingSpace(pieceToMove, activeKing.id);
		pinnedLitIds.push(...pathOfCheck);
	}
	// -----------------------
	if (pinnedLitIds.length) {
		pinnedLitIds.forEach(pinnedLitId => {
			litPiece = document.getElementById(pinnedLitId);
			litPiece.classList.add('lit');
			litPiece.addEventListener('click', movePiece);
		});
	}
}

///////////////////////////

function toggleSides() {
	// removes click-listeners from activePieces
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});
	if (activeSide[0].dataset.side === 'blue') {
		activeSide = oranges;
		passiveSide = blues;
	}
	else { // since activeKing is orange
		activeSide = blues;
		passiveSide = oranges;
	}
	lit(); // starts next move 
}

function gameOverModal() {

	if (activeKing.dataset.side === 'blue') {
		blueGameOverModal.classList.add('showModal');
		blueGameOverModal.innerHTML = message;
	}
	else {
		OrangeGameOverModal.classList.add('showModal');
		OrangeGameOverModal.innerHTML = message;
	}
}

function endOfGame() {
	gameOver = true;

	clearInterval(runTimer);
	activeKing.classList.add('checkMate');

	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});

	document.getElementById('resign').classList.add('noClick');

	message = activeKing.dataset.side + ' king check mated';
	gameOverModal();
}

function resign() {
	gameOver = true;

	clearInterval(runTimer);

	document.getElementById('modalBlue').classList.remove("showModal");
	document.getElementById('modalOrange').classList.remove("showModal");

	if (litIds) {
		if (litIds.length) {
			litIds.forEach( id => {
				document.getElementById(id).removeEventListener('click', movePiece);
				document.getElementById(id).classList.remove('lit');
			});
		}
	}
	if (kingLitIds) {
		if (kingLitIds.length) {
			kingLitIds.forEach( id => {
				document.getElementById(id).removeEventListener('click', movePiece);
				document.getElementById(id).removeEventListener('click', moveGreyPiece);
				document.getElementById(id).classList.remove('lit');
			});
		}
	}
	if (pieceToMove) {
		if (pieceToMove.classList.contains('mainLit')) {
			pieceToMove.classList.remove('mainLit');
			pieceToMove.removeEventListener('click', movePiece);
		}
	}
	if (greyPieceToMove) {
		if (greyPieceToMove.classList.contains('mainLit')) {
			greyPieceToMove.classList.remove('mainLit');
			greyPieceToMove.removeEventListener('click', selectGreyPiece);
		}
	}
	if (greyLitPieces) {
		if (greyLitPieces.length) {
			greyLitPieces.forEach( piece => {
				piece.classList.remove('preventMateLit');
				piece.removeEventListener('click', selectGreyPiece);
			});
		}
	}
	if (castleIds) {
		if (castleIds.length) {
			castleIds.forEach( id => {
				document.getElementById(id).classList.remove('castleLit');
				document.getElementById(id).removeEventListener('click', castling);
			})
		}
	}

	activeSide.forEach( activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});

	passiveSide.forEach( passivePiece => {
		passivePiece.removeEventListener('click', wherePieceCanMove);
	});

	document.getElementById('resign').classList.add('noClick');

	message = activeKing.dataset.side + " king resigns";
	
	gameOverModal();
}

function forceDraw() { // discerns if a draw is forced
	
	let thisMove = moveHistory[moveHistory.length - 1],
		threeMovesAgo = moveHistory[moveHistory.length - 3],
		fiveMovesAgo = moveHistory[moveHistory.length - 5],
		sevenMovesAgo = moveHistory[moveHistory.length - 7],
		nineMovesAgo = moveHistory[moveHistory.length - 9];
		
	if (thisMove.from.every((value, index) => value === fiveMovesAgo.from[index])) {
		if (thisMove.image.every((value, index) => value === fiveMovesAgo.image[index])) {
			if (thisMove.from.every((value, index) => value === nineMovesAgo.from[index])) {
				if (thisMove.image.every((value, index) => value === nineMovesAgo.image[index])) {
					if (threeMovesAgo.from.every((value, index) => value === sevenMovesAgo.from[index])) {
						if (threeMovesAgo.image.every((value, index) => value === sevenMovesAgo.image[index])) {
							drawForced = true;
						}
					}
				}
			}
		}
	}
}
///////////////////////////

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
			if (document.getElementById(id).dataset.side !==
				passiveSide[0].dataset.side) { return id; }
		}
		else {
			if (document.getElementById(id).dataset.side !==
				activeKing.dataset.side) { return id; }
		}
	}
} // knightLit & knightAttacks helper

function pawnLit() {
	// highlights all possible moves for blue pawnToMove
	if (activeKing.dataset.side === 'blue') {
		// if enPassant attack is possible, covers enPassant attack
		if (enPassanting) { // same as: if (pawnJumpDiv.length) ?
			if (pieceToMove.id[1] === '3') { // if in row 3
				// if bluePawnToMove is beside pawnJump,
				if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1]) ||
					(pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
					// adds bluePawnToMove's enPassant-attack-div to litIds
					enPassantDiv = document.getElementById(
						pawnJumpDiv.id[0] + (pawnJumpDiv.id[1] - 1)
					);
					litIds.push(enPassantDiv.id);
				}
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
				if (document.getElementById(pieceToMove.id[0] +
						(pieceToMove.id[1] - 2)).dataset.side === 'empty') {
					litIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));
				}
			}
		}
	}
	else { // since orange's turn
		// if enPassant attack is possible
		if (enPassanting) { // same as if pawnJumpDiv.length?
			if (pieceToMove.id[1] === '4') { // if in row 4
				if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1]) ||
					(pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
					// adds enPassant attack div to litIds
					enPassantDiv = document.getElementById(
						pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1)
					);
					litIds.push(enPassantDiv.id);
				}
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

function knightSpaces(knight) {
	return [
		(+knight.id[0] + 1) + '' + (+knight.id[1] + 2),
		(+knight.id[0] + 1) + '' + (knight.id[1] - 2),
		(knight.id[0] - 1) + '' + (+knight.id[1] + 2),
		(knight.id[0] - 1) + '' + (knight.id[1] - 2),
		(+knight.id[0] + 2) + '' + (+knight.id[1] + 1),
		(+knight.id[0] + 2) + '' + (knight.id[1] - 1),
		(knight.id[0] - 2) + '' + (+knight.id[1] + 1),
		(knight.id[0] - 2) + '' + (knight.id[1] - 1)
	];
} // knightLit helper

function knightLit() {
	litIds = knightSpaces(pieceToMove).filter(onBoardNonActiveIds);
} // fills litIds with ids where knight can move

function quadrant(x, y) { // x & y are a number
	let bishopPath = document.getElementById(x + '' + y);

	if (onBoard(x + '' + y)) {
		// collects id, if empty or passivePiece
		if (bishopPath.dataset.side === 'empty') {
			litIds.push(bishopPath.id);
			// increments x
			// if x is east of pieceToMove, continue east
			if (x > pieceToMove.id[0]) { x += 1; }
			else { x -= 1; } // continue west
			// increments y
			// if y is south of pieceToMove, continue south
			if (y > pieceToMove.id[1]) { y += 1; }
			else { y -= 1; } // continue north
			quadrant(x, y); // continue path
		}
		else if (bishopPath.dataset.side === passiveSide[0].dataset.side) {
			litIds.push(bishopPath.id); // path ends
		}
	}
} // bishopLit helper

function bishopLit() {
	quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] + 1);
	quadrant(+pieceToMove.id[0] + 1, pieceToMove.id[1] - 1);
	quadrant(pieceToMove.id[0] - 1, +pieceToMove.id[1] + 1);
	quadrant(pieceToMove.id[0] - 1, pieceToMove.id[1] - 1);
} // fills litIds with ids where bishop can move

function line(x, y) { // x & y are a number
	let rookPath = document.getElementById(x + '' + y);

	if (onBoard(x + '' + y)) {
		// collects id, if empty or passivePiece
		if (rookPath.dataset.side === 'empty') {
			litIds.push(rookPath.id);
			// increments x
			if (x != pieceToMove.id[0]) {
				// if x is east of pieceToMove, continue east
				if (x > pieceToMove.id[0]) { x += 1; }
				else { x -= 1; } // continue west
			}
			// increments y
			if (y != pieceToMove.id[1]) {
				// if y is south of pieceToMove, continue south
				if (y > pieceToMove.id[1]) { y += 1; }
				else { y -= 1; } // continue north
			}
			line(x, y); // continue path
		}
		else if (rookPath.dataset.side === passiveSide[0].dataset.side) {
			litIds.push(rookPath.id); // path ends
		}
	}
} // rookLit helper

function rookLit() {
	// in case of queen
	if (pieceToMove.dataset.name === 'rook') { litIds = []; }

	line(+pieceToMove.id[0] + 1, +pieceToMove.id[1]);
	line(pieceToMove.id[0] - 1, +pieceToMove.id[1]);
	line(+pieceToMove.id[0], +pieceToMove.id[1] + 1);
	line(+pieceToMove.id[0], pieceToMove.id[1] - 1);
} // fills litIds with ids where rook can move

function kingLit() {
	// highlights all possible moves for activeKing
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
							}
							if (!noCastle) { castleIds.push('20'); }
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
		pieceToMove.id[0] + (pieceToMove.id[1] - 1),
		pieceToMove.id[0] + (+pieceToMove.id[1] + 1),
		(pieceToMove.id[0] - 1) + pieceToMove.id[1],
		(+pieceToMove.id[0] + 1) + pieceToMove.id[1],
		(pieceToMove.id[0] - 1) + '' + (pieceToMove.id[1] - 1),
		(pieceToMove.id[0] - 1) + '' + (+pieceToMove.id[1] + 1),
		(+pieceToMove.id[0] + 1) + '' + (pieceToMove.id[1] - 1),
		(+pieceToMove.id[0] + 1) + '' + (+pieceToMove.id[1] + 1)
	].map(space => { // keeps only on-board kingSpaces
		if (onBoard(space)) { // if space is on the board
			if (kingInCheck) { // omits id behind checked king
				if (space !== behindKingId) { return space; }
			}
			else { return space; }
		}
	}).filter(item => item !== undefined);

	// excludes activePiece occupied spaces from kingSpaces array
	openAndOpponentHeldKingSpaces = kingSpaces.filter(kingSpace =>
		!activeSide.some(activePiece => kingSpace === activePiece.id)
	); // for each kingSpace & each activePiece
	// adds kingSpace to oAOHKS array if no activePiece there 

	// populates litIds with ids where king can move
	openAndOpponentHeldKingSpaces.forEach(id => {
		passiveSideCoversId = false;
		// for each oAOHKS & each passivePiece
		for (let i = 0; i < passiveSide.length; i++) {
			if (passiveSide[i].id !== id) {
				// if a passivePiece can check that oAOHKS
				if (checkingSpace(passiveSide[i], id)) {
					passiveSideCoversId = true;
					break;
				}
			}
		}
		if (!passiveSideCoversId) { litIds.push(id); }
	});
} // fills litIds with ids where king can move

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
		if (pawn.id[0] - 1 == checkSpaceId[0] ||
			(+pawn.id[0] + 1) == checkSpaceId[0]) {
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

function knightAttacks(knight) {

	function attacks(id) {
		if (id === checkSpaceId) { return id; }
	}

	if (knightSpaces(knight).filter(onBoardNonActiveIds).filter(attacks).length) {
		return true;
	}
} // returns true/false if knight can attack checkSpaceId

function bishopAttacks(bishop) {
	// checks for clear path between bishop.id & checkSpaceId
	bishopMoves = []; // collects spaces bishop attacks enroute to checkSpaceId
	nails = []; // collects possible pinnedPieces

	bishopX = +bishop.id[0];
	bishopY = +bishop.id[1];

	// bishop & checkSpaceId cannot have the same id
	if (bishop.id === checkSpaceId) { return false; } // unnecessary?

	// collects ids between bishop & checkSpaceId
	if (bishop.id[0] < checkSpaceId[0]) {
		// bishop attacks in a southEast diagonal
		if (bishop.id[1] < checkSpaceId[1]) {
			// if bishop's path aligns with checkSpaceId
			if (checkSpaceId[0] - bishop.id[0] ===
				checkSpaceId[1] - bishop.id[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] + 1) + '' + (+checkSpaceId[1] + 1);
				}
				// collects bishop's attack path to checkSpaceId
				while (bishopX < (checkSpaceId[0] - 1)) {
					bishopX += 1;
					bishopY += 1;
					bishopMoves.push(bishopX + '' + bishopY);
				}
			}
			else { return false; } // bishop can't checkSpaceId
		}
		else { // since bishop attacks in a northEast diagonal
			// if bishop aligns with checkSpaceId
			if (checkSpaceId[0] - bishop.id[0] ===
				bishop.id[1] - checkSpaceId[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] + 1) + '' + (+checkSpaceId[1] - 1);
				}
				// collects bishop's attack path to checkSpaceId
				while (bishopX < (checkSpaceId[0] - 1)) {
					bishopX += 1;
					bishopY -= 1;
					bishopMoves.push(bishopX + '' + bishopY);
				}
			}
			else { return false; } // bishop cannot checkSpaceId
		}
	}
	else { // since bishop attacks in a southWest diagonal
		if (bishop.id[1] < checkSpaceId[1]) {
			// if bishop aligns with checkSpaceId
			if (bishop.id[0] - checkSpaceId[0] ===
				checkSpaceId[1] - bishop.id[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (checkSpaceId[0] - 1) + '' + (+checkSpaceId[1] + 1);
				}
				// collects bishop's attack path to checkSpaceId
				while (bishopX > (+checkSpaceId[0] + 1)) {
					bishopX -= 1;
					bishopY += 1;
					bishopMoves.push(bishopX + '' + bishopY);
				}
			}
			else { return false; } // bishop can't checkSpaceId
		}
		else { // since bishop attacks in a northWest diagonal
			// if bishop aligns with checkSpaceId
			if (bishop.id[0] - checkSpaceId[0] ===
				bishop.id[1] - checkSpaceId[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (checkSpaceId[0] - 1) + '' + (checkSpaceId[1] - 1);
				}
				// collects bishop's attack path to checkSpaceId
				while (bishopX > (+checkSpaceId[0] + 1)) {
					bishopX -= 1;
					bishopY -= 1;
					bishopMoves.push(bishopX + '' + bishopY);
				}
			}
			else { return false; } // bishop can't attack king
		}
	}
	if (bishopMoves.length) {
		// populates nails with pieces that block bishop's path to checkSpaceId
		bishopMoves.forEach(bishopMove => {
			if (onBoard(bishopMove)) {
				blocker = document.getElementById(bishopMove);
				if (blocker.dataset.side !== 'empty') {
					nails.push(blocker);
				}
			}
		});
	}
	// note: nails may contain pieces from both sides
	// returns true/false if no piece blocks bishop's path to checkSpaceId
	if (!nails.length) {
		// pathOfCheck array becomes bishop's id route to checkSpaceId
		pathOfCheck = bishopMoves;
		return true; // bishop can attack checkSpaceId
	}
	if (nails.length === 1) {
		if (checkSpaceId === activeKing.id) {
			// if that nail & bishop aren't on the same side
			if (nails[0].dataset.side !== bishop.dataset.side) {
				if (nails[0] !== activeKing) {
					// collects bishop & nails[0]
					pinnedPieces.push({ pinner: bishop, pinned: nails[0] });
					// sets dataset.pinned & dataset.pinner for nails[0]
					nails[0].setAttribute('data-pinned', true);

					// alert(nails[0].dataset.side + ' ' + nails[0].dataset.name + ' IS PINNED');
				}
			}
		}
	}
	return false; // bishop cannot attack checkSpaceId
} // returns true/false... if bishop can attack checkSpaceId,
// that is, if no piece blocks bishop's path to checkSpaceId

function rookAttacks(rook) {
	// checks for clear path between rook.id & checkSpaceId
	rookMoves = []; // collects spaces rook attacks enroute to checkSpaceId
	nails = []; // collects possible pinnedPieces

	// if rook & checkSpaceId share column
	if (rook.id[0] === checkSpaceId[0]) {
		// if rook below checkSpaceId, rook.y++
		if (rook.id[1] < checkSpaceId[1]) {
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = checkSpaceId[0] + (+checkSpaceId[1] + 1);
			}
			for (let i = +rook.id[1] + 1; i < checkSpaceId[1]; i++) {
				rookMoves.push(checkSpaceId[0] + i);
			}
		}
		else { // since rook is above checkSpaceId, rook.id[1]--
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = checkSpaceId[0] + (checkSpaceId[1] - 1);
			}
			for (let i = rook.id[1] - 1; i > checkSpaceId[1]; i--) {
				rookMoves.push(checkSpaceId[0] + i);
			}
		}
	} // pushes column spaces between rook & checkSpaceId to rookMoves

	// else if rook & checkSpaceId share row
	else if (rook.id[1] === checkSpaceId[1]) {
		// if rook left of checkSpaceId, rook.id[0]++
		if (rook.id[0] < checkSpaceId[0]) {
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = (+checkSpaceId[0] + 1) + checkSpaceId[1];
			}
			for (let i = +rook.id[0] + 1; i < checkSpaceId[0]; i++) {
				rookMoves.push(i + checkSpaceId[1]);
			}
		}
		else { // since rook right of checkSpaceId, rook.id[0]--
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = (checkSpaceId[0] - 1) + checkSpaceId[1];
			}
			for (let i = rook.id[0] - 1; i > checkSpaceId[0]; i--) {
				rookMoves.push(i + checkSpaceId[1]);
			}
		}
	} // pushes row spaces between rook & checkSpaceId to rookMoves

	else { return false; } // rook can't checkSpaceId
	if (rookMoves.length) {
		// populates nails with pieces that block rook's path to checkSpaceId
		rookMoves.forEach(rookMove => {
			if (onBoard(rookMove)) {
				blocker = document.getElementById(rookMove);
				if (blocker.dataset.side !== 'empty') {
					if (rookMove !== behindKingId) {
						nails.push(blocker);
					}
				}
			}
		});
	}
	// returns true/false if no piece blocks rook's path to checkSpaceId
	if (!nails.length) { // nails can be both sides
		// pathOfCheck array becomes rook.id route to checkSpaceId
		if (rook.dataset.name === 'queen') {
			pathOfCheck.push(...rookMoves);
		}
		else { pathOfCheck = rookMoves; }
		return true; // rook can attack checkSpaceId
	}
	if (nails.length === 1) { // if only one nail
		if (checkSpaceId === activeKing.id) {
			// if that nail & rook aren't on the same side
			if (nails[0].dataset.side !== rook.dataset.side) {
				pinnedPieces.push({ pinner: rook, pinned: nails[0] });
				nails[0].setAttribute('data-pinned', true);
			}
		}
	}
	return false; // rook cannot attack checkSpaceId
} // returns true/false if rook can attack checkSpaceId

function queenAttacks(queen) {

	if (bishopAttacks(queen)) { return true; }
	if (rookAttacks(queen)) { return true; }
	return false;
} // returns true/false if queen can attack checkSpaceId

function kingAttacks(king) {

	switch (checkSpaceId[0]) { // if checkSpaceId's column equals...
		case king.id[0]: // king's column
			return (
				checkSpaceId[1] == (+king.id[1] + 1) ||
				checkSpaceId[1] == (king.id[1] - 1)
			);
		case (+king.id[0] + 1).toString(): // king's column + 1
			return (
				checkSpaceId[1] === king.id[1] ||
				checkSpaceId[1] == (+king.id[1] + 1) ||
				checkSpaceId[1] == (king.id[1] - 1)
			);
		case (king.id[0] - 1).toString(): // king's column - 1
			return (
				checkSpaceId[1] === king.id[1] ||
				checkSpaceId[1] == (+king.id[1] + 1) ||
				checkSpaceId[1] == (king.id[1] - 1)
			);
		default:
			return false;
	}
} // returns true if king can attack checkSpaceId

////////////////////////////////////////////

function checkingSpace(somePiece, someId) {
	checkSpaceId = someId;
	// sees if somePiece can check someId
	switch (somePiece.dataset.name) {
		case 'pawn': 	return pawnAttacks(somePiece);
		case 'knight': 	return knightAttacks(somePiece);
		case 'bishop': 	return bishopAttacks(somePiece);
		case 'rook': 	return rookAttacks(somePiece);
		case 'queen': 	return queenAttacks(somePiece);
		case 'king': 	return kingAttacks(somePiece);
	}
} // returns true/false if somePiece can attack someId

////////////////////////////////////////////////////////////

function reviewClickHandler() {
	
	if (gameOver) { return activeKing.classList.remove('checkMate'); }

	if (greyLitPieces.length) {
		greyLitPieces.forEach(greyPiece => {
			greyPiece.classList.remove('preventMateLit');
			greyPiece.classList.add('noClick');
		});
		if (greyPieceToMove) {
			greyPieceToMove.classList.remove('mainLit');
			litIds.forEach(id => {
				document.getElementById(id).classList.remove('lit');
				document.getElementById(id).classList.add('noClick');
			});
			if (greyPieceToMove.id === activeKing.id) {
				kingLitIds.forEach(id => {
					document.getElementById(id).classList.remove('lit');
					document.getElementById(id).classList.add('noClick');
				});
			}
		}
	}
	if (pieceToMove) {
		if (pieceToMove.classList.contains('mainLit')) {
			pieceToMove.classList.remove('mainLit');
			if (litIds) {
				if (litIds.length) {
					litIds.forEach(id => {
						document.getElementById(id).classList.remove('lit');
						document.getElementById(id).classList.add('noClick');
					});
				}
			}
			if (castleIds.length) {
				castleIds.forEach(id => {
					document.getElementById(id).classList.remove('castleLit');
					document.getElementById(id).classList.add('noClick');
				});
			}
		}
	}
}

function exitReviewClickHandler() { // resumes game flow

	if (gameOver) { return activeKing.classList.add('checkMate'); }

	if (drawForced) { return pieceToMove.classList.remove('mainLit'); }

	if (greyLitPieces.length) {
		greyLitPieces.forEach(greyPiece => {
			greyPiece.classList.add('preventMateLit');
			greyPiece.classList.remove('noClick');
		});

		if (greyPieceToMove) {
			greyPieceToMove.classList.add('mainLit');
			if (greyPieceToMove.id === activeKing.id) {
				kingLitIds.forEach(id => {
					document.getElementById(id).classList.add('lit');
					document.getElementById(id).classList.remove('noClick');
				});
			}
			else {
				litIds.forEach(id => {
					document.getElementById(id).classList.add('lit');
					document.getElementById(id).classList.remove('noClick');
				});
			}
		}
	}

	else if (pieceToMove) {
		pieceToMove.classList.add('mainLit');
		litIds.forEach(id => {
			document.getElementById(id).classList.add('lit');
			document.getElementById(id).classList.remove('noClick');
		});
		castleIds.forEach(id => {
			document.getElementById(id).classList.add('castleLit');
			document.getElementById(id).classList.remove('noClick');
		});
			
	}
}

function reviewMode() {
	// saves currentBoard .src map
	currentBoard = activeSide.concat(passiveSide).map(piece => [piece.id, piece.src]);

	// collects currentBoard ids
	pieceIds = currentBoard.map(piece => piece[0]);

	// pushes to currentBoard all empty spaces as [id, src] each
	for (let k = 0; k < 8; k++) {
		for (let i = 0; i < 8; i++) {
			if (!pieceIds.includes(i + '' + k)) {
				currentBoard.push([i + '' + k, './images/transparent.png']);
			}
		}
	} // ----------------------------------
	
	// when board clicked, exits reviewMode
	board.addEventListener('mousedown', exitReviewMode);
}

function exitReviewMode() {

	// loads currentBoard .src map
	currentBoard.forEach(piece => document.getElementById(piece[0]).src = piece[1]);

	// sets index to current move
	index = moveHistory.length;

	exitReviewClickHandler();
}

function showFirstMove() {
	if (firstReview) {
		firstReview = false;
		reviewMode();
	}
	index = 0;
	setBoard.forEach(piece => document.getElementById(piece[0]).src = piece[1]);
	reviewClickHandler();
}

function showPriorMove() {
	if (index > 0) { // if after game's first move
		if (firstReview) {
			firstReview = false;
			reviewMode();
		}
		index -= 1; // begins with previous move
		
		// displays that previous move
		for (let i = 0; i < moveHistory[index].from.length; i++) {
			document.getElementById(moveHistory[index].from[i]).src = moveHistory[index].image[i];
		}
		reviewClickHandler();
	}
}

function showNextMove() {
	if (index < moveHistory.length) { // if index before last move
		switch (moveHistory[index].from.length) {
			case 2: // covers normal moves and pawn promotion
				document.getElementById(moveHistory[index].from[0]).src = './images/transparent.png';
				if (moveHistory[index].image.length === 3) {
					document.getElementById(moveHistory[index].from[1]).src = moveHistory[index].image[2];
					break;
				}
				document.getElementById(moveHistory[index].from[1]).src = moveHistory[index].image[0];
				break;
				
			case 3: // covers enPassant
				document.getElementById(moveHistory[index].from[0]).src = './images/transparent.png';
				document.getElementById(moveHistory[index].from[1]).src = './images/transparent.png';
				document.getElementById(moveHistory[index].from[2]).src = moveHistory[index].image[1];
				break;
			case 4: // covers castle
				document.getElementById(moveHistory[index].from[0]).src = './images/transparent.png';
				document.getElementById(moveHistory[index].from[1]).src = moveHistory[index].image[0];
				document.getElementById(moveHistory[index].from[2]).src = './images/transparent.png';
				document.getElementById(moveHistory[index].from[3]).src = moveHistory[index].image[2];
		}
		index += 1;
		if (index === moveHistory.length) { exitReviewClickHandler(); }
	}
}

////////////////////////////

function lit() {

	board.removeEventListener('mousedown', exitReviewMode);

	// covers a draw if only kings remain for each side
	if (activeSide.length === 1) {
		if (passiveSide.length === 1) {
			message = "only kings remain: game ends in a draw";
			setTimeout( () => gameOverModal(), 500 );
			clearInterval(runTimer);
			document.getElementById('resign').classList.add('noClick');
			return;
		}
	}

	if (moveHistory.length > 8) { // covers a forced draw
		forceDraw();
		if (drawForced) {
			message = activeKing.dataset.side + " " + goToDiv.dataset.name + " forces a draw";
			setTimeout(() => gameOverModal(), 500);
			clearInterval(runTimer);
			document.getElementById('resign').classList.add('noClick');
			return;
		}
	}

	stuckActivePieces = 0;
	index = moveHistory.length;
	findingKingAttackers = true;
	firstReview = true;

	pawnBlocksKingAttacker = false;
	noPawnEvolution = false;
	enPassantMove = false;
	kingInCheck = false;
	kingStuck = false;
	isCastle = false;

	greyPieceToMove = undefined;
	newPieceClicked = undefined;
	behindKingId = undefined;

	canBlockPathOfCheck = [];
	canEatKingAttacker = [];
	kingAttackers = [];
	pinnedLitIds = [];
	pinnedPieces = [];
	pathOfCheck = [];
	kingIds = [];
	litIds = [];
	pins = [];

	// ********** META-LOGIC **********

	toggleClocks();

	if (castleIds.length) {
		castleIds.forEach(id => {
			document.getElementById(id).classList.remove('castleLit');
			document.getElementById(id).removeEventListener('click', castling);
		});
		castleIds = [];
	}

	previousPinnedPieces = board.querySelectorAll("[data-pinned='true']");
	// -------------------------------------------------------------------------
	// sets activeKing
	for (i = 0; i < activeSide.length; i++) {
		if (activeSide[i].dataset.name === 'king') {
			activeKing = activeSide[i];
			break;
		}
	}
	// --------------------------------------------------------
	// covers game ending in a draw if activeSide unable to move
	testingDraw = true;
	activeSide.forEach(piece => {
		litIds = [];
		pieceToMove = piece;
		possibleMoves();
		if (!litIds.length) { stuckActivePieces += 1; }
	});
	litIds = [];
	pathOfCheck = [];
	testingDraw = false;
	pieceToMove = undefined;

	// ---------------------------------------------------------------
	// pushes to kingAttackers all passivePieces that check activeKing 
	passiveSide.forEach(passivePiece => {
		if (passivePiece.dataset.name !== 'king') {
			if (checkingSpace(passivePiece, activeKing.id)) {
				kingAttackers.push(passivePiece);
			}
		}
	});

	if (previousPinnedPieces.length) {
		// collects each pinned piece into pins
		pinnedPieces.forEach(obj => { pins.push(obj.pinned); });

		// for each previousPinnedPiece, if not in pins, un-pins that piece
		for (let i = 0; i < previousPinnedPieces.length; i++) {
			if (!pins.includes(previousPinnedPieces[i])) {
				// sets dataset.pinned to 'false' & dataset.pinner to 'empty'
				previousPinnedPieces[i].setAttribute('data-pinned', 'false');
			}
		}
	}

	findingKingAttackers = false;
	// -------------------------------------
	if (kingAttackers.length) { inCheck(); }
	// -------------------------------------
	else { // since not in check
		if (stuckActivePieces === activeSide.length) {
			message = "game ends in a draw";
			setTimeout(() => gameOverModal(), 500);
			clearInterval(runTimer);
			return;
		}
		activeSide.forEach(activePiece => {
			activePiece.addEventListener('click', wherePieceCanMove);
		});
	}
}

/////////////////////////////

window.onload = function() {

	/*
	var socket = io();
	document.querySelector('button').addEventListener('click', function(e) {
		e.preventDefault();
		socket.emit('chat message', document.querySelector('#m').value);
		document.querySelector('#m').value = '';
		return false;
	});
	socket.on('chat message', function(msg) {
		var elem = document.createElement('LI');
		var text = document.createTextNode(msg);
		elem.appendChild(text);
		document.querySelector('#messages').appendChild(elem);
	});
	*/

	document.getElementById('resign').classList.add('noClick');

	document.getElementById('start').addEventListener('click', function getMinutes() {
		
		document.getElementById('resign').classList.remove('noClick');
		
		timerSet = document.getElementById('timeSet').value;
        
        if (timerSet) {
			if (timerSet > 0) {
				if (timerSet < 1000) {
					if (!timerSet.includes('.')) {
						if (!timerSet.includes('e')) {

							userInput = +(timerSet);

							clock1 = document.getElementById('time1');
							clock1.innerHTML = userInput + ':00';

							clock2 = document.getElementById('time2');
							clock2.innerHTML = userInput + ':00';

							blueTime = {
								minutes: userInput,
								tenths: 0,
								hundredths: 0
							};

							orangeTime = {
								minutes: userInput,
								tenths: 0,
								hundredths: 0
							};

							document.getElementById('modal').style.display = "none";

							function showTimers(timer) {
								timer.style.visibility = "visible";
								timer.style.opacity = '1';
								timer.style.transform = 'scale(1.0)';
								timer.style.transition = 'visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s';
							}

							showTimers(document.getElementById('time1'));
							showTimers(document.getElementById('time2'));

							lit();
						}
					}
				}
			}
        }
	});
}
