function checkingKing(somePiece) { // returns true/false if piece checks opposing king 
  // console.log(somePiece.piece);
  switch (somePiece.piece) { // conditions for each piece (except king) to check opposing king
    case 'pawn':
      if (somePiece.owner === 0) { // sees if white pawn checks blackKing or else if black pawn checks whiteKing
        if ([somePiece.x - 1, somePiece.x + 1].includes(blackKing.x)) return blackKing.y === somePiece.y - 1;
      }
      else if ([somePiece.x - 1, somePiece.x + 1].includes(whiteKing.x)) return whiteKing.y === somePiece.y + 1;
      return false;
    case 'knight':
      if (somePiece.owner === 0) return knightAttacks(somePiece, blackKing); // sees if white knight checks blackKing
      return knightAttacks(somePiece, whiteKing); // sees if black knight checks whiteKing
    case 'bishop':
      if (somePiece.owner === 0) return bishopAttacks(somePiece, blackKing); // sees if white bishop checks blackKing
      return bishopAttacks(somePiece, whiteKing); // sees if black bishop checks whiteKing
    case 'rook':
      if (somePiece.owner === 0) return rookAttacks(somePiece, blackKing); // sees if white rook checks blackKing
      return rookAttacks(somePiece, whiteKing); // see if black rook checks whiteKing
    case 'queen':
      if (somePiece.owner === 0) return queenAttacks(somePiece, blackKing); // sees if white queen checks blackKing
      return queenAttacks(somePiece, whiteKing); // sees if black queen checks whiteKing
  }
}
