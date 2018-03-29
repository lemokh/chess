function nextMove() {
    renderBoard();
    checkMate();
    // add click listener to activeSide
        // on-click: highlight possible moves
    
    // add click listener to lit spaces
        // on-click: unhighlight possible moves
            // remove both click listeners --> use .getElementsByClassName()
            // if ( {x2, y2} contains passiveSide --> image div) {
                // remove that piece from passiveSide array
                // add that piece to its takenBox div
            // }
            // set moved piece's {x1, x2} to be {x2, y2} within activeSide array
            // update pieces array
            // tempSide = activeSide; activeSide = passiveSide; passiveSide = tempSide;
}