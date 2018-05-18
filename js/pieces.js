var pinnerPieces = [], pinningPieceId, pawnBlocksKingAttacker, idToBlock, kingAttackers= [], greyLitDivs = [], defenders = [], pawnDefenders = [], enPassantCell = '', orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1, enPassanting = false, endOfGame = false,
heroics = [], mate, canCheck, checkPath, emptySpaces, knightLight, bishopPathId, rookPathId, blueKingFirstMove, blueRook1FirstMove, activeKing, blueRook2FirstMove,  orangeKingFirstMove, orangeRook1FirstMove, orangeRook2FirstMove, castleIds = [], noCastle, kingAble, pieceToMove, goToDiv, enPassantDiv, prevGoToDiv, enPassantGoToDiv, pawnJumpDiv, enPassantables2 = [], enPassantedPawn, knightLight, takenOrangeBox, takenBlueBox, pieceLit, gameEnds, tempSide, movedPiece, mainLitDiv, litDivs, unLitDivs, img, index1, index2, tempPiece, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, block1, block2, block3, block4, block5, block6, block7, block8, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, defenders, pinnedPieces, pathOfCheck = [], nails, whites, blacks;

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
const boardIds = [
	'00', '01', '02', '03', '04', '05', '06', '07',
	'10', '11', '12', '13', '14', '15', '16', '17',
	'20', '21', '22', '23', '24', '25', '26', '27',
	'30', '31', '32', '33', '34', '35', '36', '37',
	'40', '41', '42', '43', '44', '45', '46', '47',
	'50', '51', '52', '53', '54', '55', '56', '57',
	'60', '61', '62', '63', '64', '65', '66', '67',
	'70', '71', '72', '73', '74', '75', '76', '77'
];
// ------------------------------
function openSpaces(arr1, arr2) {
	return arr1.filter(cell => {
		return !arr2.some(piece => {
			return cell === piece.id;
		});
	});
}
// ------------------------------------------
var board = document.getElementById('board');
// --------------------------------------------------------------
let orangeNodes = board.querySelectorAll("[data-side='orange']");
let blueNodes = board.querySelectorAll("[data-side='blue']");
// -----------------------------------
var oranges = Array.from(orangeNodes);
var blues = Array.from(blueNodes);
// ---------------------------------
var pieces = [...oranges, ...blues];
// ---------------------------------
/*
////////////////////////////////////
emptySpaces.forEach( emptySpace => {
	document.getElementById( emptySpace ).getAttribute('data-side') === 'empty';
});
///////////////////////
function endGameNow() {
	remove activeSide click listener
	// -------------------------------------------------
	if (activeKing.getAttribute('data-side') === 'blue') { alert("blue resigns"); }
	else {alert("orange resigns");} 
	// ----------------
	update user profile
}
*/
//==============================================
//==============================================
//==============================================
//==============================================
//==============================================
//==============================================

