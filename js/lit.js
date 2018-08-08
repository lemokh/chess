<<<<<<< HEAD
function lit(activeSide, passiveSide) {
    litDivs = []; // holds lit ids on which to apply click-listeners
    tempId = []; // for un-highlighting all cells on clicking new piece
    emptySpaces = openSpaces(boardIds, pieces); // updates emptySpaces
    //========================================================================================
    // function toggleClocks() {}
<<<<<<< HEAD
    function movePiece(e) {
        if (tempId.length > 0) {
            document.getElementById(tempId[0]).removeEventListener(
                'click', pieceLit);
            document.getElementById(tempId[0]).classList.remove('mainLit');
            tempId = [];
=======
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
            pieceToMove.classList.remove('blue');
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
        }
        else { // since orange turn
            enPassantedPawn = document.getElementById(
                pawnMovesHere.id[0] + (pawnMovesHere.id[1] - 1)
            );

            document.getElementById(
                orangeTakenBoxIdCounter.toString()
            ).src = enPassantedPawn.src;

            orangeTakenBoxIdCounter -= 1;

            enPassantedPawn.classList.remove('blue');
            pawnMovesHere.classList.add('orange');
            pieceToMove.classList.remove('orange');
        }
        enPassantedPawn.src = './images/transparent.png';
        enPassantedPawn.name = '';
        passiveSide.splice(passiveSide.indexOf(enPassantedPawn), 1);
        pieces = [...oranges, ...blues];
        enPassantedPawn = undefined;
    }
    //========================================================================================
    function movePiece(e) {
        // removes click-listener from litDivs
        litDivs.forEach(litDiv => {
            document.getElementById(litDiv).removeEventListener(
                'click', movePiece
            );
        });
        document.getElementById(pieceToMove.id).removeEventListener('click', pieceLit);
         // -----------------------------------------------------------------
        goToDiv = e.target;
        // -----------------------------------------------------------------
<<<<<<< HEAD
        // Updates pieceToMove's info to e.target's cell 
=======
        // un-highlights litDivs & mainDiv
        document.getElementById(pieceToMove.id).classList.remove('mainLit');
        tempId = []; //maybe delete this here?
        litDivs.forEach(litDiv => {
            document.getElementById(litDiv).classList.remove('lit');
        });
        // -----------------------------------------------------------------
        // updates pieceToMove's info at goToDiv 
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
        // if piece is eaten...
        if (goToDiv.name !== '') {
            console.log(goToDiv.name);
            console.log('piece eaten');
             // if enPassantCell clicked --> en passant attack
            if (goToDiv.id === enPassantCell) { enPassant(e.target); }
            // pushes eaten piece's image to its takenBox div
<<<<<<< HEAD
            if (e.target.classList.contains('blue')) {
                // if (e.target.name === 'pawn') {}
=======
            else if (goToDiv.classList.contains('blue')) {
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
                document.getElementById(
                    orangeTakenBoxIdCounter.toString()
                ).src = e.target.src;
                orangeTakenBoxIdCounter -= 1;
            }
            else {
                document.getElementById(
                    blueTakenBoxIdCounter.toString()
                ).src = goToDiv.src;
                blueTakenBoxIdCounter -= 1;
            }
            // updates class sides
<<<<<<< HEAD
            if (blues.includes(pieceToMove)) { // if blue pieceToMove... 
                e.target.classList.remove('orange');
                e.target.classList.add('blue');
                pieceToMove.classList.remove('blue');
            }
            else { // since pieceToMove is orange...
                e.target.classList.remove('blue');
                e.target.classList.add('orange');
=======
            if (blues.includes(pieceToMove)) { // if pieceToMove is blue... 
                goToDiv.classList.remove('orange');
                goToDiv.classList.add('blue');
                pieceToMove.classList.remove('blue');
            }
            else { // since pieceToMove is orange...
                goToDiv.classList.remove('blue');
                goToDiv.classList.add('orange');
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
                pieceToMove.classList.remove('orange');
            }
            // gets index for clicked space
            index2 = passiveSide.indexOf(goToDiv);
            // removes eaten piece from passiveSide array
            passiveSide.splice(index2, 1);
<<<<<<< HEAD

        }
        else { // since no piece eaten --> e.target.name === ''
            if (blues.includes(pieceToMove)) { // if blue pieceToMove
                e.target.classList.add('blue');
                pieceToMove.classList.remove('blue');
                // e.target.classList.remove('orange');
            }
            else { // updates classList for bishop & e.target
                e.target.classList.add('orange');
                pieceToMove.classList.remove('orange');
                // e.target.classList.remove('blue');
            }
        }

        // updates bishop's new & old space name
        e.target.name = pieceToMove.name;
        pieceToMove.name = '';

        // updates bishop's new & old space image
        e.target.src = pieceToMove.src;
        pieceToMove.src = './images/transparent.png';

=======
        } // -----------------------------------------------------------------
        else { // since no piece is eaten --> goToDiv.name === ''
            if (blues.includes(pieceToMove)) { // if pieceToMove is blue
                goToDiv.classList.add('blue');
                pieceToMove.classList.remove('blue');
            }
            else { // updates classList for pieceToMove & goToDiv
                goToDiv.classList.add('orange');
                pieceToMove.classList.remove('orange');
            }
        } // -----------------------------------------------------------------
        // updates pieceToMove's & goToDiv's name
        goToDiv.name = pieceToMove.name;
        pieceToMove.name = '';
        // -----------------------------------------------------------------
        // updates pieceToMove's & goToDiv's image
        goToDiv.src = pieceToMove.src;
        pieceToMove.src = './images/transparent.png';
        // -----------------------------------------------------------------
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
        // gets index for clicked pieceToMove
        index1 = activeSide.indexOf(pieceToMove);
        // removes vacated space from activeSide array         
        activeSide.splice(index1, 1);
        // -----------------------------------------------------------------
        // updates activeSide & pieces array
        activeSide.push(goToDiv);
        pieces = [...oranges, ...blues];
        // -----------------------------------------------------------------
        // removes click-listeners from all activePieces
        activeSide.forEach(activePiece => {
            document.getElementById(activePiece.id).removeEventListener(
                'click', pieceLit
            );
        });
<<<<<<< HEAD
        // removes click-listeners from all litDivs
        litDivs.forEach(item => {
            document.getElementById(item).removeEventListener(
                'click', movePiece
            );
        });
=======
        // -----------------------------------------------------------------
        // pieceToMove = undefined;
        // -----------------------------------------------------------------
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
        // toggles side & starts the next move 
        if (activeSide === blues) {
            // toggleClocks();
            lit(oranges, blues);
        } else {
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
            if (emptySpaces.includes(
                    pieceToMove.id[0] 
                    + (pieceToMove.id[1] - 1)
                )) {
                document.getElementById(
                    pieceToMove.id[0] 
                    + (pieceToMove.id[1] - 1)
                ).classList.add('lit');
                // -------------------------------------------------------
                litDivs.push(
                    pieceToMove.id[0]
                    + (pieceToMove.id[1] - 1)
                );
                // highlights empty space two ahead of blue pawn
                if (pieceToMove.id[1] === '6') { // if pawn in row 6
                    // if the cell two ahead of pawn is empty 
                    if (emptySpaces.includes(
                        pieceToMove.id[0] 
                        + (pieceToMove.id[1] - 2
                        ))) {
                        // highlights that cell
                        document.getElementById(
                            pieceToMove.id[0] 
                            + (pieceToMove.id[1] - 2)
                        ).classList.add('lit');
                        // adds that cell to litDivs array
                        litDivs.push(
                            pieceToMove.id[0] 
                            + (pieceToMove.id[1] - 2)
                        );
                        // -----------------------------------------------------------------
                        // ENPASSANT for blue pawn
                        passiveSide.forEach(passivePiece => { // for each passiveSide piece
                            if (passivePiece.name === 'pawn') { // if a pawn
                                if (passivePiece.id[1] === '4') { // is in row 4
                                    // if a passivePawn is one column right of clicked pawn
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
                // -----------------------------------------------------------------
                // highlights empty space two ahead of pawn
                if (pieceToMove.id[1] === '1') {
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
<<<<<<< HEAD
        // MOVES pawn info to e.target's cell 
        // if piece is eaten...
        if (e.target.name !== '') {
            console.log('piece eaten');
            // if enPassantCell clicked --> en passant attack
            if (e.target.id === enPassantCell) {

                console.log('e.target === enPassantCell');
                // resets clicked enPassant cell info

                enPassantables = [];
                enPassantCell = '';

                // puts enPassantCell in its takenBox
                if (activeSide === blues) {

                    enPassantedPawn = document.getElementById(
                        e.target.id[0] + (+e.target.id[1] + 1)
                    );

                    document.getElementById(
                        blueTakenBoxIdCounter.toString()
                    ).src = enPassantedPawn.src;

                    blueTakenBoxIdCounter -= 1;

                    enPassantedPawn.classList.remove('orange');
                    e.target.classList.add('blue');
                    pawn.classList.remove('blue');
                }
                else { // since orange turn

                    enPassantedPawn = document.getElementById(
                        e.target.id[0] + (+e.target.id[1] - 1)
                    );

                    document.getElementById(
                        orangeTakenBoxIdCounter.toString()
                    ).src = enPassantedPawn.src;

                    orangeTakenBoxIdCounter -= 1;

                    enPassantedPawn.classList.remove('blue');
                    e.target.classList.add('orange');
                    pawn.classList.remove('orange');
                }
                enPassantedPawn.src = './images/transparent.png';
                enPassantedPawn.name = '';
                passiveSide.splice(passiveSide.indexOf(enPassantedPawn), 1);
                pieces = [...oranges, ...blues];
                enPassantedPawn = undefined;
            }
            else { // THIS NEEDS STRAIGHTENING UP!
                // pushes eaten piece's image to its takenBox div
                if (e.target.classList.contains('blue')) {
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
                if (blues.includes(pawn)) { // if pawn is blue... 
                    e.target.classList.remove('orange');
                    e.target.classList.add('blue');
                    pawn.classList.remove('blue');
                }
                else { // since pawn is orange...
                    e.target.classList.remove('blue');
                    e.target.classList.add('orange');
                    pawn.classList.remove('orange');
                }
                // gets index for clicked space
                index2 = passiveSide.indexOf(e.target);
                // removes eaten piece from passiveSide array
                passiveSide.splice(index2, 1);
            }
        }
        else { // since no is piece eaten --> e.target.name === ''
            if (blues.includes(pawn)) { // if pawn is blue
                e.target.classList.add('blue');
                pawn.classList.remove('blue');
                // e.target.classList.remove('orange');
            }
            else { // updates classList for pawn & e.target
                e.target.classList.add('orange');
                pawn.classList.remove('orange');
                // e.target.classList.remove('blue');
            }
        }

        // updates pawn's new & old space name
        e.target.name = 'pawn';
        pawn.name = '';

        // updates pawn's new & old space image
        e.target.src = pawn.src;
        pawn.src = './images/transparent.png';

        // gets index for clicked pawn
        index1 = activeSide.indexOf(pawn);
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
                'click', movePawn
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
    } // movePiece + enPassant
=======
    } // DONE
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
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

        // if own piece occupies knight space, no highlight there
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
<<<<<<< HEAD
        // moves knight to clicked litDiv
        litDivs.forEach(item => { // item is an id
            document.getElementById(item).addEventListener(
                'click', movePiece
            );
        });
    } // DONE
=======
    }
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
    //========================================================================================
    function bishopLit() {
        function quadrant(bishopX, bishopY) {
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
                    document.getElementById(bishopPathId).classList.add('lit');
                    litDivs.push( bishopPathId );
                }
            }
<<<<<<< HEAD
        } // good!
        one();
        two();
        three();
        four();

        if (bishop.name === 'queen') {
            rook = bishop;
            rookLit();
        }

        else { // moves bishop to clicked litDiv
            litDivs.forEach(item => { // item is an id
                document.getElementById(item).addEventListener(
                    'click', movePiece
                );
            });
=======
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
        }
        
        quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] + 1);
        quadrant(+pieceToMove.id[0] + 1, pieceToMove.id[1] - 1);
        quadrant(pieceToMove.id[0] - 1, +pieceToMove.id[1] + 1);
        quadrant(pieceToMove.id[0] - 1, pieceToMove.id[1] - 1);
    }
    //========================================================================================
    function rookLit() {
<<<<<<< HEAD
        if (rook.name === 'rook') {
            litDivs = [];
            tempId.push(rook.id);

            // highlights clicked rook
            document.getElementById(rook.id).classList.add('mainLit');
        }

        function first() {
            rookX = (+rook.id[0] - 1);

            while (emptySpaces.includes(rookX.toString() + rook.id[1].toString())) {
=======
        // in case of queen 
        if (pieceToMove.name === 'rook') {
            litDivs = [];
            tempId.push( pieceToMove.id );
            // highlights clicked pieceToMove
            document.getElementById(pieceToMove.id).classList.add('mainLit');
        }

        // pushes correct divs to litDivs
        function first(rookX) {
        // first(+pieceToMove.id[0] + 1);
        // first(pieceToMove.id[0] - 1);
            rookPathId = rookX.toString() + pieceToMove.id[1];
            // console.log(rookPathId);

            // while rook path empty, highlight space
            while (emptySpaces.includes( rookPathId )) {    
                // console.log(emptySpaces.includes(rookPathId));
                // add lit class
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
                document.getElementById(
                    rookPathId
                ).classList.add('lit');
                // add rookPathId to litDivs
                litDivs.push( rookPathId );
                // increment rookX
                if (rookX > +pieceToMove.id[0]) { rookX += 1; }
                else { rookX -= 1; }
                // updates rookPathId
                rookPathId = rookX.toString() + pieceToMove.id[1];
            }

            // highlights attackable pieces in rook's path
            for (let i = 0; i < passiveSide.length; i++) {
                if (passiveSide[i].id === rookPathId) {
                    document.getElementById(rookPathId).classList.add('lit');
                    litDivs.push( rookPathId );
                }
            }
        }

        function second(rookY) {
        // second(+pieceToMove.id[1] + 1);
        // second(pieceToMove.id[1] - 1);
            rookPathId = pieceToMove.id[0].toString() + rookY;
            // console.log(rookPathId);

            // while rook path empty, highlight space
            while (emptySpaces.includes( rookPathId )) {    
            // console.log(emptySpaces.includes(rookPathId));
            // add lit class
            document.getElementById(
                rookPathId
            ).classList.add('lit');
            // add rookPathId to litDivs
            litDivs.push( rookPathId );
            // increment rookY
            if (rookY > +pieceToMove.id[1]) { rookY += 1; }
            else { rookY -= 1; }
            // updates rookPathId
            rookPathId = pieceToMove.id[0].toString() + rookY;
        }

        // highlights attackable pieces in rook's path
        for (let i = 0; i < passiveSide.length; i++) {
            if (passiveSide[i].id === rookPathId) {
                document.getElementById(rookPathId).classList.add('lit');
                litDivs.push( rookPathId );
            }
        }
        }
<<<<<<< HEAD
        first();
        second();
        third();
        fourth();

        // moves rook to clicked litDiv
        litDivs.forEach(item => { // item is an id
            document.getElementById(item).addEventListener(
                'click', movePiece
            );
        });
    } // NEEDS TO LIGHT ATTACKABLE PIECES
    //========================================================================================
=======
        first(+pieceToMove.id[0] + 1);
        first(pieceToMove.id[0] - 1);
        second(+pieceToMove.id[1] + 1);
        second(pieceToMove.id[1] - 1);
    }
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
    //========================================================================================
    function kingLit() {
        // function exclude(arr, arr2) { // kingSpaces, activeSide
        //     return arr.filter(item => { // each item in arr
        //         return !arr2.some(item2 => { // each item in arr2
        //             return item == item2.id;
        //         }); // returns true if not a match
        //     });
        // } // removes arr2 items from arr
        kingSpaces = [
            (pieceToMove.id[0] - 1) + pieceToMove.id[1],
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
        openAndOpponentHeldKingSpaces = kingSpaces.filter(kingSpace => { // each item in arr
                return !activeSide.some(activePiece => { // each item in arr2
                    return kingSpace == activePiece.id;
                }); // returns true if not a match
            });
        
        console.log(openAndOpponentHeldKingSpaces);
        
        // .map() here instead?
        openAndOpponentHeldKingSpaces.forEach(space => {
            passiveSide.forEach(passivePiece => {
                console.log(checkingSpace(passivePiece, space, passiveSide));
                // sees if any passivePieces check any empty or king-attackable spaces
                if (checkingSpace(passivePiece, space, passiveSide)) {
                    kingSpacesUnderAttack.push(space);
                    console.log(kingSpacesUnderAttack);
                }
            }); // checkingSpace returns true/false if piece attacks space
        }); // array of opponent pieces that check a kingSpace
        console.log(openAndOpponentHeldKingSpaces);
        // removes any of those spaces from kingSpaces
        kingSpaces = openAndOpponentHeldKingSpaces.filter(nonOwnKingSpace => { // each item in arr
            return !kingSpacesUnderAttack.some(checkedKingSpace => { // each item in arr2
                return nonOwnKingSpace == checkedKingSpace;
            }); // returns true if not a match
        });
<<<<<<< HEAD

        // moves king to clicked litDiv
        litDivs.forEach(item => { // item is an id
            document.getElementById(item).addEventListener(
                'click', movePiece
            );
=======
        
        console.log(kingSpaces);
        
        // highlights kingSpaces
        kingSpaces.forEach(space => {
            document.getElementById(space).classList.add('lit');
            litDivs.push(space);
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
        });
    }
    //========================================================================================
<<<<<<< HEAD
    //========================================================================================
=======
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
    //========================================================================================
    //========================================================================================
    function pieceLit(e) {
        // resets activeSide cells when any clicked
        if (tempId.length) {

<<<<<<< HEAD
        if (tempId.length < 0) { // un-highlights all cells
            document.getElementById(tempId[0]).classList.remove('mainLit');
=======
            document.getElementById(
                tempId[0]
            ).classList.remove('mainLit');
            
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
            tempId = [];
            
            litDivs.forEach(litDiv => {
                document.getElementById(
                    litDiv
                ).classList.remove('lit');
            });
        }
<<<<<<< HEAD

        litDivs.forEach(item => { // item is an id
            document.getElementById(item).removeEventListener(
                'click',
                movePawn, movePiece
=======
        // -----------------------------------------------------------------
        pieceToMove = e.target;
        // -----------------------------------------------------------------
        litDivs = [];
        tempId.push( pieceToMove.id );
        // highlights clicked pieceToMove
        document.getElementById(
            pieceToMove.id
        ).classList.add('mainLit');
        // -----------------------------------------------------------------
        // removes click-listener from litDivs
        litDivs.forEach(litDiv => {
            document.getElementById(litDiv).removeEventListener(
                'click', movePiece
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
            );
        });
        // -----------------------------------------------------------------
        // highlights all of clicked piece's possible moves
        switch (pieceToMove.name) {
            case 'pawn':
                pawnLit();
                break;
            case 'knight':
<<<<<<< HEAD
                knight = e.target;
                pieceToMove = e.target;
                knightLit();
                break;
            case 'bishop':
                bishop = e.target;
                pieceToMove = e.target;
                bishopLit();
                break;
            case 'rook':
                rook = e.target;
                pieceToMove = e.target;
                rookLit();
                break;
            case 'queen':
                pieceToMove = e.target;
                bishop = e.target;
                bishopLit();
                break;
            case 'king':
                pieceToMove = e.target;
                king = e.target;
=======
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
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
                kingLit();
                break;
        }
        // console.log(litDivs);
        // -----------------------------------------------------------------
        // adds click-listener to all litDivs for movePiece(e)
        litDivs.forEach(litDiv => {
            document.getElementById(litDiv).addEventListener(
                'click', movePiece
            );
        });
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
    // runs pieceLit(e) for all clicked activeSide pieces
    activeSide.forEach(activePiece => {
        document.getElementById(activePiece.id).addEventListener(
            'click', pieceLit
        );
    });
} //========================================================================================
lit(blues, oranges);
/*
var activeSideIds = activeSide.map(item => item.id);

// excludes litDivs from activeSideIds
var unLitDivs = (activeSideIds, litDivs) => 
    arr1.filter(cell => 
        !arr2.some(piece => cell === piece.id);
    );
);
*/

// board.classList.remove('lit', 'mainLit') // should work
=======
var pieces, knightCells, pinningPiece, rubbishIds, pawnBlocksKingAttacker, pathToCheck, idToBlock, kingAttackers= [], greyLitPieces = [], defenders = [], pawnDefenders = [], enPassantCell = '', orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1, enPassanting = false,
heroics = [], anId, pins, removal, kingInCheck, kingAttackerSupporters, stuckActivePieces, kingLitIds = [], tempLitIds, checkSpaceId, pinnedLitIds, behindKingId, kingLitPiece, kingStuck, preventMateIds = [], kingMovesOutOfCheck = [], possiblePinnedMoves, kingMovesOutOfCheck, newPieceClicked, pinnerPiece, tempPinnedPieces, greyPieceToMove, pathPiece, activePieceIsPinned, litSpace, blocker, mate = false, passiveSideCoversId, canEatKingAttacker = [], greyLitDivs, canBlockPathOfCheck = [], gameOver, kingSlayer, checkPath, emptySpaces, knightLight, bishopPathId, rookPathId, blueKingFirstMove, blueRook1FirstMove, activeKing, blueRook2FirstMove,  orangeKingFirstMove, orangeRook1FirstMove, orangeRook2FirstMove, castleIds = [], noCastle, kingAble, pieceToMove, goToDiv, enPassantDiv, prevGoToDiv, enPassantGoToDiv, pawnJumpDiv, enPassantables2 = [], enPassantedPawn, knightLight, takenOrangeBox, takenBlueBox, gameEnds, tempSide, movedPiece, mainLitDiv, litIds, unLitDivs, img, index1, index2, tempPiece, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, defenders, pinnedPieces, pathOfCheck = [], nails, whites, blacks;
>>>>>>> b1a08f7b50133f156dd891aa9c9738f9e94845d2

const board = document.getElementById('board');

var blueNodes = board.querySelectorAll("[data-side='blue']"),
	orangeNodes = board.querySelectorAll("[data-side='orange']"),

	blues = Array.from(blueNodes),
	oranges = Array.from(orangeNodes),

	activeSide = blues,
	passiveSide = oranges,

	///////////////////////////

	userInput = 10,
	obj,
	runTimer,
	clock1,
	clock2,
	blueTime = {
		minutes: userInput,
		tenths: 0,
		hundredths: 0 
	},
	orangeTime = {
		minutes: userInput,
		tenths: 0,
		hundredths: 0 
	};

function setTimer() {
	document.getElementById('start').addEventListener('click', getMinutes);
}

function startClock() {
	runTimer = setInterval(countDown, 1000);
};

function countDown() {

	obj.hundredths -= 1;
  
	if ( obj.hundredths < 0 ) {
		obj.tenths -= 1;
		obj.hundredths = 9;
	}
	if ( obj.tenths < 0 ) {
	  	obj.minutes -= 1;
	  	obj.tenths = 5;
	}
	if ( obj.minutes < 0 ) { return resign(); }

	clockToUpdate.innerHTML =  
		obj.minutes + ':' + obj.tenths + obj.hundredths;
}

function toggleClocks() {

	clearInterval(runTimer);
	
	if (activeSide[0].dataset.side === 'blue') {	
		obj = blueTime;
		clockToUpdate = clock1;
	}
	else { 
		obj = orangeTime;
		clockToUpdate = clock2;
	}
	startClock();
}

///////////////////////////
///////////////////////////

function inCheck() {

	console.log('ENTERS inCheck()');

	console.log('behindKingId -->');  console.log(behindKingId);

	console.log('litIds -->');  console.log(litIds);

	kingInCheck = true;

	checkPath = pathOfCheck; // why is this important?
	
	console.log('checkPath -->');  console.log(checkPath);

	// unnecessary?
	if (checkPath.includes(behindKingId)) {
		checkPath.splice(checkPath.indexOf(behindKingId), 1);
	}
	console.log('checkPath -->');  console.log(checkPath);

	pieceToMove = activeKing;
	kingLit(); // fills litIds with ids where activeKing can move
	// excludes behindKingId from kingSpaces

	console.log('greyLitPieces -->');  console.log(greyLitPieces);
	console.log('litIds -->');  console.log(litIds);
	
	// if king can move, handles moving activeKing
	if (litIds.length) {
		
		// kingLitIds = litIds that are not in checkPath
		kingLitIds = litIds.filter(litId =>
			!checkPath.some( id => litId === id )
		);
		// checkPath = checkPath ids that are not in litIds
		checkPath = checkPath.filter(id =>
			!litIds.some( litId => id === litId )			
		);
		litIds = kingLitIds;
		
		console.log('litIds -->'); console.log(litIds);
		
		console.log('checkPath -->');  console.log(checkPath);
		console.log('litIds -->');  console.log(litIds);
		console.log('kingLitIds -->');  console.log(kingLitIds);

		greyLitPieces.push(activeKing);
		activeKing.classList.add('preventMateLit');
		activeKing.addEventListener('click', selectGreyPiece);
		
		console.log('greyLitPieces -->');  console.log(greyLitPieces);
	}
	else { kingStuck = true; }
	
	console.log('kingAttackers -->');  console.log(kingAttackers);

	if (kingAttackers.length === 1) { // if only one kingAttacker
		/////////////////////////////////////////////////////
		// populates canEatKingAttacker & canBlockPathOfCheck
		activeSide.forEach(activePiece => {
			pieceToMove = activePiece; // IMPORTANT
			// for each activePiece, if not pinned
			if (activePiece.dataset.pinned === 'false') {
				// if not activeKing
				if (activePiece.dataset.name !== 'king') {
					//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
					// if activePiece checks kingAttacker
					if (checkingSpace(activePiece, kingAttackers[0].id)) {
						console.log(activePiece.id+' can eat '+kingAttackers[0].id);

						canEatKingAttacker.push(activePiece);
					}
					//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
					// prevents pawns from attacking
					pawnBlocksKingAttacker = true;
					// sees if activePiece can move to pathId
					checkPath.forEach(pathId => {
						if (checkingSpace(activePiece, pathId)) {
							console.log(activePiece.id+' can block at '+pathId);

							canBlockPathOfCheck.push(
								{ pathBlocker: activePiece, emptyDivId: pathId }
							);
						}
					});
					pawnBlocksKingAttacker = false;
				}
			}
			// pinnedPiece can only attack in line of its pinner path to king
			else { // since activePiece is pinned
				console.log(activePiece.id+' is pinned');
				pinnedPieceLit();
				return;
			}
		}); // excludes activeKing
		//////////////////////////
		// ------------------------------------
		// begins interceptKingAttacker() logic
		// -------------------------------------
		greyLitPieces.push(...canEatKingAttacker);
		
		console.log('greyLitPieces');  console.log(greyLitPieces);
		
		canBlockPathOfCheck.forEach(obj => {
			greyLitPieces.push(obj.pathBlocker);
		});
		
		console.log('greyLitPieces');  console.log(greyLitPieces);
		
		if (!greyLitPieces.length) {
			if (kingStuck) {
				console.log('since no greyLitPieces and king stuck...endOfGame 1');
				endOfGame();
			}

		}
		else { // since able to prevent check mate
			console.log('since only one kingAttacker and at least one greyLitPiece, no check mate');
				// lightens & click-listens to each greyLitPiece
				greyLitPieces.forEach(greyLitPiece => {
					greyLitPiece.classList.add('preventMateLit');
					greyLitPiece.addEventListener('click', selectGreyPiece);
				});
		}
	}
	else { // since multiple kingAttackers, only activeKing prevents checkmate...
		// checkmate if king stuck
		if (kingStuck) { return endOfGame(); }
		// else move activeKing
		else { addLitDivHandler(selectGreyPiece); }
	}
}

function selectGreyPiece(e) {

	if (greyPieceToMove !== undefined) {
		greyPieceToMove.classList.remove('mainLit');
		greyPieceToMove.addEventListener('click', selectGreyPiece);
	}

	console.log('litIds -->'); console.log(litIds);

	// removeLitDivHandler(moveGreyPiece); --> without litIds = []
	if (litIds.length) { // resets each litId of class & click-listeners
		litIds.forEach( id => {
			litPiece = document.getElementById( id );
			// --------------------------------------
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	} litIds = [];

	if (kingLitIds.length) {
		kingLitIds.forEach( id => {
			litPiece = document.getElementById( id );
			// --------------------------------------
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	}

	greyPieceToMove = e.target;
	// temporarily disables clicking of this piece
	greyPieceToMove.removeEventListener('click', selectGreyPiece);
	greyPieceToMove.classList.add('mainLit');

	if (greyPieceToMove.dataset.name === 'king') {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById( id );
			litPiece.classList.add( 'lit' );
			litPiece.addEventListener( 'click', moveGreyPiece );
		});
	}

	if (canEatKingAttacker.includes(e.target)) {
		litIds.push(kingAttackers[0].id);
	}

	canBlockPathOfCheck.forEach(obj => {
		if (obj.pathBlocker === e.target) {
			litIds.push(obj.emptyDivId);
		}
	});

	addLitDivHandler(moveGreyPiece);
}

function moveGreyPiece(e) {
	
	console.log('ENTERS moveGreyPiece()');
	
	// resets greyPieceToMove
	greyPieceToMove.classList.remove('mainLit');
	greyPieceToMove.classList.remove('preventMateLit');

	if (greyPieceToMove.dataset.name === 'king') {
		kingLitIds.forEach(id => {
			litPiece = document.getElementById( id );
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', moveGreyPiece );
		});
	}

	// clears and resets greyLitPieces
	greyLitPieces.forEach(greyLitPiece => {
		greyLitPiece.removeEventListener('click', selectGreyPiece);
		greyLitPiece.classList.remove('preventMateLit');
	});
	greyLitPieces = [];

	removeLitDivHandler(moveGreyPiece);

	if (e.target.dataset.side !== 'empty') { eat(e.target); }

	swapSide(greyPieceToMove, e.target);

	toggleSides();
}

///////////////////////////

function wherePieceCanMove(e) {
	// if not first click of this turn
	if (newPieceClicked !== undefined) {
		// on-clicking new piece, enables clicking prior clicked piece
		newPieceClicked.addEventListener('click', wherePieceCanMove);
	}
	newPieceClicked = e.target;
	// disables re-clicking this piece until new piece clicked
	e.target.removeEventListener('click', wherePieceCanMove);
	// ------------------------------------------------------
	cleanUpAfterFirstClick();
	// ----------------------------------------
	if (!enPassanting) { goToDiv = undefined; }
	// ----------------------------------------
	pieceToMove = e.target;
	pieceToMove.classList.add('mainLit');
	// -----------------------------------------
	if (pieceToMove.dataset.pinned === 'true') {
		pinnedPieceLit(); // lights where pinned pieceToMove can go
		if (pinnedLitIds.length) {
			pinnedLitIds.forEach( pinnedLitId => {
				litPiece = document.getElementById(pinnedLitId);
				litPiece.classList.add('lit');
				litPiece.addEventListener('click', movePiece);
			});
		}
	}
	else {
		possibleMoves();
		// lightens & click-listens to litIds --> movePiece(e)
		if (litIds.length) { addLitDivHandler(movePiece); }
	}
}

function possibleMoves() {
	console.log('ENTERS possibleMoves()');
	// populates litIds with piece's possible moves
	switch (pieceToMove.dataset.name) {
		case 'pawn':    pawnLit();              break;
		case 'knight':  knightLit();            break;
		case 'bishop':  bishopLit();            break;
		case 'rook':    rookLit();              break;
		case 'queen':   bishopLit(); rookLit(); break;
		case 'king':    kingLit();              break;
		// default: alert('default ERROR! pieceToMove is empty');
	}
}

function movePiece(e) {

	console.log('ENTERS movePiece(e)');

	console.log('removes click-listener from litIds & pieceToMove');

	// removes click-listener from pieceToMove
	pieceToMove.removeEventListener( 'click', wherePieceCanMove );

	// un-lightens mainDiv
	pieceToMove.classList.remove( 'mainLit' );

	if (pieceToMove.dataset.pinned === 'true') {
		pinnedLitIds.forEach( pinnedLitId => {
			litPiece = document.getElementById( pinnedLitId );
			litPiece.classList.remove( 'lit' );
			litPiece.removeEventListener( 'click', movePiece );
		});
	}
	else { removeLitDivHandler(movePiece); }

	// prevents castling after king's first move
	if (pieceToMove.dataset.name === 'king') {
		if (pieceToMove.dataset.side === 'blue') {
			blueKingFirstMove = true;
		} 
		else { orangeKingFirstMove = true; }
	}
	
	// prevents castling after rook's first move
	if (pieceToMove.dataset.name === 'rook') {
		if (pieceToMove.dataset.side === 'blue') {
			if (pieceToMove.id === '07') { blueRook1FirstMove = true; }
			else if (pieceToMove.id === '77') { blueRook2FirstMove = true; }
		} 
		else {
			if (pieceToMove.id === '00') { orangeRook1FirstMove = true; }
			else if (pieceToMove.id === '70') { orangeRook2FirstMove = true; }
		}
	}
	console.log('un-lightens mainDiv & litIds');
	
	goToDiv = e.target; // unnecessary, use e.target instead
	
	// console.log('pieceToMove -->');  console.log(pieceToMove);
	// console.log('goToDiv -->');      console.log(goToDiv);
	// console.log('pawnJumpDiv -->');  console.log(pawnJumpDiv);
	
	// covers enPassant pawn attack
	if (goToDiv.dataset.side === 'empty') {
		console.log('goToDiv IS empty');            

		if (pieceToMove.dataset.name === 'pawn') {
			
			if (enPassanting) {
				if (goToDiv === enPassantDiv) {
					console.log('enPassant pawn attack is happening');
					eat(pawnJumpDiv);                       
					// sets pawnJumpDiv to empty cell
					pawnJumpDiv.setAttribute('data-name', 'empty');
					pawnJumpDiv.setAttribute('data-side', 'empty');
					pawnJumpDiv.setAttribute('src', './images/transparent.png');
				} 
			}
			// covers bluePawn taking a NON-enPassant empty space
			if (activeKing.dataset.side === 'blue') { // if blue's turn
				// if pawnToMove jumps two spaces
				if (goToDiv.id === (pieceToMove.id[0] + (pieceToMove.id[1] - 2))) {
					enPassanting = true;
					console.log('enPassanting = true');

					pawnJumpDiv = goToDiv;
					console.log('pawnJumpDiv = goToDiv');
				}
			}
			else { // since orange's turn
				// if pawnToMove jumps two spaces
				if (goToDiv.id === (pieceToMove.id[0] + (+pieceToMove.id[1] + 2))) {
					enPassanting = true;
					console.log('enPassanting = true');

					pawnJumpDiv = goToDiv;
					console.log('pawnJumpDiv = goToDiv');
				}
			}
		}
	}
	else { // covers pieceToMove eats goToDiv
		console.log('since goToDiv is NOT empty, pieceToMove eats goToDiv');
		eat(goToDiv);
	}
	// covers pawnToMove moving one or two empty spaces
	swapSide(pieceToMove, goToDiv);
	if (noPawnEvolution) { toggleSides(); }
	else {
		// removes click-listeners from activePieces
		activeSide.forEach(activePiece => {
			activePiece.removeEventListener('click', wherePieceCanMove);
		});
	}
	console.log('EXITS movePiece(e)');
}

///////////////////////////
///////////////////////////

function pawnEvolve(e) {
	// uses pieceToMove for pawn & e.target for new piece
	console.log('ENTERS pawnEvolve(e)');
	// re-informs goToDiv
	goToDiv.setAttribute('data-name', e.target.dataset.name);
	goToDiv.setAttribute('data-side', e.target.dataset.side);
	goToDiv.setAttribute('src', e.target.src);

	// gets pieceToMove's activeSide index
	index1 = activeSide.indexOf(pieceToMove);

	// removes now-empty pieceToMove from activeSide    
	activeSide.splice(index1, 1);

	// updates activeSide & pieces array
	activeSide.push(goToDiv);

	// un-informs pieceToMove
	pieceToMove.setAttribute('data-name', 'empty');
	pieceToMove.setAttribute('data-side', 'empty');
	pieceToMove.setAttribute('src', './images/transparent.png');

	// closes modal window
	if (e.target.dataset.side === 'blue') {
		document.getElementById('modalBlue').classList.toggle("showModal");
	}
	else if (e.target.dataset.side === 'orange') { 
		document.getElementById('modalOrange').classList.toggle("showModal");
	}

	toggleSides();
	console.log('EXITS pawnEvolve(e)');
}

function swapSide(fromDiv, toDiv) {
	// swaps pieceToMove & goToDiv info
	console.log('ENTERS swapSide()');
	// handles blue pawn evolution modal window
	if ( (fromDiv.dataset.name === 'pawn') && (toDiv.id[1] === '0') ) {
		document.querySelector('#modalBlue').classList.toggle('showModal');
		document.getElementById('blueQueen').addEventListener('click', pawnEvolve);	
		document.getElementById('blueKnight').addEventListener('click', pawnEvolve);
		document.getElementById('blueRook').addEventListener('click', pawnEvolve);
		document.getElementById('blueBishop').addEventListener('click', pawnEvolve);
	} // handles orange pawn evolution modal window
	else if ( (fromDiv.dataset.name === 'pawn') && (toDiv.id[1] === '7') ) {
		document.querySelector('#modalOrange').classList.toggle('showModal');
		document.getElementById('orangeQueen').addEventListener('click', pawnEvolve);
		document.getElementById('orangeKnight').addEventListener('click', pawnEvolve);
		document.getElementById('orangeRook').addEventListener('click', pawnEvolve);
		document.getElementById('orangeBishop').addEventListener('click', pawnEvolve);
	}
	else { // since no pawn evolution
		noPawnEvolution = true;
		// re-informs goToDiv
		toDiv.setAttribute('data-name', fromDiv.dataset.name);
		toDiv.setAttribute('data-side', fromDiv.dataset.side);
		toDiv.setAttribute('src', fromDiv.src);

		// gets pieceToMove's activeSide index
		index1 = activeSide.indexOf(fromDiv);

		// removes now-empty pieceToMove from activeSide    
		activeSide.splice(index1, 1);

		// updates activeSide & pieces array
		activeSide.push(toDiv);

		// if not an enPassant attack, resets enPassant process
		if (pieceToMove.dataset.name === 'pawn') {
			if (toDiv !== pawnJumpDiv) { enPassantReset(); }
		}
		else { enPassantReset(); }

		// un-informs pieceToMove
		fromDiv.setAttribute('data-name', 'empty');
		fromDiv.setAttribute('data-side', 'empty');
		fromDiv.setAttribute('src', './images/transparent.png');
		fromDiv.removeEventListener('click', wherePieceCanMove);
	}
	console.log('EXITS swapSide()');
}

function eat(piece) {
	// eat(goToDiv); --> normal pawn attack
	// eat(pawnJumpDiv); --> enPassant attack

	console.log('ENTERS eat('+piece+')');

	// puts piece in its takenBox
	if (activeKing.dataset.side === 'blue') { // if blue side
		document.getElementById(
			blueTakenBoxIdCounter.toString()
		).src = piece.src;

		blueTakenBoxIdCounter -= 1;
	}
	else { // since orange turn, does the same
		document.getElementById(
			orangeTakenBoxIdCounter.toString()
		).src = piece.src;

		orangeTakenBoxIdCounter -= 1;
	}

	// gets piece's passiveSide index
	index2 = passiveSide.indexOf(piece);

	// removes piece from passiveSide array
	passiveSide.splice(index2, 1);

	console.log('EXITS eat()');
}

function castling(e) {
	
	console.log('enters castling(e)');
	// -------------------------------
	if (litIds.length) {
		removeLitDivHandler(movePiece);
	}
	// -------------------------------------------------
	// un-lightens & stops click-listening all castleIds
	castleIds.forEach(id => {
		document.getElementById(id).classList.remove('castleLit');
		document.getElementById(id).removeEventListener('click', castling);
	});
	// -------------------------------------
	pieceToMove.classList.remove('mainLit');
	// -------------------------------------
	castleIds = [];
	// -----------------------------------------------------
	// castles rook & prevents that side from castling again
	switch (e.target.id) {
		case '27':
			swapSide( document.getElementById('07'), document.getElementById('37') );
			blueKingFirstMove = true;
			break;
		case '67':
			swapSide( document.getElementById('77'), document.getElementById('57') );
			blueKingFirstMove = true;
			break;
		case '20':
			swapSide( document.getElementById('00'), document.getElementById('30') );
			orangeKingFirstMove = true;
			break;
		case '60':
			swapSide( document.getElementById('70'), document.getElementById('50') );
			orangeKingFirstMove = true;
			break;
	}
	// castles king
	swapSide(pieceToMove, e.target);
	// -----------------------------------------
	// removes click-listeners from activePieces
	activeSide.forEach(activePiece => {
		document.getElementById(
			activePiece.id
		).removeEventListener('click', wherePieceCanMove);
	});
	if (litIds.length) {
		console.log('________');
		removeLitDivHandler(movePiece);
	}
	console.log('!!!!!');
	toggleSides();
}

///////////////////////////

function enPassantReset() {
	console.log('ENTERS enPassantReset()');
	
	// resets enPassanting
	enPassanting = false;
	console.log('enPassanting = false');
	
	// resets pawnJumpDiv
	pawnJumpDiv = undefined;
	console.log('pawnJumpDiv = undefined');
	
	// resets enPassantDiv
	enPassantDiv = undefined;
	console.log('enPassantDiv = undefined');
}

function addLitDivHandler(funcName) {

	litIds.forEach( litDiv => {
		litPiece = document.getElementById( litDiv );
		litPiece.classList.add( 'lit' );
		litPiece.addEventListener( 'click', funcName );
	});
}

function removeLitDivHandler(funcName) {

	litIds.forEach( litDiv => {
		litPiece = document.getElementById( litDiv );
		litPiece.classList.remove( 'lit' );
		litPiece.removeEventListener( 'click', funcName );
	});
	litIds = [];
}

function cleanUpAfterFirstClick() {
	// resets litIds on clicking multiple activeSide pieces
	if (pieceToMove !== undefined) {
		// un-lightens & stops click-listening to pieceToMove
		pieceToMove.removeEventListener( 'click', movePiece );
		pieceToMove.classList.remove( 'mainLit' );
		
		// un-lightens, clears out & stops click-listening to litIds
		if (litIds.length) { removeLitDivHandler(movePiece); }
		// un-lightens, clears out & stops click-listening to litIds
		if (pinnedLitIds) {
			pinnedLitIds.forEach( pinnedLitId => {
				litPiece = document.getElementById( pinnedLitId );
				litPiece.classList.remove( 'lit' );
				litPiece.removeEventListener( 'click', movePiece );
			});
		}
		
		// un-lightens, clears out & stops click-listening to castleIds
		if (castleIds.length) { // if king ready to castle
			
			castleIds.forEach(id => { // resets castling process
				document.getElementById( id ).classList.remove( 'castleLit' );
				document.getElementById( id ).removeEventListener( 'click', castling );
			});
			castleIds = [];
		}
	}
}

///////////////////////////
function pinnedPieceLit() {
	console.log('ENTERS pinnedPieceLit()');
	// assigns pinned pieceToMove's pinnerPiece
	for (let i = 0; i < pinnedPieces.length; i++) {
		if (pieceToMove === pinnedPieces[i].pinned) {
			pinnerPiece = pinnedPieces[i].pinner;
			break;
		}
	}
	// -----------------------------------------
	if (pieceToMove.dataset.name === 'knight') {
		if (pinnerPiece.dataset.name !== 'knight') { return; }
	} // ----------------------------------------------------------
	// if pinned piece can eat its pinnerPiece, add to pinnedLitIds 
	if (checkingSpace(pieceToMove, pinnerPiece.id)) {
		pinnedLitIds.push(pinnerPiece.id);
	}
	console.log('pathOfCheck -->');  console.log(pathOfCheck);

	pinnedLitIds.push(...pathOfCheck);
	// -----------------------------------------
	if (pieceToMove.dataset.name !== 'knight') {
		if (pieceToMove.dataset.name !== 'pawn') {
			// provides pinned pieceToMove's id path to its own king
			checkingSpace(pieceToMove, activeKing.id);
			pinnedLitIds.push(...pathOfCheck);
			console.log('pinnedLitIds -->');  console.log(pinnedLitIds);
		}
	}
}
///////////////////////////

function toggleSides() {
	// removes click-listeners from activePieces
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});
	// console.log(activeKing);
	// toggles side & starts next move 
	if (activeSide[0].dataset.side === 'blue') {
		
		// console.log('toggling clocks');
		// clearInterval(runTimer);
		
		console.log('toggles activeSide to orange');
		
		activeSide = oranges;
		passiveSide = blues;
		
		lit();
	}
	
	else { // since activeKing is orange
		// console.log('toggling clocks');
		// clearInterval(runTimer);

		console.log('toggles activeSide to blue');
		
		activeSide = blues;
		passiveSide = oranges;
		
		lit();
	}
}

function endOfGame() {
	clearInterval(runTimer);
	activeKing.classList.add('checkMate');
	board.classList.add('noClick');
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});

	alert(activeKing.dataset.side + ' KING CHECKMATED!');
	console.log(activeKing.dataset.side + ' KING CHECKMATED!');
	console.log('END OF GAME');
}

function resign() {
	clearInterval(runTimer);
	board.classList.add('noClick');
	activeSide.forEach(activePiece => {
		activePiece.removeEventListener('click', wherePieceCanMove);
	});
	alert(activeKing.dataset.side + " resigns");
	console.log('END OF GAME');
}

function draw() {
	clearInterval(runTimer);
	alert("Game ends in a draw");
}

///////////////////////////

function pawnLit() {

	console.log('enters pawnLit()');

	// highlights all possible moves for blue pawnToMove
	if (activeKing.dataset.side === 'blue') {
		// if enPassant attack is possible
		if (enPassanting) { // same as: if (pawnJumpDiv.length) ?
			// covers enPassant attack
			
			// if bluePawnToMove is beside pawnJump,
			if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
			|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
				// adds bluePawnToMove's enPassant-attack-div to litIds
				enPassantDiv = document.getElementById(
					pawnJumpDiv.id[0] + (pawnJumpDiv.id[1] - 1) 
				);
				litIds.push( enPassantDiv.id );
			}
		}
		// collects potential normal attack divs
		passiveSide.forEach(passivePiece => {
			// if passivePiece is one row ahead of blue pawnToMove
			if (passivePiece.id[1] == (pieceToMove.id[1] - 1)) {
				// if passivePiece is right beside blue pawnToMove
				if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
					litIds.push(passivePiece.id);
				}
				// if passivePiece is left beside blue pawnToMove
				if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
					litIds.push(passivePiece.id);
				}
			}
		});
		// collects empty space one ahead of blue pawnToMove
		if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).dataset.side === 'empty') { 
			litIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));

			// collects empty space two ahead of blue pawnToMove
			// if blue pawnToMove in row 6
			if (pieceToMove.id[1] === '6') {
				// if empty cell two ahead of blue pawnToMove
				if (document.getElementById(pieceToMove.id[0]
				+ (pieceToMove.id[1] - 2)).dataset.side === 'empty') {
					litIds.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));
				}
			}
		}
	}
	else { // since orange's turn
		// if enPassant attack is possible
		if (enPassanting) { // if (pawnJumpDiv.length) {}
			if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
			|| (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
				// adds enPassant attack div to litIds
				enPassantDiv = document.getElementById(
					pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1)
				);
				litIds.push( enPassantDiv.id );
			}
		}
		// collects potential normal attack divs
		passiveSide.forEach(passivePiece => {
			// if passivePiece is one row ahead of orange pawnToMove
			if (passivePiece.id[1] == (+pieceToMove.id[1] + 1)) {
				// if passivePiece is right beside orange pawnToMove
				if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
					litIds.push(passivePiece.id);
				}
				// if passivePiece is left beside orange pawnToMove
				if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
					litIds.push(passivePiece.id);
				}
			}
		});
		
		if (document.getElementById(
			pieceToMove.id[0] + (+pieceToMove.id[1] + 1)
		).dataset.side === 'empty') {
			// collects empty space one ahead of orange pawnToMove
			litIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));
			
			// collects empty space two ahead of orange pawnToMove
			if (pieceToMove.id[1] === '1') { // if orange pawnToMove in row 1
				// if empty cell two ahead of orange pawnToMove
				if (document.getElementById(
					pieceToMove.id[0] + (+pieceToMove.id[1] + 2)
				).dataset.side === 'empty') {
					// pushes that empty cell to litIds array
					litIds.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 2));
				}
			}
		}
	}
} // fills litIds with ids where pawn can move

