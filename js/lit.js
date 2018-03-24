function lit(activeSide, opponentSide) {
    litDivs = [];
    tempId = [];
    // function toggleClocks() {}

    function pawnLit(pawn) {
        litDivs = [];
        mainLitDiv = pawn.x.toString() + pawn.y.toString(); // clicked pawn
        tempId.push( mainLitDiv );

        // highlights clicked pawn
        document.getElementById( mainLitDiv ).classList.add('mainLit');

        // highlights all possible moves for clicked piece
        if (activeSide === blues) {
            opponentSide.forEach(item => { // highlights anywhere pawn can attack
                if (item.y === pawn.y - 1) {
                    if (item.x === pawn.x + 1) {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('lit');
                        litDivs.push( item.x.toString() + item.y.toString() );
                    }
                    if (item.x === pawn.x - 1) {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('lit');
                        litDivs.push( item.x.toString() + item.y.toString() );
                    }
                }
            });

            // if empty space one ahead of pawn, highlights it
            if (emptySpaces.includes(pawn.x.toString() + (pawn.y - 1).toString())) {    
                document.getElementById(
                    pawn.x.toString() + (pawn.y - 1).toString()
                ).classList.add('lit');
                litDivs.push(pawn.x.toString() + (pawn.y - 1).toString());

                if (pawn.y === 6) { // if empty space two ahead of pawn, highlights it
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
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('lit');
                        litDivs.push(item.x.toString() + item.y.toString());
                    }
                    if (item.x === pawn.x - 1) {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('lit');
                        litDivs.push(item.x.toString() + item.y.toString());
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
        // MOVE() ======================================================================================== 
        litDivs.forEach(item => { // if any litDiv is clicked, move piece there 
            document.getElementById(item).addEventListener('click', function move(e) { // moves piece and begins next turn
                // if (tempId.length > 0) { // un-highlights all cells after first click
                    document.getElementById(tempId[0]).classList.remove('mainLit');
                    tempId = [];
                    litDivs.forEach(item => {document.getElementById(item).classList.remove('lit')});
                // }
                index = pieces.indexOf(pawn);
                console.log(pieces[index]);
                
                // update piece x & y                
                tempXY = e.target.id.split("");
                pieces[index].x = +tempXY[0];
                pieces[index].y = +tempXY[1];

                // remove image from mainDiv
                document.getElementById(img.id).removeChild(img);

                // if new cell id has image, 
                // remove that object from pieces & add that image to takenBox1/2 div
                console.log(document.getElementById(img.id).hasAttribute('image'));

                if (document.getElementById(img.id).hasAttribute('image')) {

                }

                // add image to new cell
                img.src = pieces[index].image;
                img.id = pieces[index].x.toString() + pieces[index].y.toString();
                document.getElementById(img.id).appendChild(img);

                console.log(pieces[index]);
                
    // UPDATE x && y of original clicked piece to equal the second clicked x & y
    // board.classList.remove() and board.removeEventListener() ??
    // if piece eaten, remove that piece from pieces array & push to proper doneBox div

                if (activeSide === blues) { 
                    // toggleClocks();
                    lit(oranges, blues); 
                }
                else {
                    // toggleClocks();
                    lit(blues, oranges); 
                }
            });
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
    //========================================================================================
    // activeCells = activeSide.map(item => {
    //     return item.x.toString() + item.y.toString();
    // });
    // function excludes(arr1, arr2) {
    //     return arr1.filter(cell => {
    //         return !arr2.some(piece => {
    //             return cell === piece;
    //         });
    //     });
    // }
    // unLitDivs = excludes(activeCells, litDivs);
    
    function knightLit(knight) {
        litDivs = [];
        mainLitDiv = knight.x.toString() + knight.y.toString(); // clicked knight space
        tempId.push( mainLitDiv );

        // highlights clicked knight
        document.getElementById( mainLitDiv ).classList.add('mainLit');
        
         // if own pieces occupy knight space, no highlight there
        for (let i = 0; i < activeSide.length; i++) {
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
        litDivs = [];
        mainLitDiv = bishop.x.toString() + bishop.y.toString(); // clicked bishop space
        tempId.push( mainLitDiv );

        // highlights clicked space
        document.getElementById( mainLitDiv ).classList.add('mainLit');

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
        litDivs = [];
        mainLitDiv = rook.x.toString() + rook.y.toString(); // clicked rook
        tempId.push( mainLitDiv );

        // highlights clicked rook
        document.getElementById( mainLitDiv ).classList.add('mainLit');

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
        litDivs = [];
        mainLitDiv = king.x.toString() + king.y.toString(); // clicked king
        tempId.push( mainLitDiv );

        // highlights clicked king
        document.getElementById( mainLitDiv ).classList.add('mainLit');

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
        ).addEventListener('click', function highlight() {
            if (tempId.length > 0) { // un-highlights all cells after first click
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
}
lit(oranges, blues);
// lit(blues, oranges);
