function isCheck(pieces, player) { // returns EITHER an array of checking pieces OR false
  // debugger;
  function checkingKing(somePiece, king) { // returns true/false if piece checks opposing king 

    function knightAttacks(knight, king) { // returns true/false if knight checks king
      knightMoves = []; // will contain the two spaces where knight might check king
      //console.log([knight, king]);
      if (knight.x < king.x) { // if knight is left of king
        if (knight.y < king.y) { // and if knight is above king
          knightMoves.push({ x: knight.x + 1, y: knight.y + 2 });
          knightMoves.push({ x: knight.x + 2, y: knight.y + 1 });
        }
        else { // knight is left of and below king
          knightMoves.push({ x: knight.x + 1, y: knight.y - 2 });
          knightMoves.push({ x: knight.x + 2, y: knight.y - 1 });
        }
      }
      else { // knight is right of king
        if (knight.y < king.y) { // and knight is above king
          knightMoves.push({ x: knight.x - 1, y: knight.y + 2 });
          knightMoves.push({ x: knight.x - 2, y: knight.y + 1 });
        }
        else { // knight is right of and below king
          knightMoves.push({ x: knight.x - 1, y: knight.y - 2 });
          knightMoves.push({ x: knight.x - 2, y: knight.y - 1 });
        }
      }
      for (let i = 0; i < knightMoves.length; i++) {
        if (knightMoves[i].x === king.x) {
          if (knightMoves[i].y === king.y) return true;
        }
      }
    } // end of kingAttacks

    function bishopAttacks(bishop, king) { // returns true/false if bishop checks king

      let bishopX = bishop.x,
        bishopY = bishop.y,
        diffX;
      bishopMoves = []; // will contain all spaces bishop attacks enroute to king
      clearPath = true;

      if (bishop.x === king.x) return false;
      if (bishop.y === king.y) return false;

      if (bishop.x < king.x) { // if bishop is left of king
        if (bishop.y < king.y) { // and if bishop is above king

          diffX = king.x - bishop.x;
          if (bishop.x + diffX !== king.x) return false; // bishop can't attack king

          while (bishopX <= king.x) { // collect all attacking spaces between them
            bishopMoves.push({ x: bishopX += 1, y: bishopY += 1 });
          }
        }
        else { // bishop is left of and below king
          while (bishopX <= king.x) { // collect all attacking spaces between them
            bishopMoves.push({ x: bishop.x += 1, y: bishop.y -= 1 });
          }
        }

      }
      else { // bishop is right of king
        if (bishop.y < king.y) { // and bishop is above king

          diffX = bishop.x - king.x;
          if (bishop.x - diffX !== king.x) return false; // bishop can't attack king

          while (bishopX >= king.x) { // collect all attacking spaces between them
            bishopMoves.push({ x: bishopX -= 1, y: bishopY += 1 });
          }

        }
        else { // bishop is right of and below king
          while (bishopX >= king.x) { // collect all attacking spaces between them
            bishopMoves.push({ x: bishopX -= 1, y: bishopY -= 1 });
          }
        }
      }
      // sees if any piece obstructs bishop's check
      pieces.forEach((item) => { // for each piece on board (except this bishop & that king)
        if (clearPath === false) return; // !TRY TO REFACTOR THIS SECTION!
        if (item.piece === 'rook' && item.owner === bishop.owner) return;
        if (item.piece === 'king' && item.owner === king.owner) return;
        return bishopMoves.forEach((space) => { // & for each space bishop attacks enroute to king
          if ({ x: item.x, y: item.y } === space) {
            clearPath = false;
            pinnedPieces.push(space); // this space's piece is pinned
          } // item blocks bishop's path to king
        });
      });
      return clearPath; // returns true if no pieces block, else false
    } // end of bishopAttacks

    function rookAttacks(rook, king) { // returns true/false
      rookMoves = [];
      clearPath = true; // to hold all spaces that rook attacks enroute to king

      // pushes all spaces between Ys of bishop & king
      if (rook.x === king.x) { // rook & king share column x
        if (rook.y < king.y) { // & rook below king
          for (let i = rook.y; i <= king.y; i++) { // rook.y++
            rookMoves.push({ x: king.x, y: i });
          }
        }
        else { // & rook above king 
          for (let i = rook.y; i > king.y; i--) { // rook.y--
            rookMoves.push({ x: king.x, y: i });
          }
        }
      }
      // pushes all spaces between Xs of bishop & king
      else if (rook.y === king.y) { // rook & king share row y
        if (rook.x < king.x) { // & rook left of king
          for (let i = rook.x; i < king.x; i++) { // rook.x++
            rookMoves.push({ x: i, y: king.y });
          }
        }
        else { // & rook right of king
          for (let i = rook.x; i > king.x; i--) { // rook.x--
            rookMoves.push({ x: i, y: king.y });
          }
        }
      }
      else { return false; } // since rook not aligns with king
      // sees if any piece blocks rook's check
      pieces.forEach((item) => { // for each piece on board (except this rook & that king)
        if (clearPath === false) return;
        if (item.piece === 'rook' && item.owner === rook.owner) return;
        if (item.piece === 'king' && item.owner === king.owner) return;
        return rookMoves.forEach((space) => { // & for each space rook attacks enroute to king
          if ({ x: item.x, y: item.y } === space) {
            clearPath = false;
            pinnedPieces.push(space); // this space's piece is pinned
          } // item blocks rook's path to king
        });
      });
      return clearPath; // returns true if no pieces block, else false
    } // end of rookAttacks

    function queenAttacks(queen, king) { // returns true/false if queen checks king
      return (bishopAttacks(queen, king) || rookAttacks(queen, king));
    }

    switch (somePiece.piece) { // conditions for each piece (except king) to check opposing king
      case 'pawn':
        if (somePiece.owner === 0) { // sees if white pawn checks blackKing or if black pawn checks whiteKing
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

  function inCheck(attackingArmy, king) { // discerns whether king is in check
    console.log(attackingArmy);
    kingAttackers = []; // to contain an array of pieces checking king

    attackingArmy.forEach((item) => {
      if (checkingKing(item, king)) { kingAttackers.push(item); }
    });
    // console.log(kingAttackers);
    if (kingAttackers.length > 0) return kingAttackers;
    return false;
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

  if (player === 0) { return inCheck(blacks, whiteKing); }
  else { return inCheck(whites, blackKing); }
}
