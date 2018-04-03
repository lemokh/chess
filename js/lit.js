function lit(activeSide, passiveSide) {
    litDivs = [];
    tempId = [];
    // function toggleClocks() {}

    function pawnLit(pawn) {
        // console.log(pawn);
        litDivs = [];
        mainLitDiv = pawn.id; // clicked pawn id
        tempId.push(mainLitDiv);

        // highlights clicked pawn
        document.getElementById(mainLitDiv).classList.add('mainLit');

        // highlights all possible moves for clicked piece --> WORKS!
        if (activeSide === blues) {
            takenBox = document.getElementsByTagName('takenBox1');
            passiveSide.forEach(item => { // highlights anywhere pawn can attack
                // console.log(pawn.dataset.y);
                if (item.y === pawn.dataset.y - 1) {
                    if (item.x === pawn.dataset.x + 1) {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('lit');
                        litDivs.push(item.x.toString() + item.y.toString());
                    }
                    if (item.x === pawn.dataset.x - 1) {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('lit');
                        litDivs.push(item.x.toString() + item.y.toString());
                    }
                }
            });

            // if empty space one ahead of pawn, highlights it --> WORKS!
            if (emptySpaces.includes(pawn.dataset.x.toString() + (pawn.dataset.y - 1).toString())) {
                document.getElementById(
                    pawn.dataset.x.toString() + (pawn.dataset.y - 1).toString()
                ).classList.add('lit');
                litDivs.push(pawn.dataset.x.toString() + (pawn.dataset.y - 1).toString());

                if (pawn.dataset.y === 6) { // if empty space two ahead of pawn, highlights it
                    if (emptySpaces.includes(pawn.dataset.x.toString() + (pawn.dataset.y - 2).toString())) {
                        document.getElementById(
                            pawn.dataset.x.toString() + (pawn.dataset.y - 2).toString()
                        ).classList.add('lit');
                        litDivs.push(pawn.dataset.x.toString() + (pawn.dataset.y - 2).toString());
                    }
                }
            }
        }
        else { // since activeSide === oranges... does the same
            takenBox = document.getElementsByTagName('takenBox2');
            passiveSide.forEach(item => { // highlights any spaces that pawn can attack
                if (item.y === pawn.dataset.y + 1) {
                    if (item.x === pawn.dataset.x + 1) {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('lit');
                        litDivs.push(item.x.toString() + item.y.toString());
                    }
                    if (item.x === pawn.dataset.x - 1) {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('lit');
                        litDivs.push(item.x.toString() + item.y.toString());
                    }
                }
            });
            // if empty space one ahead of pawn, highlight it
            if (emptySpaces.includes(pawn.dataset.dataset.x.toString() + (pawn.dataset.y + 1).toString())) {
                document.getElementById(
                    pawn.dataset.x.toString() + (pawn.dataset.y + 1).toString()
                ).classList.add('lit');
                litDivs.push(pawn.dataset.x.toString() + (pawn.dataset.y + 1).toString());

                if (pawn.dataset.y === 1) { // if empty space two ahead of pawn, highlight it
                    if (emptySpaces.includes(pawn.dataset.x.toString() + (pawn.dataset.y + 2).toString())) {
                        document.getElementById(
                            pawn.dataset.x.toString() + (pawn.dataset.y + 2).toString()
                        ).classList.add('lit');
                        litDivs.push(pawn.dataset.x.toString() + (pawn.dataset.y + 2).toString());
                    }
                }
            }
        } // WORKS!
        // MOVE() ======================================================================================== 
        // litDivs is an array of ids
        // console.log(litDivs);
        litDivs.forEach(item => { // if a litDiv is clicked, move that piece there
            document.getElementById(item).addEventListener( // item is an id
                'click',
                function move(e) { // moves piece // and begins next turn
                    document.getElementById(tempId[0]).classList.remove('mainLit');
                    tempId = [];

                    console.log(pawn.src);
                    // console.log(document.getElementById(mainLitDiv));

                    litDivs.forEach(item => { // un-highlights all cells
                        document.getElementById(item).classList.remove('lit')
                    });

                    // gets activeSide index1 for clicked mainLitDiv pawn 

                    index1 = activeSide.indexOf({
                        side: pawn.dataset.side;
                        name: pawn.name,
                        x: pawn.dataset.x,
                        y: pawn.dataset.y,
                        image: pawn.src,
                    }); // pawn === e.target

                    console.log(index1);

                    // gets passiveSide index2 for later removing piece from passiveSide 
                    for (let i = 0; i < passiveSide.length; i++) {
                        if (passiveSide[i].x.toString() + passiveSide[i].y.toString() === pawn.id) {
                            index2 = i;
                            break;
                        }
                    }

                    // if a piece is eaten, replace that piece's (old child) image
                    // with new child (pawn) image & remove old child from pieces array

                    if (document.getElementById(e.target.id).firstChild) {

                        document.getElementById(e.target.id).replaceChild(
                            document.getElementById(mainLitDiv).firstChild, // new child
                            document.getElementById(e.target.id).firstChild // old child
                        );
                        passiveSide.splice(index2, 1); // removes eaten piece from passiveSide

                        // pushes old child (eaten piece) image to its takenBox div

                    }
                    else {
                        document.getElementById(e.target.id).appendChild(
                            document.getElementById(mainLitDiv).firstChild
                        );
                    } // moves pawn forward

                    // console.log(activeSide[index1]);
                    // updates 1st clicked x&y to be 2nd clicked x&y             
                    activeSide[index1].x = +e.target.id[0];
                    activeSide[index1].y = +e.target.id[1];

                    // updates 1st clicked id to be 2nd clicked id
                    document.getElementById(e.target.id).firstChild.id = e.target.id;

                    pieces = [...oranges, ...blues]; // updates pieces

                    // removes click listener from 1st clicked div and add to 2nd clicked div

                    activeSide.forEach(piece => { // removes click-listeners to activeSide
                        document.getElementById(
                            piece.x.toString() + piece.y.toString()
                        ).removeEventListener('click', pieceLit);
                    });

                    // document.getElementById(mainLitDiv).removeEventListener('click', pieceLit, false);
                    console.log('removed');
                    // document.getElementById(e.target.id).addEventListener('click', pieceLit);
                });
        });
    }

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

    function pieceLit(e) { // on-click of activeSide piece
        // console.log(e.target);

        if (tempId.length > 0) { // un-highlights all cells
            document.getElementById(tempId[0]).classList.remove('mainLit');
            tempId = [];
            litDivs.forEach(item => {
                document.getElementById(item).classList.remove('lit');
            });
        } // WORKS!

        switch (e.target.name) { // highlights possible piece moves
            case 'pawn':
                pawnLit(e.target);
                break;
            case 'knight':
                knightLit(e.target);
                break;
            case 'bishop':
                bishopLit(e.target);
                break;
            case 'rook':
                rookLit(e.target);
                break;
            case 'queen':
                queenLit(e.target);
                break;
            case 'king':
                kingLit(e.target);
                break;
        }
    }

    activeSide.forEach(piece => { // adds click-listeners to activeSide
        document.getElementById(
            piece.x.toString() + piece.y.toString()
        ).addEventListener('click', pieceLit);
    });


}
// lit(oranges, blues);
lit(blues, oranges);

/*
var theParent = document.getElementById("parent");

theParent.addEventListener("click", doSomething, false);
 
function doSomething(e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;
        alert("Hello " + clickedItem); // --> 'Hello parent'
    }
    e.stopPropagation();
}
*/
