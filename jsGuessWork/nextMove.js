//===============================================================================
function nextMove() {
    if (checkMate(_,_)) { endSequence(); };
    else { // toggleSide
        lit();
    }

}

// if (any passiveSide checks activeSide king) {
//   if (activeSide king can prevent checkMate) { return false; }
//   else { endGame = true; return true; }
// } else { return false; }


function begin() {
    lit(blues, oranges);
    while (!endOfGame) { nextMove(); }
}




isCheck(passiveSide, activeSideKing);

if (isMate(passiveSide, activeSideKing)) { endGame = true; }
else { console.log(''+activeSide+' in check'); }


// change function name from isCheck to checkMate

// 