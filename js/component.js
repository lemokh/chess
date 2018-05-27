// POPULATE: canEatKingAttacker & canBlockPathOfCheck

 // --------------------------------
 activeSide.forEach(activePiece => {
    // if activePiece not pinned
    if (!pinnedPieces.includes(activePiece)) {
        // and if not activeKing
        if (activePiece.getAttribute('data-name') !== 'king') {
            // ------------------------------------------------
            pieceToMove = activePiece; // VERY IMPORTANT!  WHY?
            // WHERE IS pieceToMove being called beyond this scope?
            //===========================
            function eatOrBlock(someId) {
                // sees if activePiece can eat or block someId
                // -------------------------------------------
                anId = someId;
                // --------------------------------------
                // if activePiece checks or blocks someId
                if (checkingSpace(activePiece, someId)) {
                    // ---------------------------------------------------------------------------------------------------------------------------------------------------
                    console.log(activePiece.getAttribute('data-side') + ' ' + activePiece.getAttribute('data-name') + ' at ' + activePiece.id + ' can move to ' + someId);
                    // ---------------------------------------------------------------------------------------------------------------------------------------------------
                    mate = false; // no check mate
                    // ------------------------------------------------
                    // ::: grey-lightens & click-listens to activePiece
                    greyLitDivs.push(activePiece);
                    // ----------------------------------
                    activePiece.classList.add('greyLit');
                    // -------------------------------------------------------
                    activePiece.addEventListener('click', selectGreyPiece);
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
            }); // ------------------------
            pawnBlocksKingAttacker = false;
        }
    }
    else { // since activePiece is pinned
        // if activePiece can eat kingAttacker
        if (checkingSpace(activePiece, kingAttackers[0].id)) {
            // add kingAttacker's id to litDivs
            canEatKingAttacker.push(activePiece);
        }
    }
});

//================================
function interceptKingAttacker() {
    // ------------------------------------
    kingAttackers.forEach(kingAttacker => {
        // ---------------------------------------------------------
        canEatKingAttacker.forEach(piece => { // includes activeKing
            greyLitDivs.push(piece);
        });
        // ----------------------------------------------------------
        canBlockPathOfCheck.forEach(piece => { // excludes activeKing
            greyLitDivs.push(piece);
        });
        // ---------------------------
        greyLitDivs.forEach(piece => {
            // ----------------------------
            piece.classList.add('greyLit');
            // ----------------------------------------------------------
            piece.addEventListener('click', function selectGreyPiece(e) {
                // ------------------------------------------------------
                greyPieceToMove = e.target;
                if (canEatKingAttacker.includes(e.target)) {
                    litDivs.push(kingAttacker);
                }
                // ---------------------------------------------------
                for (let i = 0; i < canBlockPathOfCheck.length; i++) {
                    // -----------------------------------------------
                    if (canBlockPathOfCheck[i].piece === e.target) {
                        // ---------------------------------------------------
                        canBlockPathOfCheck[i].emptyDivs.forEach(emptyDiv => {
                            litDivs.push(emptyDiv);
                        });
                    } break;
                }
                // ------------------------
                litDivs.forEach(litDiv => {
                    // -------------------------
                    litDiv.classList.add('lit');
                    // ---------------------------------------------------------
                    litDiv.addEventListener('click', function moveGreyPiece(e) {
                        // -----------------------------------------------------
                        // clears greyLitDiv pieces
                        greyLitDivs.forEach(greyLitDiv => {
                            greyLitDiv.removeEventListener('click', selectGreyPiece);
                            // ------------------------------------------------------
                            greyLitDiv.classList.remove('greyLit');
                        });
                        greyLitDivs = [];
                        // --------------------
                        // clears litDiv pieces
                        litDivs.forEach(litDiv => {
                            litDiv.removeEventListener('click', moveGreyPiece);
                            // ------------------------------------------------
                            litDiv.classList.remove('lit');
                        });
                        litDivs = [];
                        // -------------------------------------------------------------------
                        if (e.target.getAttribute('data-side') !== 'empty') { eat(e.target); }
                        // -------------------------------------------------------------------
                        swapSide(greyPieceToMove, e.target);
                        // ---------------------------------
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
            });
        });
    });
}