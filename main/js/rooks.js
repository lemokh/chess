function rookAttacks(rook, king) { // returns true/false
  clearPath = true;
  rookMoves = []; // will contain all spaces that rook attacks enroute to king
  
  // pushes all spaces between Ys of bishop & king
  if (rook.x === king.x) { // rook & king share column x
    if (rook.y < king.y) { // & rook below king
      for (let i = rook.y; i <= king.y; i++) { // rook.y++
        rookMoves.push({x: king.x, y: i});
      }
    } else { // & rook above king 
      for (let i = rook.y; i > king.y; i--) { // rook.y--
        rookMoves.push({x: king.x, y: i});
      }
    }
  }
  // pushes all spaces between Xs of bishop & king
  else if (rook.y === king.y) { // rook & king share row y
    if (rook.x < king.x) { // & rook left of king
      for (let i = rook.x; i < king.x; i++) { // rook.x++
        rookMoves.push({x: i, y: king.y});
      }
    } else { // & rook right of king
      for (let i = rook.x; i > king.x; i--) { // rook.x--
        rookMoves.push({x: i, y: king.y});
      }
    }
  } else { return false; } // since rook not aligns with king
  // sees if any piece blocks rook's check
  pieces.forEach((item) => { // for each piece on board (except this rook & that king)
    if (clearPath === false) return;
    if (item.piece === 'rook' && item.owner === rook.owner) return;
    if (item.piece === 'king' && item.owner === king.owner) return;
    return rookMoves.forEach((space) => { // & for each space rook attacks enroute to king
      if ({x: item.x, y: item.y} === space) { clearPath = false; } // item blocks rook's path to king
    });
  }); return clearPath; // returns true/false if no pieces block
} // end of rookAttacks