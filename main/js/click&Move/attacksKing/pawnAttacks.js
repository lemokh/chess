function(pawn, king) {
  if (somePiece.owner === 0) { // sees if white pawn checks blackKing or else if black pawn checks whiteKing
    if ([somePiece.x - 1, somePiece.x + 1].includes(blackKing.x)) return blackKing.y === somePiece.y - 1;
  }
  else if ([somePiece.x - 1, somePiece.x + 1].includes(whiteKing.x)) return whiteKing.y === somePiece.y + 1;
  return false;
}
