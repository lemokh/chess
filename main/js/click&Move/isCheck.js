function isCheck(pieces, player) { // returns either array of checking pieces or false
  setSides(pieces);
  if (player === 0) { inCheck(whiteKing); }
  else { inCheck(blackKing); }
}