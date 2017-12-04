function bishopAttacks (bishop, king) { // returns true/false if bishop checks king
  
  bishopMoves = []; // will contain all spaces bishop attacks enroute to king
  clearPath = true;
  
  if (bishop.x < king.x) { // if bishop is left of king
    if (bishop.y < king.y) { // and if bishop is below king
      while (bishop.x <= king.x && bishop.y >= king.y) { // push all x & y between bishop & king
        bishop.x += 1; bishop.y += 1;
        bishopMoves.push({x: bishop.x, y: bishop.y});
      }
    } else { // bishop is left of and above king
      while (bishop.x <= king.x && bishop.y >= king.y) { // push all x & y between bishop & king
        bishop.x += 1; bishop.y -= 1;
        bishopMoves.push({x: bishop.x, y: bishop.y});
      }
    }
  } else { // bishop is right of king
    if (bishop.y < king.y) { // and bishop is below king
      while (bishop.x >= king.x && bishop.y <= king.y) { // push all x & y between bishop & king
        bishop.x -= 1; bishop.y += 1;
        bishopMoves.push({x: bishop.x, y: bishop.y});
      }
    } else { // bishop is right of and above king
      while (bishop.x >= king.x && bishop.y >= king.y) { // push all x & y between bishop & king
        bishop.x -= 1; bishop.y -= 1;
        bishopMoves.push({x: bishop.x, y: bishop.y});
      }
    }
  }
  if (bishopMoves.includes({x: king.x, y: king.y})) { // if bishop aligns with king
    // sees if any piece obstructs bishop's check
    pieces.forEach((item) => { // for each piece on board (except this bishop & that king)
      if (clearPath === false) return;
      if (item.piece === 'rook' && item.owner === bishop.owner) return;
      if (item.piece === 'king' && item.owner === king.owner) return;
      return bishopMoves.forEach((space) => { // & for each space bishop attacks enroute to king
        if ({x: item.x, y: item.y} === space) { clearPath = false; } // item blocks bishop's path to king
      });
    }); return clearPath; // returns true if no pieces block, else false
  } return false; // since bishop doesn't align with king
} // end of bishopAttacks