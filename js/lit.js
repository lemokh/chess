function lit(activeSide, passiveSide) {
    litDivs = []; // holds lit ids on which to apply click-listeners
    tempId = []; // for un-highlighting all cells on clicking new piece
    emptySpaces = openSpaces(boardIds, pieces); // updates emptySpaces
    //========================================================================================
    // function toggleClocks() {}
    //========================================================================================
    function enPassant (pawnMovesHere) {
        // pawnMovesHere === e.target
        console.log('enPassant()');
        // resets clicked enPassant cell info
        enPassantables = [];
        enPassantCell = '';

        // puts enPassantCell in its takenBox
        if (activeSide === blues) {
            enPassantedPawn = document.getElementById(
                pawnMovesHere.id[0] + (+pawnMovesHere.id[1] + 1)
            );

            document.getElementById(
                blueTakenBoxIdCounter.toString()
            ).src = enPassantedPawn.src;

            blueTakenBoxIdCounter -= 1;

            enPassantedPawn.classList.remove('orange');
            pawnMovesHere.classList.add('blue');
            pawn.classList.remove('blue');
        }
        else { // since orange turn
            enPassantedPawn = document.getElementById(
                pawnMovesHere.id[0] + (+pawnMovesHere.id[1] - 1)
            );

            document.getElementById(
                orangeTakenBoxIdCounter.toString()
            ).src = enPassantedPawn.src;

            orangeTakenBoxIdCounter -= 1;

            enPassantedPawn.classList.remove('blue');
            pawnMovesHere.classList.add('orange');
            pawn.classList.remove('orange');
        }
        enPassantedPawn.src = './images/transparent.png';
        enPassantedPawn.name = '';
        passiveSide.splice(passiveSide.indexOf(enPassantedPawn), 1);
        pieces = [...oranges, ...blues];
        enPassantedPawn = undefined;
    }
    //========================================================================================
    function movePiece(e) {       
        // updates pieceToMove's info to e.target's cell 
        // if piece is eaten...
        if (e.target.name !== '') {
            console.log('piece eaten');
             // if enPassantCell clicked --> en passant attack
            if (e.target.id === enPassantCell) { enPassant(e.target); }
            // pushes eaten piece's image to its takenBox div
            else if (e.target.classList.contains('blue')) {
                document.getElementById(
                    orangeTakenBoxIdCounter.toString()
                ).src = e.target.src;
                orangeTakenBoxIdCounter -= 1;
            }
            else {
                document.getElementById(
                    blueTakenBoxIdCounter.toString()
                ).src = e.target.src;
                blueTakenBoxIdCounter -= 1;
            }
            // updates class sides
            if (blues.includes(pieceToMove)) { // if pieceToMove is blue... 
                e.target.classList.remove('orange');
                e.target.classList.add('blue');
                pieceToMove.classList.remove('blue');
            }
            else { // since pieceToMove is orange...
                e.target.classList.remove('blue');
                e.target.classList.add('orange');
                pieceToMove.classList.remove('orange');
            }
            // gets index for clicked space
            index2 = passiveSide.indexOf(e.target);
            // removes eaten piece from passiveSide array
            passiveSide.splice(index2, 1);

        }
        else { // since no piece is eaten --> e.target.name === ''
            if (blues.includes(pieceToMove)) { // if pieceToMove is blue
                e.target.classList.add('blue');
                pieceToMove.classList.remove('blue');
                // e.target.classList.remove('orange');
            }
            else { // updates classList for pieceToMove & e.target
                e.target.classList.add('orange');
                pieceToMove.classList.remove('orange');
                // e.target.classList.remove('blue');
            }
        }

        // updates pieceToMove's new & old space name
        e.target.name = pieceToMove.name;
        pieceToMove.name = '';

        // updates bishop's new & old space image
        e.target.src = pieceToMove.src;
        pieceToMove.src = './images/transparent.png';

        // gets index for clicked bishop
        index1 = activeSide.indexOf(pieceToMove);
        // removes vacated space from activeSide array         
        activeSide.splice(index1, 1);

        // updates activeSide & pieces array
        activeSide.push(e.target);
        pieces = [...oranges, ...blues];

        // removes click-listeners from all activeSide pieces
        activeSide.forEach(piece => {
            document.getElementById(piece.id).removeEventListener(
                'click', pieceLit
            );
        });
        // removes click-listeners from all litDivs
        litDivs.forEach(item => {
            document.getElementById(item).removeEventListener(
                'click', movePiece
            );
        });
        // toggles side & starts the next move 
        if (activeSide === blues) {
            // toggleClocks();
            lit(oranges, blues);
        }
        else {
            // toggleClocks();
            lit(blues, oranges);
        }
    }
    //========================================================================================
    function pawnLit() {
        // highlights enPassant cell, if an option
        if (enPassantables.length) {
            if (enPassantables.includes(pieceToMove)) {
                document.getElementById(enPassantCell).name = 'enPassantable';
                document.getElementById(enPassantCell).classList.add('lit');
                litDivs.push(enPassantCell);
            }
        }

        // highlights all possible moves for clicked pawn
        if (activeSide === blues) {
            // highlights where pawn can attack
            passiveSide.forEach(passivePiece => {
                // if passivePiece is one row ahead of pawn
                if (passivePiece.id[1] == (pieceToMove.id[1] - 1)) {
                    // if passivePiece is one column right of pawn
                    if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
                        document.getElementById(passivePiece.id).classList.add('lit');
                        litDivs.push(passivePiece.id);
                    }
                    // if passiveSide piece is one column left of pawn
                    if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
                        document.getElementById(passivePiece.id).classList.add('lit');
                        litDivs.push(passivePiece.id);
                    }
                }
            });

            // highlights empty space one ahead of pawn
            // emptySpaces --> ['02', '03', ...]
            if (emptySpaces.includes(pieceToMove.id[0] + (pieceToMove.id[1] - 1))) {
                document.getElementById(
                    pieceToMove.id[0] + (pieceToMove.id[1] - 1)
                ).classList.add('lit');
                // 
                litDivs.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));
                // highlights empty space two ahead of blue pawn
                if (pieceToMove.id[1] === '6') { // if pawn in row 6
                    // if the cell two ahead of pawn is empty 
                    if (emptySpaces.includes(pieceToMove.id[0] + (pieceToMove.id[1] - 2))) {
                        // highlights that cell
                        document.getElementById(
                            pieceToMove.id[0] + (pieceToMove.id[1] - 2)
                        ).classList.add('lit');
                        // adds that cell to litDivs array
                        litDivs.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));

                        // ENPASSANT for blue pawn
                        passiveSide.forEach(passivePiece => { // for each passiveSide piece
                            if (passivePiece.name === 'pawn') { // if a pawn
                                if (passivePiece.id[1] === '4') { // if in row 4
                                    // if passiveSide pawn is one column right of clicked pawn
                                    if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
                                        // stores enPassantCell for next move to attack
                                        enPassantCell = pieceToMove.id[0] + (pieceToMove.id[1] - 1);
                                        // collecs pawns that can attack enPassantCell on next move
                                        enPassantables.push(passivePiece);
                                    } // same for one column left of clicked pawn
                                    if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
                                        enPassantCell = pieceToMove.id[0] + (pieceToMove.id[1] - 1);
                                        enPassantables.push(passivePiece);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        else { // since activeSide === oranges...
            // highlights any spaces that orange pawn can attack
            passiveSide.forEach(passivePiece => {
                if (passivePiece.id[1] == (+pieceToMove.id[1] + 1)) {
                    if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
                        document.getElementById(passivePiece.id).classList.add('lit');
                        litDivs.push(passivePiece.id);
                    }
                    if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
                        document.getElementById(passivePiece.id).classList.add('lit');
                        litDivs.push(passivePiece.id);
                    }
                }
            });
            // highlights empty space one ahead of pawn
            if (emptySpaces.includes(pieceToMove.id[0] + (+pieceToMove.id[1] + 1))) {
                document.getElementById(
                    pieceToMove.id[0] + (+pieceToMove.id[1] + 1)
                ).classList.add('lit');
                litDivs.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));

                // highlights empty space two ahead of pawn
                if (pawn.id[1] === '1') {
                    if (emptySpaces.includes(pieceToMove.id[0] + (+pieceToMove.id[1] + 2))) {

                        document.getElementById(
                            pieceToMove.id[0] + (+pieceToMove.id[1] + 2)
                        ).classList.add('lit');

                        litDivs.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 2));

                        // ENPASSANT for orange pawn
                        passiveSide.forEach(passivePiece => {
                            if (passivePiece.name === 'pawn') {
                                if (passivePiece.id[1] === '3') { // one column right
                                    if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
                                        enPassantCell = pieceToMove.id[0] + (+pieceToMove.id[1] + 1);
                                        enPassantables.push(passivePiece);
                                    } // one column left
                                    if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
                                        enPassantCell = pieceToMove.id[0] + (+pieceToMove.id[1] + 1);
                                        enPassantables.push(passivePiece);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        // ========================================================================================
        // -----------------------------------------------------------------
    } // DONE
    //========================================================================================
    function knightLit() {
        block1 = false;
        block2 = false;
        block3 = false;
        block4 = false;
        block5 = false;
        block6 = false;
        block7 = false;
        block8 = false;
        let knightLight;

        // if own pieces occupy knight space, no highlight there
        activeSide.forEach(activePiece => {
            switch (+activePiece.id[0]) {
                case (+pieceToMove.id[0] + 1):
                    if (activePiece.id[1] == (+pieceToMove.id[1] + 2)) { block1 = true; break; }
                    if (activePiece.id[1] == (pieceToMove.id[1] - 2)) { block2 = true; break; }
                case (pieceToMove.id[0] - 1):
                    if (activePiece.id[1] == (+pieceToMove.id[1] + 2)) { block3 = true; break; }
                    if (activePiece.id[1] == (pieceToMove.id[1] - 2)) { block4 = true; break; }
                case (+pieceToMove.id[0] + 2):
                    if (activePiece.id[1] == (+pieceToMove.id[1] + 1)) { block5 = true; break; }
                    if (activePiece.id[1] == (pieceToMove.id[1] - 1)) { block6 = true; break; }
                case (pieceToMove.id[0] - 2):
                    if (activePiece.id[1] == (+pieceToMove.id[1] + 1)) { block7 = true; break; }
                    if (activePiece.id[1] == (pieceToMove.id[1] - 1)) { block8 = true; break; }
            }
        });

        // more concise switch() {} here?
        if (!block1) {
            if ((+pieceToMove.id[0] + 1) < 8) { // FILTERS OUT OFF-BOARD KNIGHT MOVES
                if ((+pieceToMove.id[1] + 2) < 8) {
                    knightLight = (+pieceToMove.id[0] + 1).toString() + (+pieceToMove.id[1] + 2);
                    document.getElementById(
                        knightLight
                    ).classList.add('lit');
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block2) {
            if ((+pieceToMove.id[0] + 1) < 8) {
                if ((pieceToMove.id[1] - 2) >= 0) {
                    knightLight = (+pieceToMove.id[0] + 1).toString() + (pieceToMove.id[1] - 2);
                    document.getElementById(
                        knightLight
                    ).classList.add('lit');
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block3) {
            if ((+pieceToMove.id[0] - 1) >= 0) {
                if ((+pieceToMove.id[1] + 2) < 8) {
                    knightLight = (pieceToMove.id[0] - 1).toString() + (+pieceToMove.id[1] + 2);
                    document.getElementById(
                        knightLight    
                    ).classList.add('lit');
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block4) {
            if ((+pieceToMove.id[0] - 1) >= 0) {
                if ((+pieceToMove.id[1] - 2) >= 0) {
                    knightLight = (pieceToMove.id[0] - 1).toString() + (pieceToMove.id[1] - 2);
                    document.getElementById(
                        knightLight                        
                    ).classList.add('lit');
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block5) {
            if ((+pieceToMove.id[0] + 2) < 8) {
                if ((+pieceToMove.id[1] + 1) < 8) {
                    knightLight = (+pieceToMove.id[0] + 2).toString() + (+pieceToMove.id[1] + 1);
                    document.getElementById(
                        knightLight    
                    ).classList.add('lit');
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block6) {
            if ((+pieceToMove.id[0] + 2) < 8) {
                if ((+pieceToMove.id[1] - 1) >= 0) {
                    knightLight = (+pieceToMove.id[0] + 2).toString() + (pieceToMove.id[1] - 1);
                    document.getElementById(
                        knightLight    
                    ).classList.add('lit');
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block7) {
            if ((+pieceToMove.id[0] - 2) >= 0) {
                if ((+pieceToMove.id[1] + 1) < 8) {
                    knightLight = (pieceToMove.id[0] - 2).toString() + (+pieceToMove.id[1] + 1);
                    document.getElementById(
                        knightLight
                    ).classList.add('lit');
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block8) {
            if ((+pieceToMove.id[0] - 2) >= 0) {
                if ((+pieceToMove.id[1] - 1) >= 0) {
                    knightLight = (pieceToMove.id[0] - 2).toString() + (pieceToMove.id[1] - 1);
                    document.getElementById(
                        knightLight
                    ).classList.add('lit');
                    litDivs.push( knightLight );
                }
            }
        }
    } // DONE
    //========================================================================================
    function bishopLit() {
    
        function quadrant(bishopX, bishopY) {
        // FIX: bishop doesn't highlight attackable pieces
            let bishopPathId = bishopX.toString() + bishopY;
        
            // while bishop path empty, highlight space
            while (emptySpaces.includes(bishopPathId)) {
                // add lit class
                document.getElementById(
                    bishopPathId
                ).classList.add('lit');
                // add id to litDivs
                litDivs.push( bishopPathId );
                // increment bishopX
                if (bishopX > +pieceToMove.id[0]) {
                    bishopX += 1;
                } else { bishopX -= 1; }
                // increment bishopY
                if (bishopY > +pieceToMove.id[1]) {
                    bishopY += 1;
                } else { bishopY -= 1; }
                // updates bishopPathId
                bishopPathId = bishopX.toString() + bishopY;
            }
            // highlights attackable pieces in bishop's path
            for (let i = 0; i < passiveSide.length; i++) {
                if (passiveSide[i].id === bishopPathId) {
                    document.getElementById(bishopId).classList.add('lit');
                    litDivs.push( bishopId );
                }
            }
        }
        quadrant( (+pieceToMove.id[0] + 1), (+pieceToMove.id[1] + 1) );
        quadrant( (+pieceToMove.id[0] + 1), (pieceToMove.id[1] - 1) );
        quadrant( (pieceToMove.id[0] - 1), (+pieceToMove.id[1] + 1) );
        quadrant( (pieceToMove.id[0] - 1), (pieceToMove.id[1] - 1) );
    } // NEEDS to highlight attackable pieces
    //========================================================================================
    function rookLit() {
        let rookPathId;
        // covers queen case 
        // if (pieceToMove.name === 'rook') {
        //     litDivs = [];
        //     tempId.push(pieceToMove.id);
        //     // highlights clicked pieceToMove
        //     document.getElementById(pieceToMove.id).classList.add('mainLit');
        // }

        // pushes correct divs to litDivs
        function first(rookX) {
            rookPathId = rookX.toString() + pieceToMove.id[1];

            while (emptySpaces.includes( rookPathId )) {    
                
                document.getElementById(
                    rookPathId
                ).classList.add('lit');
                
                litDivs.push( rookPathId );
                
                if (rookX > pieceToMove) { rookX += 1; }
                else { rookX -= 1; }
                
            }
            if (passiveSide.includes(rookX.toString() + pieceToMove.id[1])) {
                
                document.getElementById(
                    rookX.toString() + pieceToMove.id[1]
                ).classList.add('lit');
                
                litDivs.push(rookX.toString() + rook.id[1].toString());
            }
        }

        function second(rookY) {
            rookPathId = pieceToMove.id[0].toString() + rookY;

            while (emptySpaces.includes(rookPathId)) {
                
                document.getElementById(
                    rookPathId
                ).classList.add('lit');
                
                litDivs.push( rookPathId );

                if (rookY > pieceToMove) { rookY += 1; }
                else { rookY -= 1; }
            }
            if (passiveSide.includes(rookPathId)) {
                document.getElementById(
                    rookPathId
                ).classList.add('lit');
                litDivs.push( rookPathId );
            }
        }

        first(pieceToMove.id[0] - 1);
        first(+pieceToMove.id[0] + 1);
        second(pieceToMove.id[1] - 1);
        second(+pieceToMove.id[1] + 1);

        // adds click-listener to litDivs
        litDivs.forEach(item => {
            document.getElementById(item).addEventListener(
                'click', movePiece
            );
        });
    } // NEEDS TO LIGHT ATTACKABLE PIECES
    //========================================================================================
    function kingLit() {

        function exclude(res1, res2) { // kingSpaces, activeSide
            return res1.filter(obj => { // obj --> each item in res1
                return !res2.some(obj2 => { // obj --> each item in res2
                    return obj[0] == obj2.id[0] && obj[1] == obj2.id[1]
                }) // returns true if at least one doesn't match x & y
            });
        } // excludes res2 from res1

        kingSpaces = [
            (pieceToMove.id[0] - 1) + pieceToMove.id[1],
            // { x: pieceToMove.dataset.x - 1, y: pieceToMove.dataset.y },
            (pieceToMove.id[0] - 1).toString() + (+pieceToMove.id[1] + 1),
            pieceToMove.id[0] + (+pieceToMove.id[1] + 1),
            (+pieceToMove.id[0] + 1).toString() + (+pieceToMove.id[1] + 1),
            (+pieceToMove.id[0] + 1) + pieceToMove.id[1],
            (+pieceToMove.id[0] + 1).toString() + (pieceToMove.id[1] - 1),
            pieceToMove.id[0] + (pieceToMove.id[1] - 1),
            (pieceToMove.id[0] - 1).toString() + (pieceToMove.id[1] - 1)
        ].map(space => { // keeps only on-board kingSpaces
            if (+space[0] >= 0 && +space[0] <= 7) {
                if (+space[1] >= 0 && +space[1] <= 7) { return space; }
            }
        }).filter(item => { return item !== undefined; });

        // console.log(kingSpaces); // ['37','57',...]

        kingSpacesUnderAttack = [];

        // array of kingSpaces devoid of kingSide pieces
        openAndOpponentHeldKingSpaces = exclude(kingSpaces, activeSide);
        // console.log(openAndOpponentHeldKingSpaces);

        openAndOpponentHeldKingSpaces.forEach(space => {
            passiveSide.forEach(passivePiece => {
                if (checkingSpace(passivePiece, space, passiveSide)) {
                    kingSpacesUnderAttack.push(space);
                }
            }); // checkingSpace returns true/false if piece attacks space
        }); // array of pieces that attack a kingSpace

        kingSpaces = exclude(openAndOpponentHeldKingSpaces, kingSpacesUnderAttack);

        kingSpaces.forEach(cell => {
            document.getElementById(cell).classList.add('lit');
            litDivs.push(cell);
        });

        // moves king to clicked litDiv
        litDivs.forEach(litDiv => { // item is an id
            document.getElementById(litDiv).addEventListener(
                'click', movePiece
            );
        });
    }
    //========================================================================================
    //========================================================================================
    //========================================================================================
    function pieceLit(e) { // on-click of an activeSide piece

        // resets activeSdie cells when one clicked
        if (tempId.length) {
            document.getElementById(tempId[0]).classList.remove('mainLit');
            tempId = []; //maybe delete this here?
            litDivs.forEach(item => {
                document.getElementById(item).classList.remove('lit');
            });
        }
        pieceToMove = e.target;
         // -----------------------------------------------------------------
        litDivs = [];
        tempId.push(pieceToMove.id);
        // highlights clicked pieceToMove
        document.getElementById(pieceToMove.id).classList.add('mainLit');
        
        // highlights clicked piece's possible moves
        switch (pieceToMove.name) {
            case 'pawn':
                pawnLit();
                break;
            case 'knight':
                knightLit();
                break;
            case 'bishop':
                bishopLit();
                break;
            case 'rook':
                rookLit();
                break;
            case 'queen':
                bishopLit();
                rookLit();
                break;
            case 'king':
                kingLit();
                break;
        }
        // -----------------------------------------------------------------
        // adds click-listener to all litDivs
        console.log(litDivs); // null for knight
        litDivs.forEach(litDiv => { // litDiv is an id
            document.getElementById(litDiv).addEventListener(
                'click', movePiece
            );
        });
        /*
        // removes click-listener from litDivs
        litDivs.forEach(item => {
            document.getElementById(item).removeEventListener(
                'click', movePiece
            );
        });
        */
       /*
        if (tempId.length) {
            document.getElementById(tempId[0]).removeEventListener(
                'click', pieceLit);
            document.getElementById(tempId[0]).classList.remove('mainLit');
            tempId = [];
        }
        
        // un-highlights all litDivs
        litDivs.forEach(litDiv => {
            document.getElementById(litDiv).classList.remove('lit')
        });
        */
        // if (!nails.includes(pieceToMove.id)) {}
        // -----------------------------------------------------------------
    }
    //========================================================================================
    //========================================================================================
    //========================================================================================
    // adds click-listeners to all activeSide pieces to run pieceLit()
    activeSide.forEach(piece => {
        document.getElementById(piece.id).addEventListener(
            'click', pieceLit
        );
    });
} //========================================================================================
lit(blues, oranges);

// activeCells = activeSide.map(item => {
//     return item.x.toString() + item.y.toString();
// });

// function excludes(arr1, arr2) {
//     return arr1.filter(cell => {
//         return !arr2.some(piece => {
//             return cell === piece.id;
//         });
//     });
// }

// unLitDivs = excludes(activeCells, litDivs);

// board.classList.remove('lit', 'mainLit') --> should work


