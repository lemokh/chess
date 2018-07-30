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