function onBoard(id) {
	if (id[0] >= 0) {
		if (id[0] <= 7) {
			if (id[1] >= 0) {
				if (id[1] <= 7) {
					return true;
				}
			}
		}
	}
}

function onBoardNonActiveIds(id) {
	if (onBoard(id)) {
		if (findingKingAttackers) {
			if ( document.getElementById( id ).dataset.side 
			!== passiveSide[0].dataset.side ) { return id; }
		}
		else {
			if ( document.getElementById( id ).dataset.side 
			!== activeKing.dataset.side ) { return id; }
		}
	}
}

function knightSpaces(knight) { 
	return [
		(+knight.id[0] + 1) + (+knight.id[1] + 2).toString(),
		(+knight.id[0] + 1) +  (knight.id[1] - 2).toString(),
		(knight.id[0] - 1) + (+knight.id[1] + 2).toString(),
		(knight.id[0] - 1) +  (knight.id[1] - 2).toString(),
		(+knight.id[0] + 2) + (+knight.id[1] + 1).toString(),
		(+knight.id[0] + 2) +  (knight.id[1] - 1).toString(),
		(knight.id[0] - 2) + (+knight.id[1] + 1).toString(),
		(knight.id[0] - 2) +  (knight.id[1] - 1).toString()
	];
}

