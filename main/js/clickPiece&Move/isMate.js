function isMate(pieces, player) { // returns true/false if king checkmated
  if (player === 0) { return kingFree(whiteKing, whites); }
  else { return kingFree(blackKing, blacks); }
}