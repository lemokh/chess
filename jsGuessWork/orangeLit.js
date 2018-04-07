function orangeLit() {
    
    function pawnLit(pawn) {
        document.getElementById(pawn.x.toString() + pawn.y.toString()).classList.add('mainLit');

        blues.forEach(item => { // can pawn attack?
            if (item.y === pawn.y + 1) {
                if (item.x === pawn.x + 1) { 
                    document.getElementById(item.x.toString() + item.y.toString()).classList.add('lit');
                }
                if (item.x === pawn.x - 1) {
                    document.getElementById(item.x.toString() + item.y.toString()).classList.add('lit');
                }
            }
        });

        if (emptySpaces.includes(pawn.x.toString() + (pawn.y + 1).toString())) {
            document.getElementById(pawn.x.toString() + (pawn.y + 1).toString()).classList.add('lit');
            if (pawn.y === 1) {
                if (emptySpaces.indexOf(pawn.x.toString() + (pawn.y + 2).toString()) !== -1) {
                    document.getElementById(pawn.x.toString() + (pawn.y + 2).toString()).classList.add('lit');
                }
                // oranges.forEach(item => { // if this pawn moves there
                //   if (item.name === 'pawn') {
                //     if (item.y === 3) {
                //       if (item.x === pawn.x + 1 || item.x === pawn.x - 1) {
                //         enPassant = pawn; // eatable on next move by either blue pawn
                //       }
                //     }
                //   }
                // });
            }
        }
    }

    function knightLit(knight) {
        document.getElementById(knight.x.toString() + knight.y.toString()).classList.add('mainLit');
        
        for (let i = 0; i < oranges.length; i++) { // any own pieces occupy knight space?
            if (oranges[i].x === knight.x + 1) {
                if (oranges[i].y === knight.y + 2) { block1 = true; break; }
                if (oranges[i].y === knight.y - 2) { block2 = true; break; }

            }
            if (oranges[i].x === knight.x - 1) {
                if (oranges[i].y === knight.y + 2) { block3 = true; break; } 
                if (oranges[i].y === knight.y - 2) { block4 = true; break; }
            }
            if (oranges[i].x === knight.x + 2) {
                if (oranges[i].y === knight.y + 1) { block5 = true; break; } 
                if (oranges[i].y === knight.y - 1) { block6 = true; break; }
                
            }
            if (oranges[i].x === knight.x - 2) {
                if (oranges[i].y === knight.y + 1) { block7 = true; break; } 
                if (oranges[i].y === knight.y - 1) { block8 = true; break; }
            }
        }

        if (!block1) {
            if (knight.x + 1 < 8) { // FILTERS OUT OFF-BOARD KNIGHT MOVES
                if (knight.y + 2 < 8) {
                    document.getElementById((knight.x + 1).toString() + (knight.y + 2).toString()).classList.add('lit');
                }
            }
        }
        if (!block2) {
            if (knight.x + 1 < 8) {
                if (knight.y - 2 >= 0) {
                    document.getElementById((knight.x + 1).toString() + (knight.y - 2).toString()).classList.add('lit');
                }
            }
        }
        if (!block3) {
            if (knight.x - 1 >= 0) {
                if (knight.y + 2 < 8) {
                    document.getElementById((knight.x - 1).toString() + (knight.y + 2).toString()).classList.add('lit');
                }
            }
        }
        if (!block4) {
            if (knight.x - 1 >= 0) {
                if (knight.y - 2 >= 0) {
                    document.getElementById((knight.x - 1).toString() + (knight.y - 2).toString()).classList.add('lit');
                }
            }
        }
        if (!block5) {
            if (knight.x + 2 < 8) {
                if (knight.y + 1 < 8) {
                    document.getElementById((knight.x + 2).toString() + (knight.y + 1).toString()).classList.add('lit');
                }
            }
        }
        if (!block6) {
            if (knight.x + 2 < 8) {
                if (knight.y - 1 >= 0) {
                    document.getElementById((knight.x + 2).toString() + (knight.y - 1).toString()).classList.add('lit');
                }
            }
        }
        if (!block7) {
            if (knight.x - 2 >= 0) {
                if (knight.y + 1 < 8) {
                    document.getElementById((knight.x - 2).toString() + (knight.y + 1).toString()).classList.add('lit');
                }
            }
        }
        if (!block8) {
            if (knight.x - 2 >= 0) {
                if (knight.y - 1 >= 0) {
                    document.getElementById((knight.x - 2).toString() + (knight.y - 1).toString()).classList.add('lit');
                }
            }
        }
    }

    function bishopLit(bishop) {
        document.getElementById(bishop.x.toString() + bishop.y.toString()).classList.add('mainLit');

        function one(bishop) {
            bishopX = bishop.x + 1;
            bishopY = bishop.y + 1;
    
            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) { // while bishop's path is an empty space
            document.getElementById(bishopX.toString() + bishopY.toString()).classList.add('lit');
                bishopX += 1;
                bishopY += 1;
            }
            for (let i = 0; i < blues.length; i++) {
                if (blues[i].x === bishopX) {
                    if (blues[i].y === bishopY) {
                        document.getElementById(bishopX.toString() + bishopY.toString()).classList.add('lit');
                    }
                }
            }
        }
        function two(bishop) {
            bishopX = bishop.x + 1;
            bishopY = bishop.y - 1;
    
            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(bishopX.toString() + bishopY.toString()).classList.add('lit');
                bishopX += 1;
                bishopY -= 1;
            }
            for (let i = 0; i < blues.length; i++) {
                if (blues[i].x === bishopX) {
                    if (blues[i].y === bishopY) {
                        document.getElementById(bishopX.toString() + bishopY.toString()).classList.add('lit');
                    }
                }
            }
        }
        function three(bishop) {
            bishopX = bishop.x - 1;
            bishopY = bishop.y + 1;
    
            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(bishopX.toString() + bishopY.toString()).classList.add('lit');
                bishopX -= 1;
                bishopY += 1;
            }
            for (let i = 0; i < blues.length; i++) {
                if (blues[i].x === bishopX) {
                    if (blues[i].y === bishopY) {
                        document.getElementById(bishopX.toString() + bishopY.toString()).classList.add('lit');
                    }
                }
            }
        }
        function four(bishop) {
            bishopX = bishop.x - 1;
            bishopY = bishop.y - 1;
    
            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(bishopX.toString() + bishopY.toString()).classList.add('lit');
                bishopX -= 1;
                bishopY -= 1;
            }
            for (let i = 0; i < blues.length; i++) {
                if (blues[i].x === bishopX) {
                    if (blues[i].y === bishopY) {
                        document.getElementById(bishopX.toString() + bishopY.toString()).classList.add('lit');
                    }
                }
            }
        }
        one(bishop); two(bishop); three(bishop); four(bishop);
    }

    function rookLit(rook) { // MAKE SO CANNOT LIGHT OWN PIECE
        document.getElementById(rook.x.toString() + rook.y.toString()).classList.add('mainLit');

        function first(rook) {
            rookX = rook.x - 1;
    
            while(emptySpaces.includes(rookX.toString() + rook.y.toString())) {
                document.getElementById(rookX.toString() + rook.y.toString()).classList.add('lit');
                rookX -= 1;
            }
            if (blues.includes(rookX.toString() + rook.y.toString())) { document.getElementById(rookX.toString() + rook.y.toString()).classList.add('lit'); }
        }
        function second(rook) {
            rookX = rook.x + 1;
    
            while(emptySpaces.includes(rookX.toString() + rook.y.toString())) {
                document.getElementById(rookX.toString() + rook.y.toString()).classList.add('lit');
                rookX += 1;
            }
            if (blues.includes(rookX.toString() + rook.y.toString())) { document.getElementById(rookX.toString() + rook.y.toString()).classList.add('lit'); }
        }
        function third(rook) {
            rookY = rook.y - 1;
    
            while(emptySpaces.includes(xy)) {
                document.getElementById(rook.x.toString() + rookY.toString()).classList.add('lit');
                rookY -= 1;
            }
            if (blues.includes(rook.x.toString() + rookY.toString())) { document.getElementById(rook.x.toString() + rookY.toString()).classList.add('lit'); }
        }
        function fourth(rook) {
            rookY = rook.y + 1;
    
            while(emptySpaces.includes(rook.x.toString() + rookY.toString())) {
                document.getElementById(rook.x.toString() + rookY.toString()).classList.add('lit');
                rookY += 1;
            }
            if (blues.includes(rook.x.toString() + rookY.toString())) { document.getElementById(rook.x.toString() + rookY.toString()).classList.add('lit'); }
        }
        first(rook); second(rook); third(rook); fourth(rook);
    }

    function queenLit(queen) { bishopLit(queen); rookLit(queen); }

    function kingLit(king) {
        document.getElementById(king.x.toString() + king.y.toString()).classList.add('mainLit');

        function exclude(res1, res2) {
            return res1.filter(obj => { // obj --> each item in res1
              return !res2.some(obj2 => { // obj --> each item in res2
                return obj.x === obj2.x && obj.y === obj2.y
              }) // returns true if at least one doesn't match x & y
            });
        }

        kingSpaces = [
            {x: king.x - 1, y: king.y},
            {x: king.x - 1, y: king.y + 1},
            {x: king.x, y: king.y + 1},
            {x: king.x + 1, y: king.y + 1},
            {x: king.x + 1, y: king.y},
            {x: king.x + 1, y: king.y - 1},
            {x: king.x, y: king.y - 1},
            {x: king.x - 1, y: king.y - 1}
        ].map(space => { // keeps only on-board kingSpaces
            if (space.x >= 0 && space.x <= 7) {
                if (space.y <= 7 && space.y <= 7) { return space; }
            }
        }).filter(item => { return item !== undefined; });
        
        orangeKingSpacesUnderAttack = [];
        orangelessKingSpaces = exclude(kingSpaces, oranges); // open and own-side-held kingSpaces
        
        orangelessKingSpaces.forEach(kingSpace => {
            blues.forEach(bluePiece => {
                if (checkingSpace(bluePiece, kingSpace)) { orangeKingSpacesUnderAttack.push(kingSpace); }
            }); // checkingSpace returns true/false if orangePiece attacks kingSpace
        }); // array of blue pieces that attack a kingSpace

        orangeKingSpaces = exclude(orangelessKingSpaces, orangeKingSpacesUnderAttack);

        orangeKingSpaces.forEach(item => { 
            document.getElementById(item.x.toString() + item.y.toString()).classList.add('lit');
        });
    }

    for (let i = 0; i < oranges.length; i++) { // for each orange id, addEventListener --> click
        document.getElementById(oranges[i].x.toString() + oranges[i].y.toString()).addEventListener('click', function highlight() {
            switch (oranges[i].name) {
                case 'pawn': pawnLit(oranges[i]); break;
                case 'knight': knightLit(oranges[i]); break;
                case 'bishop': bishopLit(oranges[i]); break;
                case 'rook': rookLit(oranges[i]); break;
                case 'queen': queenLit(oranges[i]); break;
                case 'king': kingLit(oranges[i]); break;
            }
        });
    }
}
orangeLit();

// ALSO .removeEventListener() & .removeClass('lit) when user clicks any div lacking 'lit' class 

// if (document.getElementsByName('board').) {

// }

// var litSpaces = []; // ?

// document.getElementsByClassName('lit').addEventListener('click', function move() {
    // UPDATE x & y of original clicked piece to be the second clicked x & y
    // this.x;
    // Remove eaten piece from pieces, if occured & add to its DONE box
// });

// DO THE SAME FOR blueLit.js