function knightLit() {
	litIds = knightSpaces(pieceToMove).filter(onBoardNonActiveIds);
} // fills litIds with ids where knight can move

function bishopLit() {

	function quadrant(x, y) { // x & y are a number

		let bishopPath = document.getElementById( x.toString() + y );

		if (x >= 0) {
			if (x <= 7) {
				if (y >= 0) {
					if (y <= 7) { // since x & y are on the board..
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
				}
			}
		}
	}	
	quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] + 1);
	quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] - 1);
	quadrant(+pieceToMove.id[0] - 1, +pieceToMove.id[1] + 1);
	quadrant(+pieceToMove.id[0] - 1, +pieceToMove.id[1] - 1);
}  // fills litIds with ids where bishop can move

function rookLit() {
	// in case of queen
	if (pieceToMove.dataset.name === 'rook') { litIds = []; }

	function line(x, y) { // x & y are a number

		let rookPath = document.getElementById( x.toString() + y );

		if (x >= 0) {
			if (x <= 7) {
				if (y >= 0) {
					if (y <= 7) { // since x & y are on the board..
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
				}
			}
		}           
	} 
	line(+pieceToMove.id[0] + 1, +pieceToMove.id[1]);
	line(+pieceToMove.id[0] - 1, +pieceToMove.id[1]);
	line(+pieceToMove.id[0], +pieceToMove.id[1] + 1);
	line(+pieceToMove.id[0], +pieceToMove.id[1] - 1);
} // fills litIds with ids where rook can move

function kingLit() {
	// highlights all possible moves for activeKing
	console.log('ENTERS kingLit()');

	// FIX GREYLITPIECES ADDING INCORRECT EXTRA PIECES!!
	// WHEN IN CHECK, DO NOT CHECK FOR ACTIVEPIECES THAT CAN BLOCK PATH OF KINGATTACKER'S PASSIVE SUPPORTING PIECES
	// ALSO, WRITE THE LOGIC FOR WHEN PATH OF CHECK IS EMPTY (WHEN PIECES BORDER EACHOTHER)
	// FINALLY, PINNEDPIECE QUEEN DOES NOT LIT CORRECTLY (ADDS TOO MANY SPACES)
		// PATHOFCHECK & PINNEDLITIDS EACH HAVE INCORRECT IDS (ADDED FOUR TIMES)...  IS NOT CLEARING PROPERLY

	passiveSideCoversId = false;

	// covers king castling
	if (!testingDraw) {
		if (!kingAttackers.length) { // if king not in check
			if (pieceToMove.dataset.side === 'blue') {
				if (!blueKingFirstMove) {
					if (!blueRook1FirstMove) {
						if (['17', '27', '37'].every(id => document.getElementById(id).dataset.side === 'empty')) {
							noCastle = false;

							for (let i = 0; i < 3; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['17', '27', '37'][i])) {
										noCastle = true;
									}
								}
							}
							if (!noCastle) { castleIds.push('27'); }
						}
					}
					if (!blueRook2FirstMove) {
						if (['57', '67'].every(id => document.getElementById(id).dataset.side === 'empty')) {
							noCastle = false;

							for (let i = 0; i < 2; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['57', '67'][i])) {
										noCastle = true;
									}
								}
							}
							if (!noCastle) { castleIds.push('67'); }
							console.log(castleIds);
						}
					}
				}
			}
			else { // since activeSide is orange
				if (!orangeKingFirstMove) {
					if (!orangeRook1FirstMove) {
						if (['10', '20', '30'].every(id => document.getElementById(id).dataset.side === 'empty')) {
							for (let i = 0; i < 3; i++) {
								noCastle = false;

								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['10', '20', '30'][i])) {
										noCastle = true;
									}
								}
							}  if (!noCastle) { castleIds.push('20'); }
						}
					}
					if (!orangeRook2FirstMove) {
						if (['50', '60'].every(id => document.getElementById(id).dataset.side === 'empty')) {
							noCastle = false;

							for (let i = 0; i < 2; i++) {
								for (let k = 0; k < passiveSide.length; k++) {
									if (checkingSpace(passiveSide[k], ['50', '60'][i])) {
										noCastle = true;
									}
								}
							}
							if (!noCastle) { castleIds.push('60'); }
						}
					}
				}
			}
		}
	}
	
	// lightens & click-listens all castleIds
	if (castleIds.length) { // if king is castling
		castleIds.forEach(id => {
			document.getElementById(id).classList.add('castleLit');
			document.getElementById(id).addEventListener('click', castling);
		});
	}
	// whether or not king can castle, king must be able to move
	kingSpaces = [
		pieceToMove.id[0] + (+pieceToMove.id[1] - 1),
		pieceToMove.id[0] + (+pieceToMove.id[1] + 1),
		(+pieceToMove.id[0] - 1) + pieceToMove.id[1],
		(+pieceToMove.id[0] + 1) + pieceToMove.id[1],
		(+pieceToMove.id[0] - 1) + (+pieceToMove.id[1] - 1).toString(),
		(+pieceToMove.id[0] - 1) + (+pieceToMove.id[1] + 1).toString(),
		(+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] - 1).toString(),
		(+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] + 1).toString()
	].map(space => { // keeps only on-board kingSpaces
		if (onBoard(space)) {
			if (kingInCheck) {
				console.log('behindKingId -->');  console.log(behindKingId);
				if (space !== behindKingId) { return space; }
			}
			else { return space; }
		}
	}).filter(item => { return item !== undefined; });

	console.log('kingSpaces -->');  console.log(kingSpaces);

	// excludes activePiece occupied spaces from kingSpaces array
	openAndOpponentHeldKingSpaces = kingSpaces.filter(kingSpace => {
		// for each kingSpace & each activePiece
		return !activeSide.some(activePiece => {
			// adds kingSpace to oAOHKS array if no activePiece there 
			return (kingSpace === activePiece.id);
		});
	});

	console.log('openAndOpponentHeldKingSpaces -->');
	console.log(openAndOpponentHeldKingSpaces);

	// populates litIds with safe kingSpaces
	openAndOpponentHeldKingSpaces.forEach(id => {
		passiveSideCoversId = false;
		// for each oAOHKS & each passivePiece
		for (let i = 0; i < passiveSide.length; i++) {

			if (passiveSide[i].id !== id) {
				// if a passivePiece can check that oAOHKS...(kingSpace id devoid of activePiece)
				if (checkingSpace(passiveSide[i], id)) {
					console.log(passiveSide[i].dataset.side + ' ' + passiveSide[i].dataset.name + ' can attack ' + id);

					passiveSideCoversId = true;
					break;
					
				}
			}
		}
		if (!passiveSideCoversId) { litIds.push(id); }
	});
	console.log('litIds -->');  console.log(litIds);
	
}  // fills litIds with ids where king can move

