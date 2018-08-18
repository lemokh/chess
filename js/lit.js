import checkingSpace from "./checkingSpace.js";
import inCheck from "./inCheck.js";
import possibleMoves from "./possibleMoves.js";
import toggleClocks from "./toggleClocks.js"
import wherePieceCanMove from "./wherePieceCanMove.js";

export function lit() {

	var stuckActivePieces = 0,
		findingKingAttackers = true,
		
		pawnBlocksKingAttacker = false,
		noPawnEvolution = false,
		kingInCheck = false,
		kingStuck = false,

		greyPieceToMove = undefined,
		newPieceClicked = undefined,
		behindKingId = undefined,
		
		canBlockPathOfCheck = [],
		canEatKingAttacker = [],
		kingAttackers = [],
		pinnedLitIds = [],
		pinnedPieces = [],
		pathOfCheck = [],
		kingIds = [],
		litIds = [],
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
		clearInterval(runTimer);
		alert("Game ends in a draw");
		return; // draw()
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
