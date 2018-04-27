function lit(activeSide, passiveSide) {
    litDivs = []; // holds lit ids on which to apply click-listeners
    tempId = []; // for un-highlighting all cells on clicking new piece
    emptySpaces = openSpaces(boardIds, pieces); // updates emptySpaces
    //=============================================
    // function toggleClocks() {}
    //=============================================
    function enPassantReset() {
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
    //=============================================
    function swapSide (fromDiv, toDiv) {
        // swaps pieceToMove & goToDiv info
        console.log('ENTERS swapSide()');

        // re-informs goToDiv --> NOT WORKING!
        toDiv.setAttribute('data-name', fromDiv.dataset.name);
        toDiv.setAttribute('data-side', fromDiv.dataset.side);
        toDiv.setAttribute('src', fromDiv.src);
        // ---------------------------------------------
        // ---------------------------------------------
        // gets pieceToMove's activeSide index
        index1 = activeSide.indexOf(pieceToMove);
        // removes now-empty pieceToMove from activeSide    
        activeSide.splice(index1, 1);
        // ---------------------------------------------       
        // updates activeSide & pieces array
        activeSide.push(toDiv);
        pieces = [...oranges, ...blues];
        // ---------------------------------------------
        // pieceToMove.getAttribute('data-name') is already 'empty' here
        if (pieceToMove.getAttribute('data-name') === 'pawn') {
            console.log('!!!!!!!');
            if (goToDiv !== pawnJumpDiv) {
                enPassantReset();
            }
        } else { enPassantReset(); } // necessary!
        // ---------------------------------------------
        // un-informs pieceToMove
        fromDiv.setAttribute('data-name', 'empty'); 
        fromDiv.setAttribute('data-side', 'empty'); 
        fromDiv.setAttribute('src', './images/transparent.png');
        
        console.log('EXITS swapSide()');
    }
    //=============================================
    // eat(goToDiv); --> normal pawn attack
    // eat(pawnJumpDiv); --> enPassant attack
    // --------------------------------------------
    function eat(element) {
        console.log('ENTERS eat('+element+')');
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
        // CONSOLE.LOG THE HELL OUT OF THIS!
        console.log('passiveSide -->');
        console.log(passiveSide);
        // gets element's passiveSide index
        index2 = passiveSide.indexOf(element);
        // removes eaten piece from passiveSide array
        passiveSide.splice(index2, 1);

        console.log('passiveSide -->');
        console.log(passiveSide);
        // ---------------------------------------------
        console.log('EXITS eat()');
    }
    //=============================================
    function movePiece(e) {
        console.log('ENTERS movePiece(e)');
        console.log('removes click-listener from litDivs & pieceToMove');
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
        if (pieceToMove.getAttribute('data-name') === 'king') {
            if (pieceToMove.getAttribute('data-side') === 'blue') {
                blueKingFirstMove = true;
            } else { orangeKingFirstMove = true; }
        }
        // -----------------------------------------------------------------
        if (pieceToMove.getAttribute('data-name') === 'rook') {
            if (pieceToMove.getAttribute('data-side') === 'blue') {
                if (pieceToMove.id === '07') {
                    blueRook1FirstMove = true;
                } else if (pieceToMove.id === '77') {
                    blueRook2FirstMove = true;
                }
            } else {
                if (pieceToMove.id === '00') {
                    orangeRook1FirstMove = true;
                } else if (pieceToMove.id === '70') {
                    orangeRook2FirstMove = true;
                }
            }
        }
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

        console.log('goToDiv -->');
        console.log(goToDiv);
        
        console.log('pieceToMove -->');
        console.log(pieceToMove);
        
        console.log('pawnJumpDiv -->');
        console.log(pawnJumpDiv);
        //---------------------------------------------------------------------
       
        //---------------------------------------------------------------------
        // if goToDiv IS empty
        if (goToDiv.getAttribute('data-side') === 'empty') {
            console.log('goToDiv IS empty');            
            // covers anySide enPassant pawn attack
            if (pieceToMove.getAttribute('data-name') === 'pawn') {
                if (enPassanting) {
                    if (goToDiv === enPassantDiv) {
                        eat(pawnJumpDiv); // WORKS!... I think
                        // ---------------------------                        
                        // sets pawnJumpDiv to empty cell
                        pawnJumpDiv.setAttribute('data-name', 'empty');
                        pawnJumpDiv.setAttribute('data-side', 'empty');
                        pawnJumpDiv.setAttribute('src', './images/transparent.png');
                    }
                }
                // covers bluePawn taking any NON-enPassant empty space
                if (activeSide === blues) { // if blue's turn
                    // if pawnToMove jumps two spaces
                    if (goToDiv.id === (pieceToMove.id[0] + (pieceToMove.id[1] - 2))) {
                        enPassanting = true;
                        console.log('enPassanting = true');
                        
                        pawnJumpDiv = goToDiv;
                        console.log('pawnJumpDiv = goToDiv');
                    } // else { // pawnToMove jumps one space
                    //     enPassanting = false;
                    //     console.log('enPassanting = false');
                    //     pawnJumpDiv = undefined;
                    // } // un-needed?
                }
                else { // since orange's turn...
                    // if pawnToMove jumps two spaces
                    if (goToDiv.id === (pieceToMove.id[0] + (+pieceToMove.id[1] + 2))) {
                        enPassanting = true;
                        console.log('enPassanting = true');
                        
                        pawnJumpDiv = goToDiv;
                        console.log('pawnJumpDiv = goToDiv');
                    } // else { // pawnToMove jumps one space
                        // enPassanting = false;
                        // pawnJumpDiv = undefined;
                    // } // un-needed?
                }
            }
        }
        else { // since goToDiv's side !== empty
            console.log('goToDiv NOT empty');
            // ADD CONDITONS FOR ELSE HERE!!
            // MAKE A SPECIAL CASTLELIT CLASS JUST FOR CASTLING
            if (castling) {
                if (pieceToMove.getAttribute('data-name') === 'king') {                   
                    switch (goToDiv.id) {
                        case '27': 
                            document.getElementById('27').classList.add('castleLit');
                            document.getElementById('27').removeEventListener('click', pieceLit);
                            swapSide(pieceToMove, goToDiv);
                            swapSide(document.getElementById('07'), document.getElementById('37')
                            );
                            break;
                        case '67':
                            document.getElementById('67').classList.add('castleLit');
                            document.getElementById('67').removeEventListener('click', pieceLit);
                            swapSide(pieceToMove, goToDiv);
                            swapSide(document.getElementById('77'), document.getElementById('57'));
                            break;
                        case '20':
                            document.getElementById('20').classList.add('castleLit');
                            document.getElementById('20').removeEventListener('click', pieceLit);
                            swapSide(pieceToMove, goToDiv);
                            swapSide(document.getElementById('00'), document.getElementById('30'));
                            break;
                        case '70':
                            document.getElementById('70').classList.add('castleLit');
                            document.getElementById('70').removeEventListener('click', pieceLit);
                            swapSide(pieceToMove, goToDiv);
                            swapSide(document.getElementById('70'), document.getElementById('50'));
                            break;
                    }
                }
                castling = false;
                // REMOVE CLICK-LISTENER FROM CASTLELIT DIV
            }
            else { eat(goToDiv); } // pieceToMove eats goToDiv
        }
        // covers pawnToMove moving one or two empty spaces
        //======================================
        swapSide(pieceToMove, goToDiv);
        // ---------------------------------------------
        // removes click-listeners from activePieces
        activeSide.forEach(activePiece => {
            document.getElementById(
                activePiece.id
            ).removeEventListener('click', pieceLit);
        });
        // -----------------------------------------------
        // -----------------------------------------------
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
    function pawnLit() {
        // highlights enPassant cell, if an option
        console.log('enters pawnLit()');
        console.log('pawnJumpDiv -->');
        console.log(pawnJumpDiv);
        // enPassantedPawn = document.getElementById(enPassantCell);
        //---------------------------------------------------
        //---------------------------------------------------
        // highlights all possible moves for blue pawnToMove
        if (activeSide === blues) { // if blue's turn
            // if enPassant attack is possible
            if (enPassanting) { // if (pawnJumpDiv.length) {}
                // covers enPassant attack
                // if bluePawnToMove is besides pawnJump
                if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
                || (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
                    // adds bluePawnToMove's enPassant-attack-div to litDivs
                    enPassantDiv = document.getElementById(
                        pawnJumpDiv.id[0] + (pawnJumpDiv.id[1] - 1) 
                    );
                    litDivs.push(enPassantDiv.id);
                }
            }
            
            /*
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
            */
            // collects potential normal attack divs
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
            if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 1)).dataset.side === 'empty') { 
                litDivs.push(pieceToMove.id[0] + (pieceToMove.id[1] - 1));
                //---------------------------------------------------
                //---------------------------------------------------
                // collects empty space two ahead of blue pawnToMove
                // if blue pawnToMove in row 6
                if (pieceToMove.id[1] === '6') {
                    // if empty cell two ahead of blue pawnToMove
                    if (document.getElementById(pieceToMove.id[0] + (pieceToMove.id[1] - 2)).dataset.side === 'empty') {
                        // adds that empty cell to litDivs array & pawnJumpDiv.id
                        // pawnJumpDiv = document.getElementById(
                        //     pieceToMove.id[0] + (pieceToMove.id[1] - 2)
                        // );
                        litDivs.push(pieceToMove.id[0] + (pieceToMove.id[1] - 2));
                    }
                }
            }
        } // WORKS!
        else { // since orange's turn...
            // if enPassant attack is possible
            if (enPassanting) { // if(pawnJumpDiv.length) {}
                if ((pieceToMove.id === (pawnJumpDiv.id[0] - 1) + pawnJumpDiv.id[1])
                || (pieceToMove.id === (+pawnJumpDiv.id[0] + 1) + pawnJumpDiv.id[1])) {
                    // adds enPassant attack div to litDivs
                    enPassantDiv = document.getElementById(
                        pawnJumpDiv.id[0] + (+pawnJumpDiv.id[1] + 1)
                    );
                    litDivs.push(enPassantDiv.id);
                }
            }
            /*
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
            } */
            // collects potential normal attack divs
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
            if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 1)).dataset.side === 'empty') { 
                litDivs.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 1));
                //---------------------------------------------------
                //---------------------------------------------------
                // collects empty space two ahead of orange pawnToMove
                // if orange pawnToMove in row 1
                if (pieceToMove.id[1] === '1') {
                    // if empty cell two ahead of orange pawnToMove
                    if (document.getElementById(pieceToMove.id[0] + (+pieceToMove.id[1] + 2)).dataset.side === 'empty') {
                        // adds that empty cell to litDivs array & pawnJumpDiv.id
                        // pawnJumpDiv = document.getElementById(pawnJumpDiv.id);
                        litDivs.push(pieceToMove.id[0] + (+pieceToMove.id[1] + 2));
                    }
                }
            }
            //--------------------------------------------------
            // -------------------------------------------------
            // -------------------------------------------------
        } // WORKS!
    } // must turn off enPassant once not possible
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
                    knightLight = (+pieceToMove.id[0] + 1) + (+pieceToMove.id[1] + 2).toString();
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block2) {
            if ((+pieceToMove.id[0] + 1) < 8) {
                if ((pieceToMove.id[1] - 2) >= 0) {
                    knightLight = (+pieceToMove.id[0] + 1) + (pieceToMove.id[1] - 2).toString();
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block3) {
            if ((+pieceToMove.id[0] - 1) >= 0) {
                if ((+pieceToMove.id[1] + 2) < 8) {
                    knightLight = (pieceToMove.id[0] - 1) + (+pieceToMove.id[1] + 2).toString();
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block4) {
            if ((+pieceToMove.id[0] - 1) >= 0) {
                if ((+pieceToMove.id[1] - 2) >= 0) {
                    knightLight = (pieceToMove.id[0] - 1) + (pieceToMove.id[1] - 2).toString();
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block5) {
            if ((+pieceToMove.id[0] + 2) < 8) {
                if ((+pieceToMove.id[1] + 1) < 8) {
                    knightLight = (+pieceToMove.id[0] + 2) + (+pieceToMove.id[1] + 1).toString();
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block6) {
            if ((+pieceToMove.id[0] + 2) < 8) {
                if ((+pieceToMove.id[1] - 1) >= 0) {
                    knightLight = (+pieceToMove.id[0] + 2) + (pieceToMove.id[1] - 1).toString();
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block7) {
            if ((+pieceToMove.id[0] - 2) >= 0) {
                if ((+pieceToMove.id[1] + 1) < 8) {
                    knightLight = (pieceToMove.id[0] - 2) + (+pieceToMove.id[1] + 1).toString();
                    litDivs.push( knightLight );
                }
            }
        }
        if (!block8) {
            if ((+pieceToMove.id[0] - 2) >= 0) {
                if ((+pieceToMove.id[1] - 1) >= 0) {
                    knightLight = (pieceToMove.id[0] - 2) + (pieceToMove.id[1] - 1).toString();
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
        if (pieceToMove.dataset.side === 'rook') {
            litDivs = [];
            tempId.push( pieceToMove.id );
            // highlights clicked pieceToMove
            //document.getElementById(pieceToMove.id).classList.add('mainLit');
        }
        // pushes correct divs to litDivs
        function first(rookX) {
        // first(+pieceToMove.id[0] + 1);
        // first(pieceToMove.id[0] - 1);
            rookPathId = rookX.toString() + pieceToMove.id[1];
            // while rook path empty, highlight space
            while (emptySpaces.includes( rookPathId )) {
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
                    litDivs.push( rookPathId );
                }
            }
        }
        function second(rookY) {
        // second(+pieceToMove.id[1] + 1);
        // second(pieceToMove.id[1] - 1);
            rookPathId = pieceToMove.id[0].toString() + rookY;
            // while rook path empty, highlight space
            while (emptySpaces.includes( rookPathId )) {
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
        // covers castling
        if (pieceToMove.getAttribute('data-side') === 'blue') {
            // rookId1 = '07';
            // rookId2 = '77';
            if (!blueKingFirstMove) {
                if (!blueRook1FirstMove) {
                    if (['17', '27', '37'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
                        castling = true;
                        castleDivs.push('27');
                        document.getElementById('27').classList.add('castleLit');
                        document.getElementById('27').addEventListener('click', pieceLit);
                    }
                }
                if (!blueRook2FirstMove) {
                    if (['57', '67'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
                        castling = true;
                        castleDivs.push('67');
                        document.getElementById('67').classList.add('castleLit');
                        document.getElementById('67').addEventListener('click', pieceLit);
                    }
                }
            }
        }       
        else { // since activeSide is orange
            // rookId1 = '00';
            // rookId2 = '70';
            if (!orangeKingFirstMove) {
                if (!orangeRook1FirstMove) {
                    if (['10', '20', '30'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
                        castling = true;
                        castleDivs.push('20');
                        document.getElementById('20').classList.add('castleLit');
                        document.getElementById('20').addEventListener('click', pieceLit);
                    }
                }
                if (!orangeRook2FirstMove) {
                    if (['50', '60'].every(id => document.getElementById(id).getAttribute('data-side') === 'empty')) {
                        castling = true;
                        castleDivs.push('60');
                        document.getElementById('60').classList.add('castleLit');
                        document.getElementById('60').addEventListener('click', pieceLit);
                    }
                }
            }
        }
        // -------------------------------------------------------------------------------------
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
            if ( (+space[0] >= 0) && (+space[0] <= 7) ) {
                if ( (+space[1] >= 0) && (+space[1] <= 7) ) {
                    return space;
                }
            }
        }).filter(item => { return item !== undefined; }); // WORKS!

        kingSpacesUnderAttack = [];

        // array of kingSpace ids devoid of kingSide pieces
        openAndOpponentHeldKingSpaces = kingSpaces.filter(kingSpace => {
            // for each item in arr
            return !activeSide.some(activePiece => {
                // for each item in arr2
                return kingSpace == activePiece.id;
            }); // returns true if not a match
        }); // WORKS!

        /*  DO I NEED KINGSPACES IN CHECKMATE?
        openAndOpponentHeldKingSpaces.forEach(checkSpaceId => {
            passiveSide.forEach(passivePiece => {
                console.log(checkingSpace(passivePiece, checkSpaceId));
                // if a passivePiece checks a kingSpace devoid of kingSide pieces
                if (checkingSpace(passivePiece, checkSpaceId)) {
                    // add that space's id to the kingSpacesUnderAttack array
                    kingSpacesUnderAttack.push(checkSpaceId);
                    console.log(kingSpacesUnderAttack);
                }
            }); // checkingSpace returns true/false if piece attacks space
        }); // array of opponent pieces that check a kingSpace
        // WORKS!
        
        // removes any of those spaces from kingSpaces
        kingSpaces = openAndOpponentHeldKingSpaces.filter(notOwnKingSpace => { // each item in arr
            return !kingSpacesUnderAttack.some(checkedKingSpace => { // each item in arr2
                return (notOwnKingSpace == checkedKingSpace);
            }); // returns true if not a match
        }); // console.log(kingSpaces);
        
        // highlights kingSpaces
        kingSpaces.forEach(space => { litDivs.push(space); });
        */
        openAndOpponentHeldKingSpaces.forEach(checkSpaceId => {
            kingAble = true;
            passiveSide.forEach(passivePiece => {
                // if no passivePiece can check a kingSpace devoid of kingSide pieces
                if (checkingSpace(passivePiece, checkSpaceId)) {
                    kingAble = false;
                } // checkingSpace returns true/false if piece attacks space
            });
            if (kingAble) { litDivs.push(checkSpaceId); }
        });
        // console.log(litDivs);
    } // WORKS!
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
            // un-lightens castleDivs
            castleDivs.forEach(castleDiv => {
                document.getElementById(
                    castleDiv
                ).classList.remove('castleLit');
            });
            // ---------------------------------------
            tempId = []; // ??
            // ---------------------------------------
        }
        // -------------------------------------------
        pieceToMove = e.target;
        // -------------------------------------------
        if (!enPassanting) { goToDiv = undefined; }
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
        console.log('enters switch('+pieceToMove.getAttribute('data-name')+')');
        // highlights all of clicked piece's possible moves
        switch (pieceToMove.getAttribute('data-name')) {
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
            default: alert('Error! pieceToMove name is empty')
        } // -------------------------------------------------------
        console.log('lightens & click-listens to litDivs --> movePiece(e)');
        // lightens & click-listens all litDivs --> movePiece(e)
        litDivs.forEach(litDiv => {
            document.getElementById(litDiv).classList.add('lit');
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