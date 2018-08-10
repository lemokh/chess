var kingAttackers=[], greyLitPieces=[], kingLitIds=[], pathOfCheck=[],
	canBlockPathOfCheck=[], canEatKingAttacker=[], castleIds=[],
	orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1, nails,
	enPassanting = false, pins, kingInCheck, stuckActivePieces, litIds, 
	checkSpaceId, pinnedLitIds, behindKingId, pawnBlocksKingAttacker,
	kingStuck, newPieceClicked, pinnerPiece, greyPieceToMove, noCastle,
	blocker, passiveSideCoversId, checkPath, blueKingFirstMove, 
	blueRook1FirstMove, activeKing, blueRook2FirstMove, pieceToMove, 
	orangeKingFirstMove, orangeRook1FirstMove, orangeRook2FirstMove, 
	goToDiv, enPassantDiv, pawnJumpDiv,index1, index2, pinnedPieces, 
	moves, bishopMoves, bishopX, bishopY, openAndOpponentHeldKingSpaces,
	rookMoves, kingSpaces;

const board = document.getElementById('board');

var blueNodes = board.querySelectorAll("[data-side='blue']"),
	orangeNodes = board.querySelectorAll("[data-side='orange']"),

	blues = Array.from(blueNodes),
	oranges = Array.from(orangeNodes),

	activeSide = blues,
	passiveSide = oranges,

	///////////////////////////

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

function setTimer() { // unnecessary?
	document.getElementById('start')
			.addEventListener('click', getMinutes);
}

function startClock() { runTimer = setInterval(countDown, 1000); };

function countDown() {

	obj.hundredths -= 1;
	
	if ( obj.hundredths < 0 ) {
		obj.tenths -= 1;
		obj.hundredths = 9;
	}
	if ( obj.tenths < 0 ) {
			obj.minutes -= 1;
			obj.tenths = 5;
	}
	if ( obj.minutes < 0 ) { return resign(); }

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

////////////////////////////////////////////////////////////

function resign() {
	clearInterval(runTimer);
	board.classList.add('noClick');
	
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});
	
	alert(activeKing.dataset.side + " resigns");
	console.log('END OF GAME');
}

////////////////////////////////////////////////////////////

function draw() {
	clearInterval(runTimer);
	alert("Game ends in a draw");
	return;
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

function lit() {

	stuckActivePieces = 0;
	findingKingAttackers = true;
	
	pawnBlocksKingAttacker = false;
	noPawnEvolution = false;
	kingInCheck = false;
	kingStuck = false;

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

	// board.querySelectorAll('.lit').forEach(item => {
    //     removeHandler('.lit', funcName);
    // });

	previousPinnedPieces = board.querySelectorAll("[data-pinned='true']");
	console.log('previousPinnedPieces -->');  console.log(previousPinnedPieces);
    // -------------------------------------------------------------------------
    // sets activeKing
	for (i = 0; i < activeSide.length; i++) {      
        if (activeSide[i].dataset.name === 'king') {
            activeKing = activeSide[i];
            break;
		}
    }  console.log('activeKing -->');  console.log(activeKing);
    // --------------------------------------------------------
	testingDraw = true;
	// covers game ending in a draw
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
	if (stuckActivePieces === activeSide.length) {
		draw();
		// clearInterval(runTimer);
		// alert("Game ends in a draw");
		// return;
	}
    // ---------------------------------------------------------------
    // pushes to kingAttackers all passivePieces that check activeKing 
	passiveSide.forEach(passivePiece => {
		if (passivePiece.dataset.name !== 'king') {
			if (checkingSpace(passivePiece, activeKing.id)) {
				kingAttackers.push(passivePiece);
				console.log('pathOfCheck -->');  console.log(pathOfCheck);
			}
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
				// sets dataset.pinned to 'false'
				previousPinnedPieces[i].setAttribute('data-pinned', 'false');
			}
		}
	}

	console.log('pinnedPieces -->');  console.log(pinnedPieces);
	console.log('kingAttackers -->');  console.log(kingAttackers);
	
	findingKingAttackers = false;
    // -------------------------------------
    if (kingAttackers.length) { inCheck(); }
    // -------------------------------------
	else { // since not in check
		activeSide.forEach(activePiece => {
			activePiece.addEventListener('click', wherePieceCanMove);
		});
	}
}

////////////////////////////////////////////////////////////

window.onload = function () {
	document.getElementById('start').addEventListener('click', function getMinutes() {
	timerSet = document.getElementById('timeSet').value;	
		if (timerSet) {
			if (timerSet > 0) {
				if (timerSet < 1000) {	
					if (!timerSet.includes('.'))
						if (!timerSet.includes('e')) {
					
						userInput = +(timerSet);
						
						clock1 = document.getElementById('time1');
						clock1.innerHTML = userInput+':00';
						
						clock2 = document.getElementById('time2');
						clock2.innerHTML = userInput+':00';

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
	});
}