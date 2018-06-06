
// REMOVE toggleSide FROM lit() !!

// if (any passiveSide checks activeSide king) {
//   if (activeKing cannot move) {
//     if (activeSide king can prevent checkMate) { return false; }
//     else { endOfGame = true;  return true; }
// } else { return false; }

litDivs = [];
pieceToMove = activeKing;
kingLit();

if (!litDivs.length) { // if king paralyzed
    passiveSide.forEach(passivePiece => {
        if (checkingSpace(passivePiece, activeKing.id)) { return false; }
        else { endOfGame = true; }
    });
} else {  } // 

// undo kingLit();

// if (isMate(passiveSide, activeSideKing)) { endOfGame = true; }
// else { console.log(activeSide+' in check'); }