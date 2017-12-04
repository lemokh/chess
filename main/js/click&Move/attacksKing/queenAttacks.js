function queenAttacks(queen, king) { // returns true/false if queen checks king
  return (bishopAttacks(queen, king) || rookAttacks(queen, king));
}