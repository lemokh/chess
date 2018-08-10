// imports onBoard --> exports to possibleMoves
function bishopLit() {

    function quadrant(x, y) { // x & y are a number
        let bishopPath = document.getElementById(x+''+y);
    
        if (onBoard(x+''+y)) {
            // collects id, if empty or passivePiece
            if (bishopPath.dataset.side === 'empty') {
                litIds.push( bishopPath.id );
                // increments x
                // if x is east of pieceToMove, continue east
                if (x > +pieceToMove.id[0]) { x += 1; }
                else { x -= 1; } // continue west
                // increments y
                // if y is south of pieceToMove, continue south
                if (y > +pieceToMove.id[1]) { y += 1; }
                else { y -= 1; } // continue north
                quadrant(x, y); // continue path
            }
            else if (bishopPath.dataset.side === passiveSide[0].dataset.side) {
                litIds.push( bishopPath.id ); // path ends
            }
        }
    } // bishopLit helper

	quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] + 1);
	quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] - 1);
	quadrant(+pieceToMove.id[0] - 1, +pieceToMove.id[1] + 1);
	quadrant(+pieceToMove.id[0] - 1, +pieceToMove.id[1] - 1);
}  // fills litIds with ids where bishop can move