pinnedPieces.forEach(pinnedPiece => {
    // --------------------------------------------------------------------
    checkingSpace(pinnedPiece, pinnedPiece.getAttribute('data-pinner').id);
    possiblePinnedMoves = pathOfCheck;
    // ---------------------------------------
    checkingSpace(pinnedPiece, activeKing.id);
    possiblePinnedMoves = [...pathOfCheck];
});


if (pieceToMove.getAttribute('data-pinned') === 'true') {
    // --------------------------------------------------
    possiblePinnedMoves.forEach(id => {
        // ------------------------------------------------------
        if (checkingSpace(pieceToMove, id)) { litDivs.push(id); }
    });
}

addLitDivHandler(pinn);
 

/*
ERRORS:

    1.  pinnedPiece no longer moves between its path to king and its path to its pinner 
    
    2.  in check, king is not clickable to move, if able...

    3.  TO BEGIN EACH TURN:
            if (pinnedPiece no longer pinned) { 
                pinnedPiece.setAttribute('data-pinned', 'true');
            }


METHOD:  walk through lit() step by step with each scenario in mind to find mis-alignments

SCENARIOS:
    pinnedPiece clicked --> move where able
    king able to move --> click and move
    pinnedPiece from previous move no longer pinned --> click and move



BUILD:

    1. pawn evolution --> queen or knight
    
    2. add two clocks --> choose the game duration

    3. add resign button

*/