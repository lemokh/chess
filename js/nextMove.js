// re-appropriate lit.js
function nextMove() {
    renderBoard(); // DONE PIECES
    checkMate();
    // add click listener to activeSide --> DONE LIT
        // on-click: highlight possible moves --> DONE LIT
    // add click listener to lit spaces --> DONE LIT
        // on-click: unhighlight possible moves --> DONE LIT?
            
            // **remove both click listeners --> use .getElementsByClassName()
            
            // **if ( {x2, y2} contains passiveSide --> image div) {
                // remove that piece from passiveSide array
                // add that piece to its takenBox div
            // }
            // DO IN LIT
            
            // set moved piece's {x1, x2} to be {x2, y2} within activeSide array
            // movedPiece.x = litSpace.x;
            // movedPiece.y = litSpace.y;
            // DONE LIT
            
            // update pieces array --> pieces = [...oranges, ...blues];
            // DONE HERE

            // tempSide = activeSide; activeSide = passiveSide; passiveSide = tempSide;
            // DONE HERE
}