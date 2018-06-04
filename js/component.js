/*  for each pinnedPiece,
        collect into pinnedPiece's pinnedMoveIds attribute:
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

    1.  pinnedPiece no longer moves between its path to king and its path to its pinner 

    2.  TO BEGIN EACH TURN:
            if (pinnedPiece no longer pinned) { 
                pinnedPiece.setAttribute('data-pinned', 'true');
            }


METHOD: walk through lit() step by step with each scenario in mind to find mis-steps
        ... open the flood gates    


SCENARIOS:
    
    pinnedPiece clicked --> move where able

    in check king able to move --> click and move
    
    pinnedPiece from previous turn no longer pinned --> click and move



BUILD:

    1. pawn evolution --> queen or knight
    
    2. add two clocks --> choose the game duration

    3. add resign button

*/