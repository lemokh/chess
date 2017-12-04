function knightAttacks(knight, king) { // returns true/false if knight checks king
      
  knightMoves = []; // will contain the only two spaces that knight might check king
  
  if (knight.x < king.x) { // if knight is left of king
    if (knight.y < king.y) { // and knight is below king
      knightMoves.push({x: knight.x + 1, y: knight.y + 2});
      knightMoves.push({x: knight.x + 2, y: knight.y + 1});
    } else { // knight is left of and above king
      knightMoves.push({x: knight.x + 1, y: knight.y - 2});
      knightMoves.push({x: knight.x + 2, y: knight.y - 1});
    }
  } else { // knight is right of king
    if (knight.y < king.y) { // and knight is below king
      knightMoves.push({x: knight.x - 1, y: knight.y + 2});
      knightMoves.push({x: knight.x - 2, y: knight.y + 1});
    } else { // knight is right of and above king
      knightMoves.push({x: knight.x - 1, y: knight.y - 2});
      knightMoves.push({x: knight.x - 2, y: knight.y - 1});
    }
  }
  return knightMoves.includes({x: king.x, y: king.y});
}