////////////////////////////////////////////////////////

function pawnAttacks(pawn) {

	if (pawnBlocksKingAttacker) { // set by inCheck()
		// sees if pawn can block checkSpaceId
		if (pawn.dataset.side === 'blue') {
			// if blue turn
			if (checkSpaceId === pawn.id[0] + (pawn.id[1] - 1)) {
				// if checkSpaceId is one ahead of blue pawnToMove
				return true;
			}
			else if (document.getElementById(
				pawn.id[0] + (pawn.id[1] - 1)
			).dataset.side === 'empty') {
				// if empty cell one ahead of bluePawn
				if (pawn.id[1] === '6') {
					// if blue pawnToMove in row 6
					if (checkSpaceId === pawn.id[0] + (pawn.id[1] - 2)) {
						// if checkSpaceId is two ahead of blue pawnToMove
						return true;
					}
				}
			}
			return false;
		}
		else { // since orange turn
			// collects empty space one ahead of orange pawnToMove
			if (checkSpaceId === pawn.id[0] + (+pawn.id[1] + 1)) {
				// if checkSpaceId is one ahead of orange pawnToMove
				return true;
			}
			// collects empty space two ahead of orange pawnToMove
			else if (document.getElementById(
				pawn.id[0] + (+pawn.id[1] + 1)
			).dataset.side === 'empty') {
				// if empty cell one ahead of orangePawn
				if (pawn.id[1] === '1') {
					// if orange pawnToMove in row 1
					if (checkSpaceId === pawn.id[0] + (+pawn.id[1] + 2)) {
						// if checkSpaceId is two ahead of orange pawnToMove
						return true;
					}
				}
			}
			return false;
		}
	}
	else { // since !pawnBlocksKingAttacker
		// sees if pawn can eat checkSpaceId
		if (+pawn.id[0] - 1 == checkSpaceId[0]
		|| (+pawn.id[0] + 1) == checkSpaceId[0]) {
			// if pawn is blue
			if (pawn.dataset.side === 'blue') {
				return checkSpaceId[1] == (pawn.id[1] - 1);
			}
			// since pawn is orange
			else { return checkSpaceId[1] == (+pawn.id[1] + 1); }
		}
		return false;
	}
} // returns true/false if pawn can attack checkSpaceId

