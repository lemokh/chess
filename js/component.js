// ONCE IN CHECK
kingAttackers.forEach(kingAttacker => {
    canEachKingAttacker.forEach(piece => { // includes activeKing
        greyLitDivs.push(piece);
   });
    canBlockPathOfCheck.forEach(piece => { // excludes activeKing
        greyLitDivs.push(piece);
    });
    greyLitDivs.forEach(piece => {
        piece.classList.add('greyLit');
        piece.addEventListener('click', function selectGreyPiece(e) {
            if (canEachKingAttacker.includes(e.target)) {
                litDivs.push(kingAttacker);
            }
            for (let i = 0; i < canBlockPathOfCheck.length; i++) {
                if (canBlockPathOfCheck[i].piece === e.target) {
                    canBlockPathOfCheck[i].emptyDivs.forEach(emptyDiv => {
                        litDivs.push(emptyDiv);
                    });
                } break;
            }
            litDivs.forEach(litDiv => {
                litDiv.classList.add('lit');
                litDiv.addEventListener('click', function moveGreyPiece(e){
                    
                });
            });
        });
    });
});