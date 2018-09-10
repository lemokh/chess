import kingLit from './kingLit.js';
import checkingSpace from './checkingSpace.js';
import pinnedPieceLit from './pinnedPieceLit.js';
import endOfGame from './endOfGame.js';
import selectGreyPiece from './selectGreyPiece.js';

// exports to index.js
export default function inCheck() {
	console.log('ENTERS inCheck()');
	console.log('behindKingId -->');  console.log(behindKingId);

	checkPath = [];		
	kingInCheck = true;
	pieceToMove = activeKing;
	
	console.log('litIds before kingLit() -->');  console.log(litIds);

	kingLit(); // fills litIds with ids where activeKing can move

	console.log('litIds after kingLit() -->');  console.log(litIds);
	console.log('greyLitPieces -->');  console.log(greyLitPieces);

	// if king can move, handles moving activeKing
	if (litIds.length) {

		kingLitIds = litIds;
		
		/*  kingLitIds is used in selectGreyPiece() & moveGreyPiece()

		// kingLitIds = litIds that are not in checkPath
		kingLitIds = litIds.filter(litId =>
			!checkPath.some(id => litId === id)
		);
		
		// checkPath = checkPath ids that are not in litIds
		checkPath = checkPath.filter(id =>
			!litIds.some(litId => id === litId)			
		);
		
		// litIds = kingLitIds; // this seems sloppy, not concise
		*/
		
		// console.log('checkPath -->');  console.log(checkPath);
		// console.log('litIds -->');  console.log(litIds);
		// console.log('kingLitIds -->');  console.log(kingLitIds);

		// click-handling greyLit activeKing
		greyLitPieces.push(activeKing);
		activeKing.classList.add('preventMateLit');
		activeKing.addEventListener('click', selectGreyPiece);
		
		console.log('greyLitPieces -->');  console.log(greyLitPieces);
	} // else { kingStuck = true; } unnecessary

	if (kingAttackers.length === 1) { // if only one kingAttacker
		/////////////////////////////////////////////////////////
		console.log('ONLY ONE KING ATTACKER');
		// populates checkPath with kingAttacker's id path to king
		switch(kingAttackers[0].dataset.name) {
			case 'bishop': case 'queen':
				checkSpaceId = activeKing.id;
				bishopAttacks(kingAttackers[0]);
				checkPath.push(...bishopMoves);
			case 'rook': case 'queen':
				checkSpaceId = activeKing.id;
				rookAttacks(kingAttackers[0]);
				checkPath.push(...rookMoves);
		}

		// populates canEatKingAttacker & canBlockPathOfCheck
		activeSide.forEach(activePiece => {
			pieceToMove = activePiece; // IMPORTANT
			// for each activePiece, if not pinned
			if (activePiece.dataset.pinned === 'false') {
				// console.log('NOT PINNED');
				// if not activeKing
				if (activePiece.dataset.name !== 'king') {
					// console.log('NOT KING');
					//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
					// if activePiece checks kingAttacker
					if (checkingSpace(activePiece, kingAttackers[0].id)) {
						
						console.log(activePiece.dataset.side+activePiece.dataset.name+' at '+activePiece.id+' can eat '+kingAttackers[0].dataset.side+kingAttackers[0].dataset.name+' at '+kingAttackers[0].id);

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

									console.log(activePiece.id+' can block at '+pathId);

									canBlockPathOfCheck.push(
										{ pathBlocker: activePiece, emptyDivId: pathId }
									);
								}
							});

							pawnBlocksKingAttacker = false;
						}
					}
				}
			}
		});

		greyLitPieces.push(...canEatKingAttacker);
		console.log('greyLitPieces');  console.log(greyLitPieces);
		
		canBlockPathOfCheck.forEach(obj => {
			greyLitPieces.push(obj.pathBlocker);
		});
		console.log('greyLitPieces');  console.log(greyLitPieces);
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
		console.log('since no greyLitPieces... endOfGame');
		return endOfGame();
	}
}