function knightAttacks(knight) {

	function attacks(id) {
		if (id === checkSpaceId) { return id; }
	}
	
	if (knightSpaces(knight).filter(onBoardNonActiveIds).filter(attacks).length) {
		return true; 
	}
} // returns true/false if knight can attack checkSpaceId

function bishopAttacks(bishop) {
	// checks for clear path between bishop.id & checkSpaceId
	bishopMoves = []; // collects spaces bishop attacks enroute to checkSpaceId
	nails = []; // collects possible pinnedPieces
	
	bishopX = +bishop.id[0];
	bishopY = +bishop.id[1];

	// bishop & checkSpaceId cannot have the same id
	if (bishop.id === checkSpaceId) { return false; }

	// collects ids between bishop & checkSpaceId
	if (+bishop.id[0] < +checkSpaceId[0]) {
		// bishop attacks in a southEast diagonal
		if (+bishop.id[1] < +checkSpaceId[1]) {
			// if bishop's path aligns with checkSpaceId
			if (+checkSpaceId[0] - +bishop.id[0]
			=== +checkSpaceId[1] - +bishop.id[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] + 1) + (+checkSpaceId[1] + 1).toString();
				}
				// collects bishop's attack path to checkSpaceId
				while ( bishopX < (+checkSpaceId[0] - 1) ) {
					bishopX += 1;
					bishopY += 1;
					bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop can't checkSpaceId
		}
		else { // since bishop attacks in a northEast diagonal
			// if bishop aligns with checkSpaceId
			if ( +checkSpaceId[0] - +bishop.id[0]
			=== +bishop.id[1] - +checkSpaceId[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] + 1) + (+checkSpaceId[1] - 1).toString();							
				}
				// collects bishop's attack path to checkSpaceId
				while ( bishopX < (+checkSpaceId[0] - 1) ) {
					bishopX += 1;
					bishopY -= 1;
					bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop cannot checkSpaceId
		}
	}
	else {
		// since bishop attacks in a southWest diagonal
		if (+bishop.id[1] < +checkSpaceId[1]) {
			// if bishop aligns with checkSpaceId
			if ( +bishop.id[0] - +checkSpaceId[0]
			=== +checkSpaceId[1] - +bishop.id[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] - 1) + (+checkSpaceId[1] + 1).toString();							
				}
				// collects bishop's attack path to checkSpaceId
				while ( bishopX > (+checkSpaceId[0] + 1) ) {
					bishopX -= 1;
					bishopY += 1;
					bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop can't checkSpaceId
		}
		else { // since bishop attacks in a northWest diagonal
			// if bishop aligns with checkSpaceId
			if ( +bishop.id[0] - +checkSpaceId[0]
			=== +bishop.id[1] - +checkSpaceId[1]) {
				// if bishop checks activeKing
				if (checkSpaceId === activeKing.id) {
					// collects space behind king in bishop's diagonal
					behindKingId = (+checkSpaceId[0] - 1) + (+checkSpaceId[1] - 1).toString();
				}
				// collects bishop's attack path to checkSpaceId
				while ( bishopX > (+checkSpaceId[0] + 1) ) {
					bishopX -= 1;
					bishopY -= 1;
					bishopMoves.push( bishopX + bishopY.toString() );
				}
			}
			else { return false; } // bishop can't attack king
		}
	}
	console.log('bishopMoves -->');  console.log(bishopMoves);
	
	if (bishopMoves.length) {
		// populates nails with pieces that block bishop's path to checkSpaceId
		bishopMoves.forEach(bishopMove => {
			if (onBoard(bishopMove)) {
				blocker = document.getElementById( bishopMove );
				if (blocker.dataset.side !== 'empty') { nails.push(blocker); }
			}
		});
		console.log('nails -->');  console.log(nails);
	}
	// returns true/false if no piece blocks bishop's path to checkSpaceId
	if (!nails.length) { // note: nails may contain pieces from both sides
		// pathOfCheck array becomes bishop's id route to checkSpaceId
		pathOfCheck = bishopMoves;
		console.log('pathOfCheck -->');  console.log(pathOfCheck);
		return true; // bishop can attack checkSpaceId
	}
	if (nails.length === 1) { // if only one nail
		if (checkSpaceId === activeKing.id) {
			// if that nail & bishop aren't on the same side
			if (nails[0].dataset.side !== bishop.dataset.side) {
				if (nails[0] !== activeKing) {
					// collects bishop & nails[0]
					pinnedPieces.push(
						{ pinner: bishop, pinned: nails[0] }
					);
					// sets dataset.pinned & dataset.pinner for nails[0]
					nails[0].setAttribute('data-pinned', true);
					
					// alert(nails[0].dataset.side + ' ' + nails[0].dataset.name + ' IS PINNED');
					console.log('pinnedPieces -->');  console.log(pinnedPieces);
				}
			}
		}
	}
	return false; // bishop cannot attack checkSpaceId
} // returns true/false... if bishop can attack checkSpaceId,
// that is, if no piece blocks bishop's path to checkSpaceId

