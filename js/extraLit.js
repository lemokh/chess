function lit(activeSide, passiveSide) {
    litDivs = []; // holds lit ids on which to apply click-listeners
    tempId = []; // for un-highlighting all cells on clicking new piece
    emptySpaces = openSpaces(boardIds, pieces); // updates emptySpaces
    //======================================
    // function toggleClocks() {}
    //======================================
    // swaps pieceToMove & goToDiv info
    function swapSide() {
        console.log('enters swapSide()');
        // re-informs goToDiv
        goToDiv.name = pieceToMove.name;
        goToDiv.side = pieceToMove.side;
        goToDiv.src = pieceToMove.src;
        // ---------------------------------------------
        // gets pieceToMove's activeSide index
        index1 = activeSide.indexOf(pieceToMove);
        // removes now-empty pieceToMove from activeSide    
        activeSide.splice(index1, 1);
        // ---------------------------------------------
        // un-informs pieceToMove
        pieceToMove.name = ''; 
        pieceToMove.side = ''; 
        pieceToMove.src = './images/transparent.png';
        // ---------------------------------------------
        // updates activeSide & pieces array
        activeSide.push(goToDiv);
        pieces = [...oranges, ...blues];
    }
    //==================================================
    // eat(goToDiv) --> normal pawn attack
    // eat(pawnJumpDiv) --> enPassant attack
    function eat(element) {
        console.log('enters eat('+element+')');
        // puts element in its proper takenBox
        if (activeSide === blues) { // if blue side
            document.getElementById(
                blueTakenBoxIdCounter.toString()
            ).src = element.src;

            blueTakenBoxIdCounter -= 1;
        }
        else { // since orange turn, does the same
            document.getElementById(
                orangeTakenBoxIdCounter.toString()
            ).src = element.src;

            orangeTakenBoxIdCounter -= 1;
        }
        // gets element's passiveSide index
        index2 = passiveSide.indexOf(element);
        // removes eaten piece from passiveSide array
        passiveSide.splice(index2, 1);
        // un-informs pawnJumpDiv
        element.side = '';
        element.name = '';
        element.src = './images/transparent.png'
    }
    //=============================================
    function movePiece(e) {
        console.log('enters movePiece(e)');
        console.log('removes click-listener from litDivs');
        // removes click-listeners from pieceToMove
        document.getElementById(
            pieceToMove.id
        ).removeEventListener('click', pieceLit);
        // removes click-listeners from litDivs
        litDivs.forEach(litDiv => {
            document.getElementById(
                litDiv
            ).removeEventListener('click', movePiece);
        });
        // -----------------------------------------------------------------
        console.log('un-lightens mainDiv & litDivs');
        // un-lightens mainDiv
        document.getElementById(
            pieceToMove.id
        ).classList.remove('mainLit');
        // un-lightens litDivs
        litDivs.forEach(litDiv => {
            document.getElementById(
                litDiv
            ).classList.remove('lit');
        });
        // -----------------------------------------------------------------
        tempId = []; // ?
        // -----------------------------------------------------------------
        goToDiv = e.target;

        console.log('goToDiv  = e.target -->');
        console.log(goToDiv);
        console.log('pawnJumpDiv -->');
        console.log(pawnJumpDiv);
        //---------------------------------------------------------------------
        if (!pawnJumpDiv) {
            if (pieceToMove.id[1] === pawnJumpDiv.id[1]) {
                if (pieceToMove.id[0] === (+pawnJumpDiv.id[0] + 1)
                   || pieceToMove.id[0] === (pawnJumpDiv.id[0] - 1)
                ) { enPassanting = true;}
            }
        }
        //---------------------------------------------------------------------
        // if goToDiv IS empty
        if (goToDiv.side === '') {
            console.log('goToDiv IS empty');
            if (enPassanting) {
                // covers enPassant attack
                if (goToDiv.id === pawnJumpDiv.id[0] + 
                    (pawnJumpDiv.id[1] - 1)
                    || // assign individually??
                    goToDiv.id === pawnJumpDiv.id[0] + 
                    (+pawnJumpDiv.id[1] + 1)
                ) { eat(pawnJumpDiv); }
            }
            // covers pawnToMove moving one or two empty spaces
            swapSide();
        }
        else { // since goToDiv is NOT empty
            console.log('goToDiv NOT empty');
            eat(goToDiv); // pieceToMove eats goToDiv
        }
        // -----------------------------------------------------------------
        // removes click-listeners from activePieces
        activeSide.forEach(activePiece => {
            document.getElementById(
                activePiece.id
            ).removeEventListener('click', pieceLit);
        });
        // -----------------------------------------------------------------
        // toggles side & starts next move 
        if (activeSide === blues) {
            // toggleClocks();
            console.log('toggles side');
            lit(oranges, blues);
        } else {
            // toggleClocks();
            console.log('toggles side');
            lit(blues, oranges);
        }
    }
    //=============================================
    //=============================================
    //=============================================
    //=============================================
    //=============================================
    //=============================================
    //=============================================
    //=============================================
    //=============================================
    //=============================================
    function pawnLit() {
        // highlights enPassant cell, if an option
        console.log('enters pawnLit()');
        console.log('pawnJumpDiv -->');
        console.log(pawnJumpDiv);
        // enPassantedPawn = document.getElementById(enPassantCell);
        //---------------------------------------------------
        // highlights all possible moves for blue pawnToMove
        if (activeSide === blues) {
            // collects where blue pawnToMove can enPassant attack
            if (pawnJumpDiv !== undefined) {
                // if blue pawnToMove & pawnJump share row
                if (pieceToMove.id[1] === pawnJumpDiv.id[1]) {
                    // and if besides eachother
                    if (pieceToMove.id[0] == (+pawnJumpDiv.id[0] + 1)) {
                        // adds enPassant attack div to litDivs
                        litDivs.push(
                            pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1) 
                        );
                    } // and if besides eachother
                    if (pieceToMove.id[0] == (pawnJumpDiv.id[0] - 1)) {
                        // adds enPassant attack div to litDivs
                        litDivs.push(
                            pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1) 
                        );
                    }
                }
            }
            // collects where blue pawnToMove can attack
            passiveSide.forEach(passivePiece => {
                // if passivePiece is one row ahead of blue pawnToMove
                if (passivePiece.id[1] == (pieceToMove.id[1] - 1)) {
                    // if passivePiece is right beside blue pawnToMove
                    if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
                        litDivs.push(passivePiece.id);
                    }
                    // if passivePiece is left beside blue pawnToMove
                    if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
                        litDivs.push(passivePiece.id);
                    }
                }
            });
            //---------------------------------------------------
            // collects empty space one ahead of blue pawnToMove
            if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).side === '') { 
                litDivs.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));
                //---------------------------------------------------
                //---------------------------------------------------
                // collects empty space two ahead of blue pawnToMove
                // if blue pawnToMove in row 6
                if (pieceToMove.id[1] === '6') {
                    // if empty cell two ahead of blue pawnToMove
                    if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 2)).side === '') {
                        // adds that empty cell to litDivs array & pawnJumpDiv.id
                        pawnJumpDiv = document.getElementById(
                            pieceToMove.id[0] + (pieceToMove.id[1] - 2)
                        );
                        litDivs.push(pawnJumpDiv.id);
                    }
                }
            }
        }
        else { // since activeSide === oranges...
            // collects where orange pawnToMove can enPassant attack
            if (pawnJumpDiv !== undefined) {
                // if orange pawnToMove & pawnJumpDiv share row
                if (pieceToMove.id[1] === pawnJumpDiv.id[1]) {
                    // and if beside eachother
                    if (pieceToMove.id[0] == (+pawnJumpDiv.id[0] + 1)) {
                        // adds enPassant attack div to litDivs
                        litDivs.push(
                            pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1) 
                        );
                    } // and if beside eachother
                    if (pieceToMove.id[0] == (pawnJumpDiv.id[0] - 1)) {
                        // adds enPassant attack div to litDivs
                        litDivs.push(
                            pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1) 
                        );
                    }
                }
            }
            // collects where orange pawnToMove can attack
            passiveSide.forEach(passivePiece => {
                // if passivePiece is one row ahead of orange pawnToMove
                if (passivePiece.id[1] == (+pieceToMove.id[1] + 1)) {
                    // if passivePiece is right beside orange pawnToMove
                    if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
                        litDivs.push(passivePiece.id);
                    }
                    // if passivePiece is left beside orange pawnToMove
                    if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
                        litDivs.push(passivePiece.id);
                    }
                }
            });
            // collects empty space one ahead of orange pawnToMove
            if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 1)).side === '') { 
                litDivs.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));
                //---------------------------------------------------
                //---------------------------------------------------
                // collects empty space two ahead of orange pawnToMove
                // if orange pawnToMove in row 1
                if (pieceToMove.id[1] === '1') {
                    // if empty cell two ahead of orange pawnToMove
                    if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 2)).side === '') {
                        // adds that empty cell to litDivs array & pawnJumpDiv.id
                        pawnJumpDiv.id = pieceToMove.id[0] + (+pieceToMove.id[1] + 2);
                        pawnJumpDiv = document.getElementById(pawnJumpDiv.id);
                        litDivs.push(pawnJumpDiv.id);
                    }
                }
            }
            //--------------------------------------------------
            // -------------------------------------------------
            // -------------------------------------------------
            // ENPASSANT for orange pawn
                        // passiveSide.forEach(passivePiece => {
                        //     if (passivePiece.name === 'pawn') {
                        //         if (passivePiece.id[1] === '3') { // one column right
                        //             if (passivePiece.id[0] == (+pieceToMove.id[0] + 1)) {
                        //                 enPassantCell = pieceToMove.id[0] + (+pieceToMove.id[1] + 1);
                        //                 if (enPassantables.length) {
                        //                     if (enPassantables[0] !== passivePiece) {
                        //                         // collects pawn that can attack enPassantCell on next move
                        //                         enPassantables.push(passivePiece);
                        //                         console.log('enPassantables -->');
                        //                         console.log(enPassantables);
                        //                     }
                        //                 } else {
                        //                     // collects pawn that can attack enPassantCell on next move
                        //                     enPassantables.push(passivePiece);
                        //                     console.log('enPassantables -->');
                        //                     console.log(enPassantables);
                        //                 }
                        //             } // one column left
                        //             if (passivePiece.id[0] == (pieceToMove.id[0] - 1)) {
                        //                 enPassantCell = pieceToMove.id[0] + (+pieceToMove.id[1] + 1);
                        //                 if (enPassantables.length) {
                        //                     if (enPassantables[0] !== passivePiece) {
                        //                         // collects pawn that can attack enPassantCell on next move
                        //                         enPassantables.push(passivePiece);
                        //                         console.log('enPassantables -->');
                        //                         console.log(enPassantables);
                        //                     }
                        //                 } else {
                        //                     // collects pawn that can attack enPassantCell on next move
                        //                     enPassantables.push(passivePiece);
                        //                     console.log('enPassantables -->');
                        //                     console.log(enPassantables);
                        //                 }
                        //             }
                        //         }
                        //     }
                        // });
                    // }
                // }
            // }
        }
        // =======================================================
        litDivs.forEach(litDiv => {
            document.getElementById(litDiv).classList.add('lit');
        });
    }
    //============================================================
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
    }
    //============================================================
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
        }
        
        quadrant(+pieceToMove.id[0] + 1, +pieceToMove.id[1] + 1);
        quadrant(+pieceToMove.id[0] + 1, pieceToMove.id[1] - 1);
        quadrant(pieceToMove.id[0] - 1, +pieceToMove.id[1] + 1);
        quadrant(pieceToMove.id[0] - 1, pieceToMove.id[1] - 1);
    }
    //============================================================
    function rookLit() {
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
        first(+pieceToMove.id[0] + 1);
        first(pieceToMove.id[0] - 1);
        second(+pieceToMove.id[1] + 1);
        second(pieceToMove.id[1] - 1);
    }
    //============================================================
    function kingLit() {
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

        kingSpacesUnderAttack = [];

        // array of kingSpaces devoid of kingSide pieces
        openAndOpponentHeldKingSpaces = kingSpaces.filter(kingSpace => { // each item in arr
                return !activeSide.some(activePiece => { // each item in arr2
                    return kingSpace == activePiece.id;
                }); // returns true if not a match
            }); //console.log(openAndOpponentHeldKingSpaces);
        
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
        // console.log(openAndOpponentHeldKingSpaces);
        
        // removes any of those spaces from kingSpaces
        kingSpaces = openAndOpponentHeldKingSpaces.filter(nonOwnKingSpace => { // each item in arr
            return !kingSpacesUnderAttack.some(checkedKingSpace => { // each item in arr2
                return nonOwnKingSpace == checkedKingSpace;
            }); // returns true if not a match
        }); // console.log(kingSpaces);
        
        // highlights kingSpaces
        kingSpaces.forEach(space => {
            document.getElementById(space).classList.add('lit');
            litDivs.push(space);
        });
    }
    //============================================================
    //============================================================
    //============================================================
    function pieceLit(e) {
        console.log('enters pieceLit(e)');
        // -------------------------------------------------------
        // resets activeSide cells when any clicked
        if (tempId.length) {
            // un-lightens temp[0] --> mainLitDiv
            document.getElementById(
                tempId[0]
            ).classList.remove('mainLit');
            // un-lightens litDivs
            litDivs.forEach(litDiv => {
                document.getElementById(
                    litDiv
                ).classList.remove('lit');
            });
            // ---------------------------------------
            tempId = []; // ??
            // ---------------------------------------
        }
        // -------------------------------------------
        pieceToMove = e.target;
        console.log('pieceToMove -->');
        console.log(pieceToMove);
        // -------------------------------------------
        litDivs = [];
        tempId.push( pieceToMove.id );
        // highlights clicked pieceToMove
        document.getElementById(
            pieceToMove.id
        ).classList.add('mainLit');
        // -----------------------------------------------------
        // removes click-listener from litDivs
        litDivs.forEach(litDiv => {
            document.getElementById(litDiv).removeEventListener(
                'click', movePiece
            );
        });
        // -----------------------------------------------------
        console.log('enters switch('+pieceToMove.name+')');
        // highlights all of clicked piece's possible moves
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
        // console.log(litDivs);
        // -------------------------------------------------------
        console.log('click-listens to litDivs --> movePiece(e)');
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
        // ---------------------------------------------------------
    }
    //==============================================================
    // runs pieceLit(e) for all clicked activeSide pieces
    activeSide.forEach(activePiece => {
        document.getElementById(
            activePiece.id
        ).addEventListener('click', pieceLit);
        console.log('click-listens to activeSide --> pieceLit(e)');
    });
} //================================================================
lit(blues, oranges);