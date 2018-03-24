function lit(activeSide, opponentSide) {
    litDivs = [];
    tempId = [];
    // function toggleClocks() {}

    function pawnLit(pawn) { // mainLitDiv is the clicked pawn space
        litDivs = [];
        mainLitDiv = pawn.x.toString() + pawn.y.toString();
        tempId.push( mainLitDiv );

        // highlights clicked space
        document.getElementById( mainLitDiv ).classList.add('mainLit');

        if (activeSide === blues) {
            opponentSide.forEach(item => { // highlights any spaces that can pawn attack
                if (item.y === pawn.y - 1) {
                    if (item.x === pawn.x + 1) {
                        document.getElementById( mainLitDiv ).classList.add('lit');
                        litDivs.push( mainLitDiv );
                    }
                    if (item.x === pawn.x - 1) {
                        document.getElementById( mainLitDiv ).classList.add('lit');
                        litDivs.push(mainLitDiv);
                    }
                }
            });

            // if empty space one ahead of pawn, highlight it
            if (emptySpaces.includes(pawn.x.toString() + (pawn.y - 1).toString())) {    
                document.getElementById(
                    pawn.x.toString() + (pawn.y - 1).toString()
                ).classList.add('lit');
                litDivs.push(pawn.x.toString() + (pawn.y - 1).toString());

                if (pawn.y === 6) { // if empty space two ahead of pawn, highlight it
                    if (emptySpaces.includes(pawn.x.toString() + (pawn.y - 2).toString())) {
                        document.getElementById(
                            pawn.x.toString() + (pawn.y - 2).toString()
                        ).classList.add('lit');
                        litDivs.push(pawn.x.toString() + (pawn.y - 2).toString());
                    }
                }
            }
        } 
        else { // since activeSide === oranges...
            opponentSide.forEach(item => { // highlights any spaces that pawn can attack
                if (item.y === pawn.y + 1) {
                    if (item.x === pawn.x + 1) {
                        document.getElementById( mainLitDiv ).classList.add('lit');
                        litDivs.push(mainLitDiv);
                    }
                    if (item.x === pawn.x - 1) {
                        document.getElementById( mainLitDiv ).classList.add('lit');
                        litDivs.push(mainLitDiv);
                    }
                }
            });
            // if empty space one ahead of pawn, highlight it
            if (emptySpaces.includes(pawn.x.toString() + (pawn.y + 1).toString())) {
                document.getElementById(
                    pawn.x.toString() + (pawn.y + 1).toString()
                ).classList.add('lit');
                litDivs.push(pawn.x.toString() + (pawn.y + 1).toString());

                if (pawn.y === 1) { // if empty space two ahead of pawn, highlight it
                    if (emptySpaces.includes(pawn.x.toString() + (pawn.y + 2).toString())) {
                        document.getElementById(
                            pawn.x.toString() + (pawn.y + 2).toString()
                        ).classList.add('lit');
                        litDivs.push(pawn.x.toString() + (pawn.y + 2).toString());
                    }
                }
            }
        }
//========================================================================================
        // activeCells = activeSide.map(item => {
        //     return item.x.toString() + item.y.toString();
        // });
        // function exclude(arr1, arr2) {
        //     return arr1.filter(cell => {
        //         return !arr2.some(piece => {
        //             return cell === piece;
        //         });
        //     });
        // }
        // unLitDivs = exclude(activeCells, litDivs);
//========================================================================================        
        // MOVE()
        litDivs.forEach(item => { // if any litDiv is clicked, move piece there 
            document.getElementById(item).addEventListener( 'click', function move(e) { // moves piece and begins next turn
                // unLit(); // MIGHT NOT NEED THIS HERE!
                
                console.log(e.target.id); // this works!
        
                // move piece
                // temp = this.id.split();
                // activeSide.x === temp[0];
                // activeSide.y === temp[1];
                
                // if (activeSide === blues) { lit(oranges, blues); }
                // else { lit(blues, oranges); }
                
                // toggleClocks();
            } );
        });
    } 
    // ENPASSANT
    // activeSide.forEach(item => { // if this pawn moves there
    //   if (item.name === 'pawn') {
    //     if (item.y === 3) {
    //       if (item.x === pawn.x + 1 || item.x === pawn.x - 1) {
    //         enPassant = pawn; // eatable on next move by either blue pawn
    //       }
    //     }
    //   }
    // });

    function knightLit(knight) {
        mainLitDiv = knight.x.toString() + knight.y.toString();

        document.getElementById(mainLitDiv).classList.add('mainLit');

        for (let i = 0; i < activeSide.length; i++) { // any own pieces occupy knight space?
            if (activeSide[i].x === knight.x + 1) {
                if (activeSide[i].y === knight.y + 2) { block1 = true; break; }
                if (activeSide[i].y === knight.y - 2) { block2 = true; break; }

            }
            if (activeSide[i].x === knight.x - 1) {
                if (activeSide[i].y === knight.y + 2) { block3 = true; break; }
                if (activeSide[i].y === knight.y - 2) { block4 = true; break; }
            }
            if (activeSide[i].x === knight.x + 2) {
                if (activeSide[i].y === knight.y + 1) { block5 = true; break; }
                if (activeSide[i].y === knight.y - 1) { block6 = true; break; }

            }
            if (activeSide[i].x === knight.x - 2) {
                if (activeSide[i].y === knight.y + 1) { block7 = true; break; }
                if (activeSide[i].y === knight.y - 1) { block8 = true; break; }
            }
        }

        if (!block1) {
            if (knight.x + 1 < 8) { // FILTERS OUT OFF-BOARD KNIGHT MOVES
                if (knight.y + 2 < 8) {
                    document.getElementById(
                        (knight.x + 1).toString() + (knight.y + 2).toString()
                    ).classList.add('lit');
                    litDivs.push((knight.x + 1).toString() + (knight.y + 2).toString());
                }
            }
        }
        if (!block2) {
            if (knight.x + 1 < 8) {
                if (knight.y - 2 >= 0) {
                    document.getElementById(
                        (knight.x + 1).toString() + (knight.y - 2).toString()
                    ).classList.add('lit');
                    litDivs.push((knight.x + 1).toString() + (knight.y - 2).toString());
                }
            }
        }
        if (!block3) {
            if (knight.x - 1 >= 0) {
                if (knight.y + 2 < 8) {
                    document.getElementById(
                        (knight.x - 1).toString() + (knight.y + 2).toString()
                    ).classList.add('lit');
                    litDivs.push((knight.x - 1).toString() + (knight.y + 2).toString());
                }
            }
        }
        if (!block4) {
            if (knight.x - 1 >= 0) {
                if (knight.y - 2 >= 0) {
                    document.getElementById(
                        (knight.x - 1).toString() + (knight.y - 2).toString()
                    ).classList.add('lit');
                    litDivs.push((knight.x - 1).toString() + (knight.y - 2).toString());
                }
            }
        }
        if (!block5) {
            if (knight.x + 2 < 8) {
                if (knight.y + 1 < 8) {
                    document.getElementById(
                        (knight.x + 2).toString() + (knight.y + 1).toString()
                    ).classList.add('lit');
                    litDivs.push((knight.x + 2).toString() + (knight.y + 1).toString());
                }
            }
        }
        if (!block6) {
            if (knight.x + 2 < 8) {
                if (knight.y - 1 >= 0) {
                    document.getElementById(
                        (knight.x + 2).toString() + (knight.y - 1).toString()
                    ).classList.add('lit');
                    litDivs.push((knight.x + 2).toString() + (knight.y - 1).toString());
                }
            }
        }
        if (!block7) {
            if (knight.x - 2 >= 0) {
                if (knight.y + 1 < 8) {
                    document.getElementById(
                        (knight.x - 2).toString() + (knight.y + 1).toString()
                    ).classList.add('lit');
                    litDivs.push((knight.x - 2).toString() + (knight.y + 1).toString());
                }
            }
        }
        if (!block8) {
            if (knight.x - 2 >= 0) {
                if (knight.y - 1 >= 0) {
                    document.getElementById(
                        (knight.x - 2).toString() + (knight.y - 1).toString()
                    ).classList.add('lit');
                    litDivs.push((knight.x - 2).toString() + (knight.y - 1).toString());
                }
            }
        }
    }

    function bishopLit(bishop) {
        document.getElementById(
            bishop.x.toString() + bishop.y.toString()
        ).classList.add('mainLit');
        mainLitDiv = bishop.x.toString() + bishop.y.toString();

        function one(bishop) {
            bishopX = bishop.x + 1;
            bishopY = bishop.y + 1;

            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) { // while bishop's path is an empty space
                document.getElementById(
                    bishopX.toString() + bishopY.toString()
                ).classList.add('lit');
                litDivs.push(bishopX.toString() + bishopY.toString());

                bishopX += 1;
                bishopY += 1;
            }
            for (let i = 0; i < activeSide.length; i++) {
                if (opponentSide[i].x === bishopX) {
                    if (opponentSide[i].y === bishopY) {
                        document.getElementById(
                            bishopX.toString() + bishopY.toString()
                        ).classList.add('lit');
                        litDivs.push(bishopX.toString() + bishopY.toString());
                    }
                }
            }
        }

        function two(bishop) {
            bishopX = bishop.x + 1;
            bishopY = bishop.y - 1;

            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(
                    bishopX.toString() + bishopY.toString()
                ).classList.add('lit');
                litDivs.push(bishopX.toString() + bishopY.toString());

                bishopX += 1;
                bishopY -= 1;
            }
            for (let i = 0; i < activeSide.length; i++) {
                if (opponentSide[i].x === bishopX) {
                    if (opponentSide[i].y === bishopY) {
                        document.getElementById(
                            bishopX.toString() + bishopY.toString()
                        ).classList.add('lit');
                        litDivs.push(bishopX.toString() + bishopY.toString());
                    }
                }
            }
        }

        function three(bishop) {
            bishopX = bishop.x - 1;
            bishopY = bishop.y + 1;

            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(
                    bishopX.toString() + bishopY.toString()
                ).classList.add('lit');
                litDivs.push(bishopX.toString() + bishopY.toString());

                bishopX -= 1;
                bishopY += 1;
            }
            for (let i = 0; i < activeSide.length; i++) {
                if (opponentSide[i].x === bishopX) {
                    if (opponentSide[i].y === bishopY) {
                        document.getElementById(
                            bishopX.toString() + bishopY.toString()
                        ).classList.add('lit');
                        litDivs.push(bishopX.toString() + bishopY.toString());
                    }
                }
            }
        }

        function four(bishop) {
            bishopX = bishop.x - 1;
            bishopY = bishop.y - 1;

            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(
                    bishopX.toString() + bishopY.toString()
                ).classList.add('lit');
                litDivs.push(bishopX.toString() + bishopY.toString());

                bishopX -= 1;
                bishopY -= 1;
            }
            for (let i = 0; i < activeSide.length; i++) {
                if (opponentSide[i].x === bishopX) {
                    if (opponentSide[i].y === bishopY) {
                        document.getElementById(
                            bishopX.toString() + bishopY.toString()
                        ).classList.add('lit');
                        litDivs.push(bishopX.toString() + bishopY.toString());
                    }
                }
            }
        }
        one(bishop);
        two(bishop);
        three(bishop);
        four(bishop);
    }

    function rookLit(rook) { // MAKE SO CANNOT LIGHT OWN PIECE
        document.getElementById(
            rook.x.toString() + rook.y.toString()
        ).classList.add('mainLit');
        mainLitDiv = rook.x.toString() + rook.y.toString();

        function first(rook) {
            rookX = rook.x - 1;

            while (emptySpaces.includes(rookX.toString() + rook.y.toString())) {
                document.getElementById(
                    rookX.toString() + rook.y.toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.y.toString());

                rookX -= 1;
            }
            if (opponentSide.includes(rookX.toString() + rook.y.toString())) {
                document.getElementById(
                    rookX.toString() + rook.y.toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.y.toString());
            }
        }

        function second(rook) {
            rookX = rook.x + 1;

            while (emptySpaces.includes(rookX.toString() + rook.y.toString())) {
                document.getElementById(
                    rookX.toString() + rook.y.toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.y.toString());

                rookX += 1;
            }
            if (opponentSide.includes(rookX.toString() + rook.y.toString())) {
                document.getElementById(
                    rookX.toString() + rook.y.toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.y.toString());
            }
        }

        function third(rook) {
            rookY = rook.y - 1;

            while (emptySpaces.includes(rook.x.toString() + rookY.toString())) {
                document.getElementById(
                    rook.x.toString() + rookY.toString()
                ).classList.add('lit');
                litDivs.push(rook.x.toString() + rookY.toString());

                rookY -= 1;
            }
            if (opponentSide.includes(rook.x.toString() + rookY.toString())) {
                document.getElementById(
                    rook.x.toString() + rookY.toString()
                ).classList.add('lit');
                litDivs.push(rook.x.toString() + rookY.toString());
            }
        }

        function fourth(rook) {
            rookY = rook.y + 1;

            while (emptySpaces.includes(rook.x.toString() + rookY.toString())) {
                document.getElementById(
                    rook.x.toString() + rookY.toString()
                ).classList.add('lit');
                litDivs.push(rook.x.toString() + rookY.toString());

                rookY += 1;
            }
            if (opponentSide.includes(rook.x.toString() + rookY.toString())) {
                document.getElementById(
                    rook.x.toString() + rookY.toString()
                ).classList.add('lit');
                litDivs.push(rook.x.toString() + rookY.toString());
            }
        }
        first(rook);
        second(rook);
        third(rook);
        fourth(rook);
    }

    function queenLit(queen) {
        bishopLit(queen);
        rookLit(queen);
    }

    function kingLit(king) {
        document.getElementById(
            king.x.toString() + king.y.toString()
        ).classList.add('mainLit');
        
        mainLitDiv = king.x.toString() + king.y.toString();

        function exclude(res1, res2) {
            return res1.filter(obj => { // obj --> each item in res1
                return !res2.some(obj2 => { // obj --> each item in res2
                    return obj.x === obj2.x && obj.y === obj2.y
                }) // returns true if at least one doesn't match x & y
            });
        }

        kingSpaces = [
            { x: king.x - 1, y: king.y },
            { x: king.x - 1, y: king.y + 1 },
            { x: king.x, y: king.y + 1 },
            { x: king.x + 1, y: king.y + 1 },
            { x: king.x + 1, y: king.y },
            { x: king.x + 1, y: king.y - 1 },
            { x: king.x, y: king.y - 1 },
            { x: king.x - 1, y: king.y - 1 }
        ].map(space => { // keeps only on-board kingSpaces
            if (space.x >= 0 && space.x <= 7) {
                if (space.y <= 7 && space.y <= 7) { return space; }
            }
        }).filter(item => { return item !== undefined; });

        kingSpacesUnderAttack = [];
        activeSideLessKingSpaces = exclude(kingSpaces, activeSide); // open and own-side-held kingSpaces

        activeSideLessKingSpaces.forEach(kingSpace => {
            opponentSide.forEach(opponentPiece => {
                if (checkingSpace(opponentPiece, kingSpace)) {
                    kingSpacesUnderAttack.push(kingSpace);
                }
            }); // checkingSpace returns true/false if orangePiece attacks kingSpace
        }); // array of blue pieces that attack a kingSpace

        kingSpaces = exclude(activeSideLessKingSpaces, kingSpacesUnderAttack);

        kingSpaces.forEach(item => {
            document.getElementById(
                item.x.toString() + item.y.toString()
            ).classList.add('lit');
            litDivs.push(item.x.toString() + item.y.toString());
        });
    }

    for (let i = 0; i < activeSide.length; i++) {
        document.getElementById(
            activeSide[i].x.toString() + activeSide[i].y.toString()
        ).addEventListener('click', function highlight(e) {
            if (tempId.length > 0) { // un-highlights all cells
                document.getElementById(tempId[0]).classList.remove('mainLit');
                tempId = [];
                litDivs.forEach( item => document.getElementById(item).classList.remove('lit') );
            }
            switch (activeSide[i].name) {
                case 'pawn':
                    pawnLit(activeSide[i]);
                    break;
                case 'knight':
                    knightLit(activeSide[i]);
                    break;
                case 'bishop':
                    bishopLit(activeSide[i]);
                    break;
                case 'rook':
                    rookLit(activeSide[i]);
                    break;
                case 'queen':
                    queenLit(activeSide[i]);
                    break;
                case 'king':
                    kingLit(activeSide[i]);
                    break;
            }
        });
        // document.getElementById(this.id).classList.contains('lit')) {
        // function move();
        // UPDATE x && y of original clicked piece to be the second clicked x & y
        // board.classList.remove() and board.removeEventListener()
        // if piece eaten, remove that piece from pieces array & push to proper DONE box

        // }
    }

    // document.getElementsByClassName('lit').addEventListener('click', function move() {    
    // UPDATE x && y of original clicked piece to be the second clicked x & y
    // board.classList.remove() and board.removeEventListener()
    // if piece eaten, remove that piece from pieces array & push to proper DONE box
    // });
}
lit(oranges, blues);
// lit(blues, oranges);
