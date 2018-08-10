function removeLitDivHandler(funcName) {

	litIds.forEach( litDiv => {
		litPiece = document.getElementById( litDiv );
		litPiece.classList.remove( 'lit' );
		litPiece.removeEventListener( 'click', funcName );
	});
	litIds = [];
}