// returns true/false if some-piece checks-space
function checkingSpace(somePiece, checkSpaceId) {
    // somePiece is an <img>
	// checkSpaceId is an id (kingSpace not held by an activeSide piece)
	pinnedPieces = []; pathOfCheck = []; pinnerPieces = [];
	//==============================
	function pawnAttacks(somePawn) {
		// --------------------------
		if (pawnBlocksKingAttacker) {
			// sees if pawn can block checkSpaceId
			if (somePawn.getAttribute('data-side') === 'blue') { // if blue turn
				// collects empty space one ahead of blue pawnToMove
				if (idToBlock === somePawn.id[0] + (somePawn.id[1] - 1)) {
					// litDivs.push( idToBlock );
					return true;
				} // -----------------------------------------------
				// collects empty space two ahead of blue pawnToMove
				else if (document.getElementById(
					somePawn.id[0] + (somePawn.id[1] - 1)
				).dataset.side === 'empty') {
					// if blue pawnToMove in row 6
					if (somePawn.id[1] === '6') {
						// if empty cell two ahead of blue pawnToMove
						if (idToBlock === somePawn.id[0] + (somePawn.id[1] - 2)) {
							// litDivs.push( idToBlock );
							return true;
						}
					}
				}
				else { return false; }
			} // -----------------------
			else { // since orange turn
				// collects empty space one ahead of orange pawnToMove
				if (idToBlock === somePawn.id[0] + (somePawn.id[1] + 1)) {
					// litDivs.push( idToBlock );
					return true;
				} // -----------------------------------------------
				// collects empty space two ahead of orange pawnToMove
				else if (document.getElementById(
					somePawn.id[0] + (+somePawn.id[1] + 1)
				).dataset.side === 'empty') {
					// if blue pawnToMove in row 1
					if (pieceToMove.id[1] === '1') {
						// if empty cell two ahead of blue pawnToMove
						if (idToBlock === somePawn.id[0] + (+somePawn.id[1] + 2)) {
							// litDivs.push( idToBlock );
							return true;
						}
					}
				}
				else { return false; }
			}
		}
		else { // sees if pawn can eat checkSpaceId
			if (somePawn.id[0] - 1 == checkSpaceId[0]
			|| (+somePawn.id[0] + 1) == checkSpaceId[0]) {
				// if pawn is blue
				if (somePawn.getAttribute('data-side') === 'blue') {
					return checkSpaceId[1] == (somePawn.id[1] - 1);
				} // since pawn is orange
				else { return checkSpaceId[1] == (+somePawn.id[1] + 1); }
			} return false;
		}
	}
	//=========================================================
	// returns true/false if the knight can attack checkSpaceId
	function knightAttacks(someKnight) {
		// to hold two spaces where knight might checkSpaceId
		knightMoves = [];
		// -------------------------------------
		// if someKnight is left of checkSpaceId
		if (someKnight.id[0] < checkSpaceId[0]) {
			// and if someKnight is above checkSpaceId
			if (someKnight.id[1] < checkSpaceId[1]) {
				knightMoves.push(
					(+someKnight.id[0] + 1) +
					(+someKnight.id[1] + 2).toString()
				); // ------------------------------
				knightMoves.push(
					(+someKnight.id[0] + 2) +
					(+someKnight.id[1] + 1).toString()
				);
			} // -----------------------------------------------------
			else { // since someKnight is left of & below checkSpaceId
				knightMoves.push(
					(+someKnight.id[0] + 1) +
					(someKnight.id[1] - 2).toString()
				); // -----------------------------
				knightMoves.push(
				(+someKnight.id[0] + 2) +
				(someKnight.id[1] - 1).toString()
				);
			}
		} // ------------------------------------------------------
		else { // since someKnight is right of & above checkSpaceId
			if (someKnight.id[1] < checkSpaceId[1]) {
				knightMoves.push(
					(someKnight.id[0] - 1) +
					(+someKnight.id[1] + 2).toString()
				); // ------------------------------
				knightMoves.push(
					(someKnight.id[0] - 2) +
					(+someKnight.id[1] + 1).toString()
				);
			} // ------------------------------------------------------
			else { // since someKnight is right of & below checkSpaceId
				knightMoves.push(
					(someKnight.id[0] - 1) +
					(someKnight.id[1] - 2).toString()
				); // -----------------------------
				knightMoves.push(
					(someKnight.id[0] - 2) +
					(someKnight.id[1] - 1).toString()
				);
			}
		} // ------------------------------------
		return knightMoves.includes(checkSpaceId); 
	}
	// ========================================================
	// returns true/false if the bishop can attack checkSpaceId
	function bishopAttacks(someBishop) {
		// checks for clear path between someBishop.id & checkSpaceId
		bishopMoves = []; // collects spaces someBishop attacks enroute to checkSpaceId
		nails = []; // collects possible pinnedPieces
		bishopX = +someBishop.id[0];
		bishopY = +someBishop.id[1];
		// -------------------------------------------------
		// someBishop & checkSpaceId cannot have the same id
		if (someBishop.id === checkSpaceId) { return false; }
		// ----------------------------------------------------------
		// (LEFT BOARD SIDE) if someBishop.id is left of checkSpaceId
		if (someBishop.id[0] < checkSpaceId[0]) {
			// (FIRST QUADRANT) and if someBishop is above checkSpaceId
			if (someBishop.id[1] < checkSpaceId[1]) {
			// if someBishop's path aligns with checkSpaceId
			if ( checkSpaceId[0] - someBishop.id[0] 
			=== checkSpaceId[1] - someBishop.id[1] ) {
				// collects bishop's attack path to checkSpaceId
				while (bishopX < checkSpaceId[0] - 1) {
				bishopX += 1;
				bishopY += 1;
				bishopMoves.push( bishopX + bishopY.toString() );
				}
			} // ----------------------------------------------
			else { return false; } // bishop can't checkSpaceId
			} // ------------------------------------------------------------
			else { // (THIRD QUADRANT) bishop is left of & below checkSpaceId
			// if someBishop aligns with checkSpaceId
			if ( checkSpaceId[0] - someBishop.id[0]
			=== someBishop.id[1] - checkSpaceId[1] ) {
				// collects bishop's attack path to checkSpaceId
				while (bishopX < checkSpaceId[0] - 1) {
				bishopX += 1;
				bishopY -= 1;
				bishopMoves.push( bishopX + bishopY.toString() );
				}
			} // -----------------------------------------------
			else { return false; } // bishop cannot checkSpaceId
			}
		} // -------------------------------------------------------------
		else { // (RIGHT BOARD SIDE) since bishop is right of checkSpaceId
			// (SECOND QUADRANT) and since someBishop is above checkSpaceId
			if (someBishop.id[1] < checkSpaceId[1]) {
			// if bishop aligns with checkSpaceId
			if ( someBishop.id[0] - checkSpaceId[0]
			=== checkSpaceId[1] - someBishop.id[1] ) {
				// collects bishop's attack path to checkSpaceId
				while (bishopX > checkSpaceId[0] + 1) {
				bishopX -= 1;
				bishopY += 1;
				bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop can't checkSpaceId  
			} // ----------------------
			else { // (FOURTH QUADRANT)
			// since bishop is right of & below checkSpaceId
			// if someBishop aligns with checkSpaceId
			if ( someBishop.id[0] - checkSpaceId[0] 
				=== someBishop.id[1] - checkSpaceId[1] ) {
				// collects bishop's attack path to checkSpaceId
				while (bishopX > checkSpaceId[0] + 1) {
				bishopX -= 1;
				bishopY -= 1;
				bishopMoves.push( bishopX + bishopY.toString() );
				}
			} // ----------------------
			// bishop can't attack king
			else { return false; }
			}
		}  console.log('bishopMoves -->');  console.log(bishopMoves);
		// --------------------------------------------------------------------
		// populates nails with pieces that block bishop's path to checkSpaceId
		pieces.forEach(piece => {
			bishopMoves.forEach(bishopMove => {
			if (piece.id === bishopMove) { nails.push(piece); }
			});
		});  console.log('nails -->');  console.log(nails);
		// -------------------------------------------------------------------
		// returns true/false if no piece blocks bishop's path to checkSpaceId
		if (!nails.length) { // nails can be both sides
			// pathOfCheck array becomes someBishop's id route to checkSpaceId
			pathOfCheck = bishopMoves;
			console.log('pathOfCheck -->');  console.log(pathOfCheck);
			return true; // someBishop can attack checkSpaceId
		} // -----------------------------------------------
		if (nails.length === 1) { // if only one nail
			// if that nail & someBishop aren't on the same side
			if (nails[0].getAttribute('data-side') !== someBishop.getAttribute('data-side')) {
				pinnedPieces.push(nails[0]);
				pinnerPieces.push(someBishop);
				// -------------------------------------------------------------------------------------------
				alert(nails[0].getAttribute('data-side') + ' ' + nails[0].getAttribute('data-name') + ' IS PINNED');
				console.log('pinnedPieces -->');  console.log(pinnedPieces);
			}
		} // -------------------------------------------------
		return false; // someBishop cannot attack checkSpaceId
	}
	// ======================================================
	// returns true/false if the rook can attack checkSpaceId
	function rookAttacks(someRook) {
		// checks for clear path between someRook.id & checkSpaceId
		// ------------------------------------------------------------------------
		rookMoves = []; // collects spaces someRook attacks enroute to checkSpaceId
		nails = []; // collects possible pinnedPieces
		// ------------------------------------------
		// if someRook & checkSpaceId share column
		if (someRook.id[0] === checkSpaceId[0]) {
			// if someRook below checkSpaceId
			if (someRook.id[1] < checkSpaceId[1]) {
			// someRook.y++
			for (let i = (+someRook.id[1] + 1); i < checkSpaceId[1]; i++) {
				rookMoves.push( checkSpaceId[0] + i ); // id
			}
			}
			else { // since someRook is above checkSpaceId, rook.id[1]--
			for (let i = (someRook.id[1] - 1); i > checkSpaceId[1]; i--) {
				rookMoves.push( checkSpaceId[0] + i ); // id
			}
			}
		} // ----------------------------------------------
		// pushes column spaces between rook & checkSpaceId
		// else if someRook & checkSpaceId share row
		else if (someRook.id[1] === checkSpaceId[1]) {
			// if someRook left of checkSpaceId, someRook.id[0]++
			if (someRook.id[0] < checkSpaceId[0]) {
			for (let i = (+someRook.id[0] + 1); i < checkSpaceId[0]; i++) {
				rookMoves.push( i + checkSpaceId[1] ); // id
			}
			}
			else { // since rook right of checkSpaceId, someRook.id[0]--
			for (let i = (someRook.id[0] - 1); i > checkSpaceId[0]; i--) {
				rookMoves.push( i + checkSpaceId[1] ); // id
			}
			}
		} else { return false; } // rook can't checkSpaceId
		// -------------------------------------------------------------------
		// console.log('rookMoves -->');  console.log(rookMoves);
		// populates nails with pieces that block rook's path to checkSpaceId
		pieces.forEach(piece => {
			rookMoves.forEach(rookMove => {
			if (piece.id === rookMove) { nails.push(piece); }
			});
		});
		// console.log('nails -->');  console.log(nails);
		// -------------------------------------------------------------------
		// returns true/false if no piece blocks rook's path to checkSpaceId
		if (!nails.length) { // nails can be both sides
			// pathOfCheck array becomes someRook.id route to checkSpaceId
			if (someRook.getAttribute('data-name') === 'queen') {
			pathOfCheck = [...pathOfCheck, ...rookMoves];
			}
			else { pathOfCheck = rookMoves; }
			return true; // someRook can attack checkSpaceId
		} // ----------------------------------------
		if (nails.length === 1) { // if only one nail
			// if that nail & someRook aren't on the same side
			if (nails[0].getAttribute('data-side') !== someRook.getAttribute('data-side')) {
				pinnedPieces.push(nails[0]);
				pinnerPieces.push(someRook);
				// -------------------------------------------------------------------------------------------
				alert(nails[0].getAttribute('data-side') + ' ' + nails[0].getAttribute('data-name') + ' IS PINNED');
				console.log('pinnedPieces -->');  console.log(pinnedPieces);
			}
		} // -------------------------------------------------
		return false; // someRook cannot attack checkSpaceId
	}
	// =======================================================
	// returns true/false if the queen can attack checkSpaceId
	function queenAttacks(someQueen) {
		return (
			bishopAttacks(someQueen, checkSpaceId) 
			|| rookAttacks(someQueen, checkSpaceId)
		);
	}
	// ================================================
	// returns true if the king can attack checkSpaceId
	function kingAttacks(someKing) {
		switch (+checkSpaceId[0]) { // if checkSpaceId's column equals
			case +someKing.id[0]: // king's column
			return (
				( checkSpaceId[1] == (+someKing.id[1] + 1) )
				|| 
				( checkSpaceId[1] == (someKing.id[1] - 1) )
			);
			case +someKing.id[0] + 1: // king's column + 1
			return (
				( checkSpaceId[1] == someKing.id[1] )
				||
				( checkSpaceId[1] == (+someKing.id[1] + 1) )
				||
				( checkSpaceId[1] == (someKing.id[1] - 1) )
			);
			case someKing.id[0] - 1: // king's column - 1
			return (
				( checkSpaceId[1] == someKing.id[1] )
				||
				( checkSpaceId[1] == (+someKing.id[1] + 1) )
				||
				( checkSpaceId[1] == (someKing.id[1] - 1) )
			);
			default: return false;
		}
	}
	// =================================
	// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
	// =================================
	// sees if somePiece can check space
	switch (somePiece.getAttribute('data-name')) {
		//----------------------------------------
		case 'pawn': return pawnAttacks(somePiece);
		//-----------------------------------------------------------
		case 'knight': return knightAttacks(somePiece); 
		//-----------------------------------------------------------
		case 'bishop': return bishopAttacks(somePiece);
		//-------------------------------------------------------
		case 'rook': return rookAttacks(somePiece);
		//---------------------------------------------------------
		case 'queen': return queenAttacks(somePiece);
		//-------------------------------------------------------
		case 'king': return kingAttacks(somePiece);
	}
} // returns true/false if somePiece checks checkSpaceId