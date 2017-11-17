//===============================================================================================
// {
//   piece: string, // pawn, rook, knight, bishop, queen or king
//   owner: int,    // 0 for white or 1 for black
//   x: int,        // 0-7 where 0 is the leftmost column (or "A")
//   y: int,        // 0-7 where 0 is the top row (or "8" in the board below)
//   prevX: int,    // 0-7, presents this piece's previous x, only given if this is the piece that was just moved
//   prevY: int     // 0-7, presents this piece's previous y, only given if this is the piece that was just moved
// }
// ---------------------------------------------------------------------------------------------
// outputBoard(pieces); logs all the board's pieces
// The piece with prevX and prevY properties appears light gray on board where it last was
// prevX/Y indicate game's previous move --> doesn't seem important
// ---------------------------------------------------------------------------------------------
//***************************************************************************************************************

// last case to cover (to avoid check mate):
//   does any same-side piece check the checking piece
//   if checking piece within king's 8 nearest spaces, can king eat the attacking piece?
var whiteKing, blackKing, clearPath, knightMoves, bishopMoves, rookMoves, kingClear, kingSpaces, whites, blacks;

function isCheck(pieces, player) { // returns either array of checking pieces or false
  // debugger;
  
  function checkingKing(somePiece) { // returns true/false if piece checks opposing king 
    
    function knightAttacks(knight, king) { // returns true/false if knight checks king
      
      knightMoves = []; // will contain the two spaces where knight might check king
      
      if (knight.x < king.x) { // if knight is left of king
        if (knight.y < king.y) { // and if knight is below king
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
    
    function rookAttacks(rook, king) { // returns true/false
      rookMoves = []; clearPath = true;
       // will contain all spaces that rook attacks enroute to king
      
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
      }); return clearPath; // returns true if no pieces block, else false
    } // end of rookAttacks
    
    function queenAttacks(queen, king) { // returns true/false if queen checks king
      return (bishopAttacks(queen, king) || rookAttacks(queen, king));
    }
    
    // console.log(somePiece.piece);
    switch (somePiece.piece) { // conditions for each piece (except king) to check opposing king
      case 'pawn':
        if (somePiece.owner === 0) { // sees if white pawn checks blackKing or else if black pawn checks whiteKing
          if ([somePiece.x - 1, somePiece.x + 1].includes(blackKing.x)) return blackKing.y === somePiece.y - 1;
        } else if ([somePiece.x - 1, somePiece.x + 1].includes(whiteKing.x)) return whiteKing.y === somePiece.y + 1;
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
       break;
      case 'queen':
        if (somePiece.owner === 0) return queenAttacks(somePiece, blackKing); // sees if white queen checks blackKing
        return queenAttacks(somePiece, whiteKing); // sees if black queen checks whiteKing
      // default: 
    }
  }
  
  function inCheck(king) { // discerns whether king is in check
    whites = [], blacks = [];
    
    const attackers = pieces.map((item, index, object) => { // returns a map of pieces checking king
      if (checkingKing(item)) { return item; }
      return object.splice(index, 1);
  }
    });
    if (attackers.length > 0) { return attackers; }
    else { return false; }
  }

  pieces.forEach(function(item) { // sets whiteKing & blackKing values
    if (item.piece === 'king') {
      if (item.owner === 0) { whiteKing = item; } // cover for more multiple white kings?
      else { blackKing = item; }
    }
    else { // since not a king, add piece to whites or blacks array
      if (item.owner === 0) { whites.push(item); }
      else { blacks.push(item); }
    }
  });
  
  if (player === 0) { inCheck(whiteKing); }
  else { inCheck(blackKing); }
} // end of isCheck

//===============================================================================================
function isMate(pieces, player) { // returns true/false if king checkmated

  //===============================================================================================
  function checkingSpace(somePiece, space) { // mimics checkingKing(somePiece)
    // returns true/false if any piece attacks space
    // write the default switch case here...
    return;    
  }
  //===============================================================================================
  function kingFree(king, opposingSide) { // return true/false if king evades check mate
    
    kingSpaces = [{x: king.x - 1, y: king.y}, {x: king.x - 1, y: king.y + 1}, {x: king.x, y: king.y + 1}, {x: king.x + 1, y: king.y + 1}, {x: king.x + 1, y: king.y}, {x: king.x + 1, y: king.y - 1}, {x: king.x, y: king.y - 1}, {x: king.x - 1, y: king.y - 1}];
    
    kingSpaces.forEach((place, index, object) => { // remove any off-board kingSpaces
      if (place.x < 0 || place.y < 0) return object.splice(index, 1);
      if (place.x > 7 || place.y > 7) return object.splice(index, 1);
    });
    
    const kingFreeSpaces = pieces.map(function(item) { // for each attacking piece on board
    // returns array of spaces where king may avoid check mate
    // --> use this array to see if any of these places are under check
    
      return kingSpaces.forEach((space, index, object) => { // for each space surrounding king
        if ({x: item.x, y: item.y} === space) return object.splice(index, 1); // if piece occupyies space, try next
        // SEES IF each OPPOSING piece checks SPACE
        if (checkingSpace(opposingSide[index], space)) return space;
        return object.splice(index, 1);
      
        // let attackingSpace = {x: opposingSide[index].x, y: opposingSide[index].y};
        // if (kingMoves.includes(attackingSpace)) {
          // if (checkingSpace(attackingSpace)) { isMate() returns false; }
        // }
        
      });
    });
    return kingFreeSpaces.length === 0; // returns true/false if king can move out of check
  }
  
  if (player === 0) { return kingFree(whiteKing, whites); }
  else { return kingFree(blackKing, blacks); }
}
//===============================================================================================
/*

isCheck([
  {piece: "king", owner: 1, x: 4, y: 0},
  {piece: "king", owner: 0, x: 4, y: 7},
  {piece: "pawn", owner: 1, x: 5, y: 6}
], 0);

*/