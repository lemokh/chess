// nothing to import --> exports to swapSide.js

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