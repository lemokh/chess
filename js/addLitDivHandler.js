function addLitDivHandler(funcName) {

	litIds.forEach( litDiv => {
		litPiece = document.getElementById( litDiv );
		litPiece.classList.add( 'lit' );
		litPiece.addEventListener( 'click', funcName );
	});
}
