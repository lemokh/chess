import onBoard from './onBoard.js';

// exports to possibleMoves
export default function rookLit() {
	// in case of queen
	if (pieceToMove.dataset.name === 'rook') { litIds = []; } 

    function line(x, y) { // x & y are a number
        let rookPath = document.getElementById( x.toString() + y );

        if (onBoard(x+''+y)) {
            // collects id, if empty or passivePiece
            if (rookPath.dataset.side === 'empty') {
                litIds.push( rookPath.id );
                // increments x
                if (x !== +pieceToMove.id[0]) {
                    // if x is east of pieceToMove, continue east
                    if (x > +pieceToMove.id[0]) { x += 1; }
                    else { x -= 1; } // continue west
                }
                // increments y
                if (y !== +pieceToMove.id[1]) {
                    // if y is south of pieceToMove, continue south
                    if (y > +pieceToMove.id[1]) { y += 1; }
                    else { y -= 1; } // continue north
                }
                line(x, y); // continue path
            }
            else if (rookPath.dataset.side === passiveSide[0].dataset.side) {
                litIds.push( rookPath.id ); // path ends
            }
        }        
    } // rookLit helper

	line(+pieceToMove.id[0] + 1, +pieceToMove.id[1]);
	line(+pieceToMove.id[0] - 1, +pieceToMove.id[1]);
	line(+pieceToMove.id[0], +pieceToMove.id[1] + 1);
	line(+pieceToMove.id[0], +pieceToMove.id[1] - 1);
} // fills litIds with ids where rook can move