function rookAttacks(rook) {
	// checks for clear path between rook.id & checkSpaceId
	rookMoves = []; // collects spaces rook attacks enroute to checkSpaceId
	nails = []; // collects possible pinnedPieces

	// if rook & checkSpaceId share column
	if (rook.id[0] === checkSpaceId[0]) {
		// if rook below checkSpaceId, rook.y++
		if (+rook.id[1] < +checkSpaceId[1]) {
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = checkSpaceId[0] + (+checkSpaceId[1] + 1);
			}
			for (let i = +rook.id[1] + 1; i < +checkSpaceId[1]; i++) {
				rookMoves.push( checkSpaceId[0] + i );
			}
		}
		else { // since rook is above checkSpaceId, rook.id[1]--
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = checkSpaceId[0] + (+checkSpaceId[1] - 1);
			}
			for (let i = +rook.id[1] - 1; i > +checkSpaceId[1]; i--) {
				rookMoves.push( checkSpaceId[0] + i );
			}
		}
	} // pushes column spaces between rook & checkSpaceId to rookMoves

	// else if rook & checkSpaceId share row
	else if (rook.id[1] === checkSpaceId[1]) {
		// if rook left of checkSpaceId, rook.id[0]++
		if (+rook.id[0] < +checkSpaceId[0]) {
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = (+checkSpaceId[0] + 1) + checkSpaceId[1];
			}
			for (let i = +rook.id[0] + 1; i < +checkSpaceId[0]; i++) {
				rookMoves.push( i + checkSpaceId[1] );
			}
		}
		else { // since rook right of checkSpaceId, rook.id[0]--
			// if rook checks activeKing
			if (checkSpaceId === activeKing.id) {
				// collects space behind king in rook's row
				behindKingId = (+checkSpaceId[0] - 1) + checkSpaceId[1];
			}
			for (let i = +rook.id[0] - 1; i > +checkSpaceId[0]; i--) {
				rookMoves.push( i + checkSpaceId[1] );
			}
		}
	}  // pushes row spaces between rook & checkSpaceId to rookMoves
	
	else { return false; } // rook can't checkSpaceId
	// console.log('rookMoves -->');  console.log(rookMoves);
	if (rookMoves.length) {
		// populates nails with pieces that block rook's path to checkSpaceId
		rookMoves.forEach(rookMove => {
			if (onBoard(rookMove)) {
				blocker = document.getElementById( rookMove );
				if (blocker.dataset.side !== 'empty') {
					if (rookMove !== behindKingId) {
						nails.push(blocker);
					}
				}
			}
		});
		console.log('nails -->');  console.log(nails);
	}
	// returns true/false if no piece blocks rook's path to checkSpaceId
	if (!nails.length) { // nails can be both sides
		// pathOfCheck array becomes rook.id route to checkSpaceId
		if (rook.dataset.name === 'queen') {
			pathOfCheck.push( ...rookMoves);
		}
		else { pathOfCheck = rookMoves; }
		return true; // rook can attack checkSpaceId
	}
	if (nails.length === 1) { // if only one nail
		if (checkSpaceId === activeKing.id) {
			// if that nail & rook aren't on the same side
			if (nails[0].dataset.side !== rook.dataset.side) {
				
				pinnedPieces.push(
					{ pinner: rook, pinned: nails[0] }
				);

				nails[0].setAttribute('data-pinned', true);
				
				// alert(nails[0].dataset.side + ' ' + nails[0].dataset.name + ' IS PINNED');
				console.log('pinnedPieces -->');  console.log(pinnedPieces);
			}
		}
	}
	return false; // rook cannot attack checkSpaceId
} // returns true/false if rook can attack checkSpaceId

