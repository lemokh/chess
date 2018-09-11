import removeLitDivHandler from './removeLitDivHandler.js';
import toggleSides from './toggleSides.js';
import swapSide from './swapSide.js';
import movePiece from './movePiece.js';

// exports to [wherePieceCanMove.js, cleanUpAfterFirstClick.js]
export default function castling(e) {
	
	console.log('enters castling(e)');
	// -------------------------------
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

	if (litIds.length) { removeLitDivHandler(movePiece); }
	
	toggleSides();
}