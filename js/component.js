/*  for each pinnedPiece,
        collects in pinnedPiece's pinnedMoveIds attribute:
            ids between it & its pinner
            then also ids between it & its own king */

pinnedPieces.forEach(pinnedPiece => {
    // --------------------------------------------------------------------
    checkingSpace(pinnedPiece, pinnedPiece.getAttribute('data-pinner').id);
    pinnedPiece.setAttribute('data-pinnedMoves', pathOfCheck);
    // -------------------------------------------------------
    checkingSpace(pinnedPiece, activeKing.id);
    pinnedPiece.setAttribute('data-pinnedMoves', [...pathOfCheck]);
});

/*  if pieceToMove is pinned,
        then for each id in its pinnedMoveIds attribute,
            if pieceToMove can move to that id,
                add that id to litDivs array   */

if (pieceToMove.getAttribute('data-pinned') === 'true') {
    // --------------------------------------------------
    pinnedMoves.forEach(id => {
        // ------------------------------------------------------
        if (checkingSpace(pieceToMove, id)) { litDivs.push(id); }
    });
}

/*  now that litDivs contains all ids where pinned pieceToMove can go...
        simply add click-handler to pieceToMove run movePiece(e)    */

addLitDivHandler(pieceToMove, movePiece);

// on-clicking pieceToMove, lighten & click-listen to each litDiv



/*
ERRORS:
1.  pinnedPiece needs to move between its path to king
        and its path to its pinner --> rewrite pinnedPieceLit()

METHOD: step through entire file to find mistakes... open flood gates    

SCENARIOS:  1.  pinnedPiece clicked --> move where able

BUILD:

    0. add two clocks --> on-load, choose game duration

    1. add one resign button to endGame() for activeSide

*/