function queenAttacks(queen) {

	if (bishopAttacks(queen, checkSpaceId)) {
		queenAttack = 'bishop';
		return true;
	}
	if (rookAttacks(queen, checkSpaceId)) {
		queenAttack = 'rook';
		return true;
	}
	return false;
} // returns true/false if queen can attack checkSpaceId

function kingAttacks(king) {
	
	switch (+checkSpaceId[0]) { // if checkSpaceId's column equals...
		case +king.id[0]: // king's column
			return (
				( +checkSpaceId[1] === (+king.id[1] + 1) )
				|| 
				( +checkSpaceId[1] === (king.id[1] - 1) )
			);
		case +king.id[0] + 1: // king's column + 1
			return (
				(  checkSpaceId[1] ===   king.id[1] )
				||
				( +checkSpaceId[1] === (+king.id[1] + 1) )
				||
				( +checkSpaceId[1] ===  (king.id[1] - 1) )
			);
		case king.id[0] - 1: // king's column - 1
			return (
				( checkSpaceId[1] === king.id[1] )
				||
				( +checkSpaceId[1] === (+king.id[1] + 1) )
				||
				( +checkSpaceId[1] === (king.id[1] - 1) )
			);

		default: return false;
	}
} // returns true if king can attack checkSpaceId

////////////////////////////////////////////

