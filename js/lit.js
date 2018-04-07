function lit(activeSide, passiveSide) {
    litDivs = []; // holds lit ids on which to apply click-listeners
    tempId = []; // for un-highlighting all cells on clicking new piece
    emptySpaces = openSpaces(boardIds, pieces); // updates emptySpaces
    
    // function toggleClocks() {}

    function pawnLit() {
        litDivs = [];
        tempId.push(pawn.id);
    
        // highlights clicked pawn
        document.getElementById(pawn.id).classList.add('mainLit');

        // highlights enPassant cell, if an option
        if (enPassantables.length) {
            if (enPassantables.includes(pawn)) {
                document.getElementById(enPassantCell).name = 'enPassantable';
                document.getElementById(enPassantCell).classList.add('lit');
                litDivs.push(enPassantCell);
            }
        }

        // highlights all possible moves for clicked pawn
        if (activeSide === blues) {
            // highlights where pawn can attack
            passiveSide.forEach(item => {
                // if passiveSide piece is one row ahead of pawn
                if (item.id[1] == (+pawn.id[1] - 1)) {
                    // if passiveSide piece is one column right of pawn
                    if (item.id[0] == (+pawn.id[0] + 1)) {
                        document.getElementById(item.id).classList.add('lit');
                        litDivs.push(item.id);
                    } 
                    // if passiveSide piece is one column left of pawn
                    if (item.id[0] == (+pawn.id[0] - 1)) {
                        document.getElementById(item.id).classList.add('lit');
                        litDivs.push(item.id);
                    }
                }
            });

            // highlights empty space one ahead of pawn
            // emptySpaces --> ['02', '03', ...]
            if (emptySpaces.includes(pawn.id[0] + (+pawn.id[1] - 1))) {
                document.getElementById(
                    pawn.id[0] + (+pawn.id[1] - 1)
                ).classList.add('lit');
                // 
                litDivs.push(pawn.id[0] + (+pawn.id[1] - 1));
                // highlights empty space two ahead of blue pawn
                if (pawn.id[1] === '6') { // if pawn in row 6
                    // if the cell two ahead of pawn is empty 
                    if (emptySpaces.includes(pawn.id[0] + (+pawn.id[1] - 2))) {
                        // highlights that cell
                        document.getElementById(
                            pawn.id[0] + (+pawn.id[1] - 2)
                        ).classList.add('lit');
                        // adds that cell to litDivs array
                        litDivs.push(pawn.id[0] + (+pawn.id[1] - 2));
                        
                        // ENPASSANT for blue pawn
                        passiveSide.forEach(item => { // for each passiveSide piece
                            if (item.name === 'pawn') { // if a pawn
                                if (item.id[1] === '4') { // if in row 4
                                    // if passiveSide pawn is one column right of clicked pawn
                                    if (item.id[0] == (+pawn.id[0] + 1)) {
                                        // stores enPassantCell for next move to attack
                                        enPassantCell = pawn.id[0] + (+pawn.id[1] - 1);
                                        // collecs pawns that can attack enPassantCell on next move
                                        enPassantables.push(item);
                                    } // same for one column left of clicked pawn
                                    if (item.id[0] == (+pawn.id[0] - 1)) {
                                        enPassantCell = pawn.id[0] + (+pawn.id[1] - 1);
                                        enPassantables.push(item);
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
            passiveSide.forEach(item => { 
                if (item.id[1] == (+pawn.id[1] + 1)) {
                    if (item.id[0] == (+pawn.id[0] + 1)) {
                        document.getElementById(item.id).classList.add('lit');
                        litDivs.push(item.id);
                    }
                    if (item.id[0] == (+pawn.id[0] - 1)) {
                        document.getElementById(item.id).classList.add('lit');
                        litDivs.push(item.id);
                    }
                }
            });
            // highlights empty space one ahead of pawn
            if (emptySpaces.includes(pawn.id[0] + (+pawn.id[1] + 1))) {
                document.getElementById(
                    pawn.id[0] + (+pawn.id[1] + 1)
                ).classList.add('lit');
                litDivs.push(pawn.id[0] + (+pawn.id[1] + 1));
                
                // highlights empty space two ahead of pawn
                if (pawn.id[1] === '1') { 
                    if (emptySpaces.includes(pawn.id[0] + (+pawn.id[1] + 2))) {
                        
                        document.getElementById(
                            pawn.id[0] + (+pawn.id[1] + 2)
                        ).classList.add('lit');

                        litDivs.push(pawn.id[0] + (+pawn.id[1] + 2));

                        // ENPASSANT for orange pawn
                        passiveSide.forEach(item => {
                            if (item.name === 'pawn') {
                                if (item.id[1] === '3') { // one column right
                                    if (item.id[0] == (+pawn.id[0] + 1)) {
                                        enPassantCell = pawn.id[0] + (+pawn.id[1] + 1);
                                        enPassantables.push(item);
                                    } // one column left
                                    if (item.id[0] == (+pawn.id[0] - 1)) {
                                        enPassantCell = pawn.id[0] + (+pawn.id[1] + 1);
                                        enPassantables.push(item);
                                    }
                                }
                            }
                        });
                    }
                }
            }
        }
        // ========================================================================================
        // moves pawn to clicked litDiv
        litDivs.forEach(item => { // item is an id
            document.getElementById(item).addEventListener(
                'click', movePawn
            );
        });
    }
    
    function movePawn(e) {
        // un-highlights pawn
        if (tempId.length) {
            document.getElementById(tempId[0]).removeEventListener(
                'click', pieceLit);
            document.getElementById(tempId[0]).classList.remove('mainLit');
            tempId = [];
        }
        // un-highlights all litDivs
        litDivs.forEach(item => {
            document.getElementById(item).classList.remove('lit')
        });
        // highlights enPassant cell, if an option
        // if (enPassantables.length) {
        //     if (enPassantables.includes(pawn)) {
        //         document.getElementById(enPassantCell).name = 'enPassantable';
        //         document.getElementById(enPassantCell).classList.add('lit');
        //         litDivs.push(enPassantCell);
        //     }
        // }
        // -----------------------------------------------------------------
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
            else { // THIS NEEDS STRAIGHTENING UP!!
                // pushes eaten piece's image to its takenBox div
                if (e.target.classList.contains('blue')) {
                    document.getElementById(
                        orangeTakenBoxIdCounter.toString()
                    ).src = e.target.src;
                    orangeTakenBoxIdCounter -= 1;
                } else {
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
                } else { // since pawn is orange...
                    e.target.classList.remove('blue');
                    e.target.classList.add('orange');
                    pawn.classList.remove('orange');
                }
                // gets index for clicked space
                index2 = passiveSide.indexOf(e.target);
                // removes eaten piece from passiveSide array
                passiveSide.splice(index2, 1);
            }
        } else { // since no is piece eaten --> e.target.name === ''
            if (blues.includes(pawn)) { // if pawn is blue
                e.target.classList.add('blue');
                pawn.classList.remove('blue');
                // e.target.classList.remove('orange');
            } else { // updates classList for pawn & e.target
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
    }
    //========================================================================================

    function knightLit() {
        // good! highlights attackable pieces & its emptySpaces
        block1 = false;
        block2 = false;
        block3 = false;
        block4 = false;
        block5 = false;
        block6 = false;
        block7 = false;
        block8 = false;
        litDivs = [];
        tempId.push(knight.id);

        // highlights clicked knight
        document.getElementById(knight.id).classList.add('mainLit');

        // if own pieces occupy knight space, no highlight there
        activeSide.forEach(piece => {
            switch (+piece.id[0]) {
                case (+knight.id[0] + 1):
                    if (piece.id[1] == (+knight.id[1] + 2)) { block1 = true; break; }
                    if (piece.id[1] == (+knight.id[1] - 2)) { block2 = true; break; }
                case (+knight.id[0] - 1):
                    if (piece.id[1] == (+knight.id[1] + 2)) { block3 = true; break; }
                    if (piece.id[1] == (+knight.id[1] - 2)) { block4 = true; break; }
                case (+knight.id[0] + 2):
                    if (piece.id[1] == (+knight.id[1] + 1)) { block5 = true; break; }
                    if (piece.id[1] == (+knight.id[1] - 1)) { block6 = true; break; }
                case (+knight.id[0] - 2):
                if (piece.id[1] == (+knight.id[1] + 1)) { block7 = true; break; }
                if (piece.id[1] == (+knight.id[1] - 1)) { block8 = true; break; }
            }
        });

        if (!block1) {
            if ((+knight.id[0] + 1) < 8) { // FILTERS OUT OFF-BOARD KNIGHT MOVES
                if ((+knight.id[1] + 2) < 8) {
                    document.getElementById(
                        (+knight.id[0] + 1).toString() + (+knight.id[1] + 2).toString()
                    ).classList.add('lit');
                    litDivs.push((+knight.id[0] + 1).toString() + (+knight.id[1] + 2).toString());
                }
            }
        }
        if (!block2) {
            if ((+knight.id[0] + 1) < 8) {
                if ((+knight.id[1] - 2) >= 0) {
                    document.getElementById(
                        (+knight.id[0] + 1).toString() + (+knight.id[1] - 2).toString()
                    ).classList.add('lit');
                    litDivs.push((+knight.id[0] + 1).toString() + (+knight.id[1] - 2).toString());
                }
            }
        }
        if (!block3) {
            if ((+knight.id[0] - 1) >= 0) {
                if ((+knight.id[1] + 2) < 8) {
                    document.getElementById(
                        (+knight.id[0] - 1).toString() + (+knight.id[1] + 2).toString()
                    ).classList.add('lit');
                    litDivs.push((+knight.id[0] - 1).toString() + (+knight.id[1] + 2).toString());
                }
            }
        }
        if (!block4) {
            if ((+knight.id[0] - 1) >= 0) {
                if ((+knight.id[1] - 2) >= 0) {
                    document.getElementById(
                        (+knight.id[0] - 1).toString() + (+knight.id[1] - 2).toString()
                    ).classList.add('lit');
                    litDivs.push((+knight.id[0] - 1).toString() + (+knight.id[1] - 2).toString());
                }
            }
        }
        if (!block5) {
            if ((+knight.id[0] + 2) < 8) {
                if ((+knight.id[1] + 1) < 8) {
                    document.getElementById(
                        (+knight.id[0] + 2).toString() + (+knight.id[1] + 1).toString()
                    ).classList.add('lit');
                    litDivs.push((+knight.id[0] + 2).toString() + (+knight.id[1] + 1).toString());
                }
            }
        }
        if (!block6) {
            if ((+knight.id[0] + 2) < 8) {
                if ((+knight.id[1] - 1) >= 0) {
                    document.getElementById(
                        (+knight.id[0] + 2).toString() + (+knight.id[1] - 1).toString()
                    ).classList.add('lit');
                    litDivs.push((+knight.id[0] + 2).toString() + (+knight.id[1] - 1).toString());
                }
            }
        }
        if (!block7) {
            if ((+knight.id[0] - 2) >= 0) {
                if ((+knight.id[1] + 1) < 8) {
                    document.getElementById(
                        (+knight.id[0] - 2).toString() + (+knight.id[1] + 1).toString()
                    ).classList.add('lit');
                    litDivs.push((+knight.id[0] - 2).toString() + (+knight.id[1] + 1).toString());
                }
            }
        }
        if (!block8) {
            if ((+knight.id[0] - 2) >= 0) {
                if ((+knight.id[1] - 1) >= 0) {
                    document.getElementById(
                        (+knight.id[0] - 2).toString() + (+knight.id[1] - 1).toString()
                    ).classList.add('lit');
                    litDivs.push((+knight.id[0] - 2).toString() + (+knight.id[1] - 1).toString());
                }
            }
        }
    } // DONE --> NEEDS moveKnight(e)

    function bishopLit() {
        // FIX: bishop doesn't highlight attackable pieces
        // need to pass in queen somehow --> parameter
        litDivs = [];
        tempId.push(bishop.id);

        // highlights clicked bishop
        document.getElementById(bishop.id).classList.add('mainLit');

        function one() {
            bishopX = (+bishop.id[0] + 1);
            bishopY = (+bishop.id[1] + 1);

            // while bishop's path is an empty space
            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(
                    bishopX.toString() + bishopY.toString()
                ).classList.add('lit');
                litDivs.push(bishopX.toString() + bishopY.toString());

                bishopX += 1;
                bishopY += 1;
            }
            // for each activeSide piece
            // if 
            for (let i = 0; i < activeSide.length; i++) {
                if (passiveSide[i].id[0] == bishopX) {
                    if (passiveSide[i].id[1] == bishopY) {
                        document.getElementById(
                            bishopX.toString() + bishopY.toString()
                        ).classList.add('lit');
                        litDivs.push(bishopX.toString() + bishopY.toString());
                    }
                }
            } // capsulate these in a function with bishopX&Y in switch!
        }

        function two() {
            bishopX = (+bishop.id[0] + 1);
            bishopY = (+bishop.id[1] - 1);

            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(
                    bishopX.toString() + bishopY.toString()
                ).classList.add('lit');
                litDivs.push(bishopX.toString() + bishopY.toString());

                bishopX += 1;
                bishopY -= 1;
            }
            for (let i = 0; i < activeSide.length; i++) {
                if (passiveSide[i].id[0] == bishopX) {
                    if (passiveSide[i].id[1] == bishopY) {
                        document.getElementById(
                            bishopX.toString() + bishopY.toString()
                        ).classList.add('lit');
                        litDivs.push(bishopX.toString() + bishopY.toString());
                    }
                }
            }
        }

        function three() {
            bishopX = (+bishop.id[0] - 1);
            bishopY = (+bishop.id[1] + 1);

            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(
                    bishopX.toString() + bishopY.toString()
                ).classList.add('lit');
                litDivs.push(bishopX.toString() + bishopY.toString());

                bishopX -= 1;
                bishopY += 1;
            }
            for (let i = 0; i < activeSide.length; i++) {
                if (passiveSide[i].id[0] == bishopX) {
                    if (passiveSide[i].id[1] == bishopY) {
                        document.getElementById(
                            bishopX.toString() + bishopY.toString()
                        ).classList.add('lit');
                        litDivs.push(bishopX.toString() + bishopY.toString());
                    }
                }
            }
        }

        function four() {
            bishopX = (+bishop.id[0] - 1);
            bishopY = (+bishop.id[1] - 1);

            while (emptySpaces.includes(bishopX.toString() + bishopY.toString())) {
                document.getElementById(
                    bishopX.toString() + bishopY.toString()
                ).classList.add('lit');
                litDivs.push(bishopX.toString() + bishopY.toString());

                bishopX -= 1;
                bishopY -= 1;
            }
            for (let i = 0; i < activeSide.length; i++) {
                if (passiveSide[i].id[0] == bishopX) {
                    if (passiveSide[i].id[1] == bishopY) {
                        document.getElementById(
                            bishopX.toString() + bishopY.toString()
                        ).classList.add('lit');
                        litDivs.push(bishopX.toString() + bishopY.toString());
                    }
                }
            }
        } // good!
        one();
        two();
        three();
        four();
    } // DONE --> NEEDS bishopMove(e) & highlight attackable pieces

    function rookLit() {
        litDivs = [];
        tempId.push(rook.id);

        // highlights clicked rook
        document.getElementById(rook.id).classList.add('mainLit');

        function first() {
            rookX = (+rook.id[0] - 1);

            while (emptySpaces.includes(rookX.toString() + rook.id[1].toString())) {
                document.getElementById(
                    rookX.toString() + rook.id[1].toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.id[1].toString());

                rookX -= 1;
            }
            if (passiveSide.includes(rookX.toString() + rook.id[1].toString())) {
                document.getElementById(
                    rookX.toString() + rook.id[1].toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.id[1].toString());
            }
        }

        function second() {
            rookX = (+rook.id[0] + 1);

            while (emptySpaces.includes(rookX.toString() + rook.id[1].toString())) {
                document.getElementById(
                    rookX.toString() + rook.id[1].toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.id[1].toString());

                rookX += 1;
            }
            if (passiveSide.includes(rookX.toString() + rook.id[1].toString())) {
                document.getElementById(
                    rookX.toString() + rook.id[1].toString()
                ).classList.add('lit');
                litDivs.push(rookX.toString() + rook.id[1].toString());
            }
        }

        function third() {
            rookY = (+rook.id[1] - 1);

            while (emptySpaces.includes(rook.id[0].toString() + rookY.toString())) {
                document.getElementById(
                    rook.id[0].toString() + rookY.toString()
                ).classList.add('lit');
                litDivs.push(rook.id[0].toString() + rookY.toString());

                rookY -= 1;
            }
            if (passiveSide.includes(rook.id[0].toString() + rookY.toString())) {
                document.getElementById(
                    rook.id[0].toString() + rookY.toString()
                ).classList.add('lit');
                litDivs.push(rook.id[0].toString() + rookY.toString());
            }
        }

        function fourth() {
            rookY = (+rook.id[1] + 1);

            while (emptySpaces.includes(rook.id[0].toString() + rookY.toString())) {
                document.getElementById(
                    rook.id[0].toString() + rookY.toString()
                ).classList.add('lit');
                litDivs.push(rook.id[0].toString() + rookY.toString());

                rookY += 1;
            }
            if (passiveSide.includes(rook.id[0].toString() + rookY.toString())) {
                document.getElementById(
                    rook.id[0].toString() + rookY.toString()
                ).classList.add('lit');
                litDivs.push(rook.id[0].toString() + rookY.toString());
            }
        }
        first();
        second();
        third();
        fourth();
    }

    function queenLit() { // NEEDS UN-HIGHIGHTING
        bishopLit();
        rookLit();
    }

    function kingLit() {
        litDivs = [];
        tempId.push(king.id);

        // highlights clicked king
        document.getElementById(king.id).classList.add('mainLit');

        // NOTHING ELSE WORKS!!

        function exclude(res1, res2) {
            return res1.filter(obj => { // obj --> each item in res1
                return !res2.some(obj2 => { // obj --> each item in res2
                    return obj.x === obj2.x && obj.y === obj2.y
                }) // returns true if at least one doesn't match x & y
            });
        } // excludes res2 from res1

        kingSpaces = [
            { x: king.dataset.x - 1, y: king.dataset.y },
            { x: king.dataset.x - 1, y: king.dataset.y + 1 },
            { x: king.dataset.x, y: king.dataset.y + 1 },
            { x: king.dataset.x + 1, y: king.dataset.y + 1 },
            { x: king.dataset.x + 1, y: king.dataset.y },
            { x: king.dataset.x + 1, y: king.dataset.y - 1 },
            { x: king.dataset.x, y: king.dataset.y - 1 },
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

    function pieceLit(e) { // on-click of an activeSide piece

        if (tempId.length) { // un-highlights all cells
            document.getElementById(tempId[0]).classList.remove('mainLit');
            tempId = [];
            litDivs.forEach(item => {
                document.getElementById(item).classList.remove('lit');
            });
        } // WORKS!
        
        litDivs.forEach(item => { // item is an id
            document.getElementById(item).removeEventListener(
                'click',
                movePawn // add all the other ones moveKnight, ect.
            );
        });

        // highlights clicked piece's possible moves
        switch (e.target.name) { 
            case 'pawn':
                pawn = e.target;
                pawnLit();
                break;
            case 'knight':
                knight = e.target;
                knightLit();
                break;
            case 'bishop':
                bishop = e.target;
                bishopLit();
                break;
            case 'rook':
                rook = e.target;
                rookLit();
                break;
            case 'queen':
                bishop = e.target;
                rook = e.target;
                queenLit();
                break;
            case 'king':
                king = e.target;
                kingLit();
                break;
        }
    }
    // adds click-listeners to all activeSide pieces
    activeSide.forEach(piece => { // on-click run pieceLit()
        document.getElementById(piece.id).addEventListener(
            'click', pieceLit
        );
    });
}
lit(blues, oranges);


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

// for each piece lit div,  --> 'click', move()
// board.classList.remove('lit', 'mainLit')