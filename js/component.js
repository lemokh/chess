// POPULATE: canEatKingAttacker & canBlockPathOfCheck






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