function checkingSpace(somePiece, someId) {
	checkSpaceId = someId;
	// sees if somePiece can check someId
	switch (somePiece.dataset.name) {
		case 'pawn':    return pawnAttacks(somePiece);
		case 'knight':  return knightAttacks(somePiece); 
		case 'bishop':  return bishopAttacks(somePiece);
		case 'rook':    return rookAttacks(somePiece);
		case 'queen':   return queenAttacks(somePiece);
		case 'king':    return kingAttacks(somePiece);
	}
} // returns true/false if somePiece can attack someId

////////////////////////////////////////////////////////////

function lit() {

	stuckActivePieces = 0;
	findingKingAttackers = true;
	
	pawnBlocksKingAttacker = false;
	noPawnEvolution = false;
	kingInCheck = false;
	activeDraw = false;
	kingStuck = false;

	greyPieceToMove = undefined;
	newPieceClicked = undefined;
	behindKingId = undefined;
	
	kingAttackerSupporters = [];
	canBlockPathOfCheck = [];
	canEatKingAttacker = [];
	kingAttackers = [];
	greyLitPieces = [];
	pinnedLitIds = [];
	pinnedPieces = [];
	pathOfCheck = [];
	kingIds = [];
	litIds = [];
	pins = [];

    // ********** META-LOGIC **********

	debugger;

	toggleClocks();

	if (castleIds.length) {
		castleIds.forEach(id => {
			document.getElementById(id).classList.remove('castleLit');
			document.getElementById(id).removeEventListener('click', castling);
		});
		castleIds = [];
	}

	previousPinnedPieces = board.querySelectorAll("[data-pinned='true']");
	console.log('previousPinnedPieces -->');  console.log(previousPinnedPieces);
    // -------------------------------------------------------------------------
    // sets activeKing
	for (i = 0; i < activeSide.length; i++) {      
        if (activeSide[i].dataset.name === 'king') {
            activeKing = activeSide[i];
            break;
		}
    }  console.log('activeKing -->');  console.log(activeKing);
    // --------------------------------------------------------
	testingDraw = true;
	// covers game ending in a draw
	if (activeSide.length === 1) {
		if (passiveSide.length === 1) {
			return draw();
		}
	}

	if (activeSide.length === 2) {
		for (let i = 0; i < activeSide.length; i++) {
			if (activeSide[i].dataset.name === 'knight') {
				if (passiveSide.length === 1) { return draw(); }
				activeDraw = true;
			}
			if (activeSide[i].dataset.name === 'bishop') {
				if (passiveSide.length === 1) { return draw(); }
				activeDraw = true;
			}
		}
		if (passiveSide.length === 2) {
			for (let i = 0; i < passiveSide.length; i++) {
				if (passiveSide[i].dataset.name === 'knight') {
					if (activeSide.length === 1) { return draw(); }
					if (activeDraw) { return draw(); }
				}
				if (passiveSide[i].dataset.name === 'bishop') {
					if (activeSide.length === 1) { return draw(); }
					if (activeDraw) { return draw(); }
				}
			}
		}
	}

	activeSide.forEach(piece => {
		litIds = [];
		pieceToMove = piece;
		possibleMoves();
		if (!litIds.length) {
			stuckActivePieces += 1;
		}
	});
	if (stuckActivePieces === activeSide.length) {
		return draw();
	}
	litIds = [];
	testingDraw = false;
	pieceToMove = undefined;
    // -------------------------------------------------------------
    // adds to kingAttackers all passivePieces that check activeKing 
	passiveSide.forEach(passivePiece => {
		if (checkingSpace(passivePiece, activeKing.id)) {
			kingAttackers.push(passivePiece);
			console.log('kingAttackers -->');  console.log(kingAttackers);
			console.log('pathOfCheck -->');  console.log(pathOfCheck);
		}
	});

	if (kingAttackers.length === 1) {
		passiveSide.forEach(piece => {
			if (piece.id !== kingAttackers[0].id) {
				if (checkingSpace(piece, kingAttackers[0].id)) {
					kingAttackerSupporters.push(piece);
				}
			}
		});
	}

	if (previousPinnedPieces.length) {
		// collects each pinned piece into pins
		pinnedPieces.forEach(obj => { pins.push(obj.pinned); });
		console.log('pins -->');  console.log(pins);

		// for each previousPinnedPiece, if not in pins, un-pins that piece
		for (let i = 0; i < previousPinnedPieces.length; i++) {
			if (!pins.includes(previousPinnedPieces[i])) {
				console.log('unpins '+previousPinnedPieces[i]);
				// sets dataset.pinned to 'false' & dataset.pinner to 'empty'
				previousPinnedPieces[i].setAttribute('data-pinned', 'false');
			}
		}
	}

	console.log('pinnedPieces -->');  console.log(pinnedPieces);
	console.log('kingAttackers -->');  console.log(kingAttackers);
	
	findingKingAttackers = false;
    // -------------------------------------
    if (kingAttackers.length) { inCheck(); }
    // -------------------------------------
	else { // since not in check
		activeSide.forEach(activePiece => {
			activePiece.addEventListener('click', wherePieceCanMove);
		});
	}
}

/////////////////////////////

window.onload = function() {
	document.getElementById('start').addEventListener('click', function getMinutes() {
		
		if (document.getElementById('timeSet').value) {
			if (document.getElementById('timeSet').value > 0) {
				if (!document.getElementById('timeSet').value.includes('.'))
					if (!document.getElementById('timeSet').value.includes('e')) {
				
					userInput = +(document.getElementById('timeSet').value);
					
					clock1 = document.getElementById('time1');
					clock1.innerHTML = userInput+':00';
					
					clock2 = document.getElementById('time2');
					clock2.innerHTML = userInput+':00';

					blueTime = {
						minutes: userInput,
						tenths: 0,
						hundredths: 0 
					};
					
					orangeTime = {
						minutes: userInput,
						tenths: 0,
						hundredths: 0 
					};

					document.getElementById('modal').style.display = "none";
					
					function showTimers(timer) {
						timer.style.visibility = "visible";
						timer.style.opacity = '1';
						timer.style.transform = 'scale(1.0)';
						timer.style.transition = 'visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s';
					}

					showTimers(document.getElementById('time1'));
					showTimers(document.getElementById('time2'));
					
					lit();
				}
			}
		}
	});
}