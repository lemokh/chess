function lit(activeSide, passiveSide) {
    litDivs = [];
    tempId = [];
    // function toggleClocks() {}

    function pawnLit(pawn) {
        console.log();
        litDivs = [];
        mainLitDiv = pawn.x.toString() + pawn.y.toString(); // clicked pawn
        tempId.push(mainLitDiv);

        // highlights clicked pawn
        document.getElementById(mainLitDiv).classList.add('mainLit');

        // highlights all possible moves for clicked piece --> WORKS!
        if (activeSide === blues) {
            takenBox = document.getElementsByTagName('takenBox1');
            passiveSide.forEach(item => { // highlights anywhere pawn can attack
                if (item.y === pawn.y - 1) {
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

            // if empty space one ahead of pawn, highlights it --> WORKS!
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
        else { // since activeSide === oranges... does the same
            takenBox = document.getElementsByTagName('takenBox2');
            passiveSide.forEach(item => { // highlights any spaces that pawn can attack
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
        } // WORKS!
        // MOVE() ======================================================================================== 
        // litDivs is an array of ids
        litDivs.forEach(item => { // if a litDiv is clicked, move that piece there
            document.getElementById(item).addEventListener( // item is an id
                'click',
                function move(e) { // moves piece and begins next turn
                    document.getElementById(tempId[0]).classList.remove('mainLit');
                    tempId = [];

                    litDivs.forEach(item => { // un-highlights all cells
                        document.getElementById(item).classList.remove('lit')
                    });

                    // function toggleNoClick() {
                    //     document.getElementsByClassName(
                    //         'noClick'
                    //     ).classList.remove('noClick');

                    //     activeSide.forEach(item => {
                    //         document.getElementById(
                    //             item.x.toString() + item.y.toString()
                    //         ).classList.add('noClick');
                    //     });
                    // }

                    // gets activeSide index1 for clicked mainLitDiv pawn 
                    index1 = activeSide.indexOf(pawn);

                    // gets passiveSide index2 for later removing piece from passiveSide 
                    for (let i = 0; i < passiveSide.length; i++) {
                        if (passiveSide[i].x.toString() + passiveSide[i].y.toString() === e.target.id) {
                            index2 = i;
                            break;
                        }
                    }

                    // console.log(activeSide[index]); // {x:_, y:_}
                    // console.log(mainLitDiv); // 01

                    // if piece is eaten, replace new child image with old child image
                    // remove old child from pieces array
                    // push old child image to proper takenBox div
                    if (document.getElementById(e.target.id).firstChild) { // WORKS!
                        document.getElementById(e.target.id).replaceChild(
                            document.getElementById(mainLitDiv).firstChild, // new child
                            document.getElementById(e.target.id).firstChild // old child
                        )
                        // updates 1st clicked x & y to be 2nd clicked x & y             
                        activeSide[index1].x = +e.target.id[0];
                        activeSide[index1].y = +e.target.id[1];

                        // updates 1st clicked id to be 2nd clicked id
                        document.getElementById(e.target.id).firstChild.id = e.target.id;

                        passiveSide.splice(index2, 1); // removes piece from passiveSide
                        pieces = [...oranges, ...blues]; // updates pieces

                        // adds that image to takenBox1/2 div
                        // WRITE THIS
                    }
                    // else {} // simply move image & update x,y 



                    // if (activeSide === blues) {
                    //     // toggleClocks();
                    //     // toggleNoClick();
                    //     lit(oranges, blues);
                    // }
                    // else {
                    //     // toggleClocks();
                    //     // toggleNoClick();
                    //     lit(blues, oranges);
                    // }
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
        block1 = false;
        block2 = false;
        block3 = false;
        block4 = false;
        block5 = false;
        block6 = false;
        block7 = false;
        block8 = false;
        litDivs = [];
        mainLitDiv = knight.x.toString() + knight.y.toString(); // clicked knight space
        tempId.push(mainLitDiv);

        // highlights clicked knight
        document.getElementById(mainLitDiv).classList.add('mainLit');

        // if own pieces occupy knight space, no highlight there
        activeSide.forEach(piece => {
            switch (piece.x) {
                case knight.x + 1:
                    if (piece.y === knight.y + 2) { block1 = true; break; }
                    if (piece.y === knight.y - 2) { block2 = true; break; }
                case knight.x - 1:
                    if (piece.y === knight.y + 2) { block3 = true; break; }
                    if (piece.y === knight.y - 2) { block4 = true; break; }
                case knight.x + 2:
                    if (piece.y === knight.y + 1) { block5 = true; break; }
                    if (piece.y === knight.y - 1) { block6 = true; break; }
                case knight.x - 2:
                    if (piece.y === knight.y + 1) { block7 = true; break; }
                    if (piece.y === knight.y - 1) { block8 = true; break; }
            }
        });

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
        tempId.push(mainLitDiv);

        // highlights clicked space
        document.getElementById(mainLitDiv).classList.add('mainLit');

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
                if (passiveSide[i].x === bishopX) {
                    if (passiveSide[i].y === bishopY) {
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
                if (passiveSide[i].x === bishopX) {
                    if (passiveSide[i].y === bishopY) {
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
                if (passiveSide[i].x === bishopX) {
                    if (passiveSide[i].y === bishopY) {
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
                if (passiveSide[i].x === bishopX) {
                    if (passiveSide[i].y === bishopY) {
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

    function rookLit(rook) {
        // litDivs = [];
        mainLitDiv = rook.x.toString() + rook.y.toString(); // clicked rook
        tempId.push(mainLitDiv);

        // highlights clicked rook
        document.getElementById(mainLitDiv).classList.add('mainLit');

        function first(rook) {
            rookX = rook.x - 1;

            while (emptySpaces.includes(rookX.toString() + rook.y.toString())) {
                document.getElementById(
                    rookX.toString() + rook.y.toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.y.toString());

                rookX -= 1;
            }
            if (passiveSide.includes(rookX.toString() + rook.y.toString())) {
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
            if (passiveSide.includes(rookX.toString() + rook.y.toString())) {
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
            if (passiveSide.includes(rook.x.toString() + rookY.toString())) {
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
            if (passiveSide.includes(rook.x.toString() + rookY.toString())) {
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
        tempId.push(mainLitDiv);

        // highlights clicked king
        document.getElementById(mainLitDiv).classList.add('mainLit');

        function exclude(res1, res2) {
            return res1.filter(obj => { // obj --> each item in res1
                return !res2.some(obj2 => { // obj --> each item in res2
                    return obj.x === obj2.x && obj.y === obj2.y
                }) // returns true if at least one doesn't match x & y
            });
        } // excludes res2 from res1

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

        openAndOpponentHeldKingSpaces = exclude(kingSpaces, activeSide); // [{x:_, y:_}]

        openAndOpponentHeldKingSpaces.forEach(space => {
            passiveSide.forEach(piece => {
                if (checkingSpace(piece, space, passiveSide)) {
                    kingSpacesUnderAttack.push(space);
                }
            }); // checkingSpace returns true/false if piece attacks space
        }); // array of pieces that attack a kingSpace

        kingSpaces = exclude(openAndOpponentHeldKingSpaces, kingSpacesUnderAttack);

        kingSpaces.forEach(item => {
            document.getElementById(
                item.x.toString() + item.y.toString()
            ).classList.add('lit');
            litDivs.push(item.x.toString() + item.y.toString());
        });
    } // ends kingLit()

    activeSide.forEach(piece => { // adds click-listeners to activeSide
        document.getElementById(
            piece.x.toString() + piece.y.toString()
        ).addEventListener(
            'click',
            function highlight() { // on-click of activeSide piece
                if (tempId.length > 0) { // un-highlights all cells
                    document.getElementById(tempId[0]).classList.remove('mainLit');
                    tempId = [];
                    litDivs.forEach(item => {
                        document.getElementById(item).classList.remove('lit');
                    });
                } // console.log(litDivs);
                switch (piece.name) { // highlights possible piece moves
                    case 'pawn':
                        pawnLit(piece);
                        break;
                    case 'knight':
                        knightLit(piece);
                        break;
                    case 'bishop':
                        bishopLit(piece);
                        break;
                    case 'rook':
                        rookLit(piece);
                        break;
                    case 'queen':
                        queenLit(piece);
                        break;
                    case 'king':
                        kingLit(piece);
                        break;
                }
            }
        );
        // UPDATE x && y of original clicked piece to be the second clicked x & y
        // board.classList.remove() and board.removeEventListener()
        // if piece eaten, remove that piece from pieces array & push to proper DONE box

        // }
    });
}
// lit(oranges, blues);
lit(blues, oranges);
