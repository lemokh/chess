function isMate() { // since activeKing is in check
    // --------------------------------------------------------------------------------
    console.log('ENTERS isMate()');  console.log('litDivs -->');  console.log(litDivs);
    // --------------------------------------------------------------------------------
    checkPath = pathOfCheck;
    // ----------------------
    pieceToMove = activeKing;
    //=================================
    function blockOrEatKingAttacker() {
        // sees if an activePiece can EAT or BLOCK kingAttackers[0]
        // --------------------------------------------------------
        mate = true;
        // --------------------------------
        activeSide.forEach(activePiece => {
            // if activePiece not pinned
            if (!pinnedPieces.includes(activePiece)) {
                // and if not activeKing
                if (activePiece.getAttribute('data-name') !== 'king') {
                    // ------------------------------------------------
                    pieceToMove = activePiece; // VERY IMPORTANT!  WHY?
                    //===========================
                    function eatOrBlock(someId) {
                        // sees if activePiece can eat or block someId
                        // -------------------------------------------
                        // if activePiece checks or blocks someId
                        if (checkingSpace(activePiece, someId)) {
                            // ---------------------------------------------------------------------------------------------------------------------------------------------
                            console.log(activePiece.getAttribute('data-side') + ' ' + activePiece.getAttribute('data-name') + ' at ' + activePiece.id + ' can move to ' + someId);
                            // ---------------------------
                            mate = false; // no check mate
                            // ------------------------------------------------
                            // ::: grey-lightens & click-listens to activePiece
                            greyLitDivs.push(activePiece);
                            // ----------------------------------
                            activePiece.classList.add('greyLit');
                            // -------------------------------------------------------
                            activePiece.addEventListener('click', function greyLit() {
                                // -------------------------------====================
                                console.log('ENTERS GREYLIT()');
                                // resets litDivs on clicking multiple activeSide pieces
                                // ----------------------------------------------------------
                                // un-lightens, clears out & stops click-listening to litDivs
                                // if (litDivs.length) {
                                // 	// ------------------------
                                // 	litDivs.forEach(litDiv => {
                                // 		// ---------------------------------------------------------
                                // 		document.getElementById( litDiv ).classList.remove( 'lit' );
                                // 		// ---------------------------------------------------------------------
                                // 		document.getElementById( litDiv ).removeEventListener('click', greyLit);
                                // 	});
                                // 	// ----------
                                // 	litDivs = [];
                                // }
                                console.log(litDivs);
                                // ----------------------------------
                                // lightens & click-listens to someId
                                document.getElementById( someId ).classList.add('lit');
                                // -------------------------------------------------------------------------------
                                document.getElementById( someId ).addEventListener('click', function saveKing(e) {
                                    // -----------------------------------------------------======================
                                    // un-lightens & stops click-listening to clicked space
                                    greyLitDivs.forEach(greyLitDiv => {
                                        // ----------------------------------------------
                                        greyLitDiv.removeEventListener('click', greyLit);
                                        // ----------------------------------------------
                                        greyLitDiv.classList.remove('greyLit');
                                    }); // ------------------------------------
                                    // e.target.classList.remove('mainLitDiv');
                                    e.target.classList.remove('lit');
                                    // ---------------------------------------------
                                    e.target.removeEventListener('click', saveKing);
                                    // ---------------------------------------------
                                    // moves activePiece to clicked space
                                    swapSide(activePiece, e.target);
                                    // -----------------------------
                                    // WHAT TO DO HERE?
                                    // ------------------------------------
                                    // REMOVE any remaining click-listeners
                                    // !!
                                    // -------------------------------
                                    // toggles side & starts next move 
                                    if (activeKing.getAttribute('data-side') === 'blue') {
                                        // toggleClocks();
                                        console.log('toggles activeSide to orange');
                                        // -----------------------------------------
                                        lit(oranges, blues);
                                    } // ------------------- 
                                    else { // since activeKing is orange
                                        // toggleClocks();
                                        console.log('toggles activeSide to blue');
                                        // ---------------------------------------
                                        lit(blues, oranges);
                                    }
                                });
                            });
                        }
                    }
                    // --------------------------------------------------
                    // grey-lightens pieces that can eat kingAttackers[0]
                    eatOrBlock(kingAttackers[0].id);
                    // ------------------------------------------------------------
                    pawnBlocksKingAttacker = true; // prevents pawns from attacking
                    // ------------------------------------------------------------
                    // grey-lightens pieces that can block kingAttackers[0]
                    checkPath.forEach(pathId => {
                        // ---------------------------------------------------------
                        idToBlock = pathId; // used in checkingSpace();
                        // ---------------------------------------------------------
                        // sees if activePiece can move to pathId
                        eatOrBlock(pathId);
                    }); // -----------------------------
                    pawnBlocksKingAttacker = false;
                }
            } 
            else { // since activePiece is pinned
                // THIS MIGHT ALREADY BE COVERED
                // if activePiece can eat kingAttacker
                if (checkingSpace(activePiece, kingAttackers[0].id)) {
                    // add kingAttacker's id to litDivs
                    litDivs.push(kingAttackers[0].id);
                }
            }
        }); // WORKS!
        console.log('mate -->');  console.log(mate);
    }
    // -----------------------------------------------------------------
    // populates litDivs where activeKing can move, runs checkingSpace()
    kingLit();
    console.log(litDivs);
    // --------------------------------
    // if king can move, not check mate
    if (litDivs.length) { // escapes check
        // ---------------------------------------
        console.log('king can move out of check');
        // ---------------------------------------
        activeKing.classList.add( 'greyLit' );
        // -----------------------------------=======================
        activeKing.addEventListener( 'click', function selectKing() {
            // -------------------------------=======================
            litDivs.forEach(litDiv => {
                // ------------------------------------------------------
                document.getElementById( litDiv ).classList.add( 'lit' );
                // ----------------------------------------------------------======================
                document.getElementById( litDiv ).addEventListener( 'click', function moveKing(e) {
                    // ------------------------------------------------------======================
                    activeKing.classList.remove( 'mainLit' );
                    // --------------------------------------------------
                    activeKing.removeEventListener( 'click', selectKing );
                    // --------------------------------------------------
                    litDivs.forEach(litDiv => {
                        // ---------------------------------------------------------
                        document.getElementById( litDiv ).classList.remove( 'lit' );
                        // ------------------------------------------------------------------------
                        document.getElementById( litDiv ).removeEventListener( 'click', moveKing );
                    });
                    // -------------------------------------------------------------------
                    if (e.target.getAttribute('data-side') !== 'empty') { eat(e.target); }
                    // -----------------------------
                    swapSide(activePiece, e.target);
                    // -----------------------------
                    toggleSides();
                });
            });
        });
        // -------------------------------------------------------------
            // grey-lightens activePieces that can eat or block kingAttacker
            // & click-listens to call a function that will:
            // lighten only those block or eat spaces ('clearLit' & clearLitDivs)
            // & click-listens to those clearLitDivs that will: call miniMovePiece()
            blockOrEatKingAttacker();
        // -------------------------------------------
    } // **********************************************
    // since activeKing cannot move
    // checkmate if multiple kingAttackers
    else if (kingAttackers.length > 1) { endOfGame(); }
    else { // checkmate if activeSide cannot eat or block the kingAttacker
        console.log('king unable to move out of check');
        // ------------------------------------------------------------------
        // discerns whether an activePiece can save activeKing from checkmate
        blockOrEatKingAttacker();
        if (mate) { endOfGame(); }
    } // ************************
}