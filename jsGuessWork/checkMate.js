function isCheck(pieces, player) { // returns EITHER an array of checking pieces OR false
  
  whites = []; blacks = []; pinnedPieces = []; checkedPaths = [];
  
  function checkingKing(somePiece, king) { // returns true/false if piece checks opposing king
    
    function knightAttacks(knight, king) { // returns true/false if knight checks king
      // console.log([knight, king]);
      
      knightMoves = []; // contains the two spaces where knight might check king
      
      if (knight.x < king.x) { // if knight is left of king
        if (knight.y < king.y) { // and if knight is above king
          knightMoves.push({x: knight.x + 1, y: knight.y + 2});
          knightMoves.push({x: knight.x + 2, y: knight.y + 1});
        } else { // knight is left of and below king
          knightMoves.push({x: knight.x + 1, y: knight.y - 2});
          knightMoves.push({x: knight.x + 2, y: knight.y - 1});
        }
      } 
      else { // knight is right of king
        if (knight.y < king.y) { // and knight is above king
            knightMoves.push({x: knight.x - 1, y: knight.y + 2});
            knightMoves.push({x: knight.x - 2, y: knight.y + 1});
        } else { // knight is right of and below king
          knightMoves.push({x: knight.x - 1, y: knight.y - 2});
          knightMoves.push({x: knight.x - 2, y: knight.y - 1});
        }
      }
      for (let i = 0; i < knightMoves.length; i++) {
        if (knightMoves[i].x === king.x) {
          if (knightMoves[i].y === king.y) { return true; }
        }
      }
    } // end of knightAttacks
  
    function bishopAttacks (bishop, king) { // returns true/false if bishop checks king
      // console.log('bishop');
      
      bishopMoves = []; // contains all spaces bishop attacks enroute to king
      bishopX = bishop.x;
      bishopY = bishop.y;
      nails = [];
      
      if (bishop.x === king.x) { return false; }
      if (bishop.y === king.y) { return false; }
            
      if (bishop.x < king.x) { // if bishop is left of king (LEFT BOARD SIDE)
        
        if (bishop.y < king.y) { // and if bishop is above king (FIRST QUADRANT)
          if (king.x - bishop.x === king.y - bishop.y) { // if bishop aligns with king
            while (bishopX < king.x - 1) { // collect all attacking spaces between them
              bishopX += 1;
              bishopY += 1;
              bishopMoves.push( {x: bishopX, y: bishopY} );
            } // console.log(bishopMoves);
          }
          else { return false; } // bishop can't attack king
        }
        else { // bishop is left of and below king (THIRD QUADRANT)
          if (king.x - bishop.x === bishop.y - king.y) { // if bishop aligns with king
            while (bishopX < king.x - 1) { // collect all attacking spaces between them
              bishopX += 1;
              bishopY -= 1;
              bishopMoves.push( {x: bishopX, y: bishopY} );
            } // console.log(bishopMoves);
          } 
          else { return false; } // bishop can't attack king
        }
      }
      else { // bishop is right of king (RIGHT BOARD SIDE)
        if (bishop.y < king.y) { // and bishop is above king (SECOND QUADRANT)
          if (bishop.x - king.x === king.y - bishop.y) { // if bishop aligns with king
            while (bishopX > king.x + 1) { // collect all attacking spaces between them
              bishopX -= 1;
              bishopY += 1;
              bishopMoves.push( {x: bishopX, y: bishopY} );
            } // console.log(bishopMoves);
          } 
          else { return false; } // bishop can't attack king  
        } 
        else { // bishop is right of and below king (FOURTH QUADRANT)
          if (bishop.x - king.x === bishop.y - king.y) { // if bishop aligns with king
            while (bishopX > king.x + 1) {  // collect all attacking spaces between them
              bishopX -= 1;
              bishopY -= 1;
              bishopMoves.push( {x: bishopX, y: bishopY} );
            } // console.log(bishopMoves);
          } 
          else { return false; } // bishop can't attack king 
        }
      } // console.log(bishopMoves);
      // sees if any piece obstructs bishop's check
        
      // sees if any piece obstructs bishop's check  
      for (let i = 0; i < pieces.length; i++) { // for each piece on board 
        for (let k = 0; k < bishopMoves.length; k++) { // for each space bishop moves enroute to king
          if (pieces[i].x === bishopMoves[k].x) {
            if (pieces[i].y === bishopMoves[k].y) {
              nails.push(pieces[i]);
            }
          }
        }
      } 
      if (nails.length === 1) { 
        if (nails[0].side !== bishop.side) {
          pinnedPieces.push(nails[0]); 
        }
      }
      if (nails.length === 0) {
        bishopMoves.forEach(move => {
          checkedPaths.push(move);
        });
        return true;
      } // returns true if no pieces block, else returns false
      else { return false; }
    } // end of bishopAttacks
    
    function rookAttacks(rook, king) { // returns true/false
      rookMoves = []; nails = []; // holds all spaces that rook attacks enroute to king
      // pushes all spaces between Ys of bishop & king
      if (rook.x === king.x) { // rook & king share column x
        if (rook.y < king.y) { // & rook below king
          for (let i = rook.y + 1; i < king.y; i++) { // rook.y++
            rookMoves.push( {x: king.x, y: i} );
          }
        } else { // & rook above king 
          for (let i = rook.y - 1; i > king.y; i--) { // rook.y--
            rookMoves.push( {x: king.x, y: i} );
          }
        }
      }
      // pushes all spaces between Xs of bishop & king
      else if (rook.y === king.y) { // rook & king share row y
        if (rook.x < king.x) { // & rook left of king
          for (let i = rook.x + 1; i < king.x; i++) { // rook.x++
            rookMoves.push( {x: i, y: king.y} );
          }
        } else { // & rook right of king
          for (let i = rook.x - 1; i > king.x; i--) { // rook.x--
            rookMoves.push( {x: i, y: king.y} );
          }
        }
      } else { return false; } // rook can't check king
      // sees if any piece blocks rook's check
      for (let i = 0; i < pieces.length; i++) { // for each piece on board 
        for (let k = 0; k < rookMoves.length; k++) { // & each space rook moves enroute to king
          if (pieces[i].x === rookMoves[k].x) {
            if (pieces[i].y === rookMoves[k].y) {
              nails.push(pieces[i]);
            }
          }
        }
      } 
      if (nails.length === 1) { 
        if (nails[0].side !== rook.side) {
          pinnedPieces.push(nails[0]) 
        }
      }
      if (nails.length === 0) {
        rookMoves.forEach(move => {
          checkedPaths.push(move);
        });
        return true;
      } // returns true if no pieces block, else returns false
      else { return false; }
    } // end of rookAttacks
    
    function queenAttacks(queen, king) { // returns true/false if queen checks king
      return ( bishopAttacks(queen, king) || rookAttacks(queen, king) );
    }
    

    switch (somePiece.name) { // conditions for each piece (except king) to check opposing king
      case 'pawn':
        if (somePiece.side === 'blue') { // sees if white pawn checks blackKing or if black pawn checks whiteKing
          if ([somePiece.x - 1, somePiece.x + 1].includes(blackKing.x)) return blackKing.y === (somePiece.y - 1);
        } else if ([somePiece.x - 1, somePiece.x + 1].includes(whiteKing.x)) return whiteKing.y === (somePiece.y + 1);
        return false;
      case 'knight':
        if (somePiece.side === 'blue') return knightAttacks(somePiece, blackKing); // sees if white knight checks blackKing
        return knightAttacks(somePiece, whiteKing); // sees if black knight checks whiteKing
      case 'bishop':
        if (somePiece.side === 'blue') return bishopAttacks(somePiece, blackKing); // sees if white bishop checks blackKing
        return bishopAttacks(somePiece, whiteKing); // sees if black bishop checks whiteKing
      case 'rook':
        if (somePiece.side === 'blue') return rookAttacks(somePiece, blackKing); // sees if white rook checks blackKing
        return rookAttacks(somePiece, whiteKing); // see if black rook checks whiteKing
      case 'queen':
        if (somePiece.side === 'blue') return queenAttacks(somePiece, blackKing); // sees if white queen checks blackKing
        return queenAttacks(somePiece, whiteKing); // sees if black queen checks whiteKing
    }
  }
  
  function inCheck(passiveSide, king) { // discerns if check occurs   
    kingAttackers = []; // contains pieces checking king
    
    passiveSide.forEach(item => {
      if (checkingKing(item, king)) { kingAttackers.push(item); }
    }); //console.log(kingAttackers);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (kingAttackers.length > 0) { isMate(); }
    else { console.log(''+activeSide+' in check'); }
  } // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  pieces.forEach(function(item) { // sets whiteKing & blackKing values
    if (item.name === 'king') {
      if (item.side === 'blue') { whiteKing = item; } // cover for more multiple white kings?
      else { blackKing = item; }
    } 
    else { // since not a king, add piece to whites or blacks array
      if (item.side === 'blue') { whites.push(item); }
      else { blacks.push(item); }
    }
  });
  
  inCheck(passiveSide, activeSideKing); 
}

//=================================================================================================
//=================================================================================================

function isMate(pieces, player) { 
  // returns true/false if king checkmate --> player = turn to avoid checkmate 
  //===============================================================================================
  if ( !(isCheck(pieces, player)) ) { return false; }
  if (kingAttackers.length > 1) { return true; }
  // console.log(kingAttackers); // WORKS! -->  OPTIMIZE kingAttackers INTO kingAttacker
  //===============================================================================================
  function checkMate(passiveSide, opposingKing, king, kingSide) { // returns true/false if check mate
    
    occupiedKingSpaces = []; // contains {x,y} of all pieces surrounding king
    
    kingSpaces = [
    
      {x: king.x - 1, y: king.y},
      {x: king.x - 1, y: king.y + 1},
      {x: king.x, y: king.y + 1},
      {x: king.x + 1, y: king.y + 1},
      {x: king.x + 1, y: king.y},
      {x: king.x + 1, y: king.y - 1},
      {x: king.x, y: king.y - 1},
      {x: king.x - 1, y: king.y - 1}
      
    ].map(space => { // keeps only on-board kingSpaces
      if (space.x >= 0 && space.x <= 7) {
        if (space.y <= 7 && space.y <= 7) { return space; }
      }
    }).filter(item => { return item !== undefined; });
        
    for (let i = 0; i < pieces.length; i++) {
      for (let k = 0; k < kingSpaces.length; k++) {
        if ( kingSpaces[k].x === pieces[i].x) {
          if (kingSpaces[k].y === pieces[i].y) {
            occupiedKingSpaces.push( {x: pieces[i].x, y: pieces[i].y} );
          }
        }
      }
    } // populates occupiedKingSpaces array --> WORKS!
    
    function exclusion (res1, res2) {
      return res1.filter(obj => { // obj --> each item in res1
        return !res2.some(obj2 => { // obj --> each item in res2
          return obj.x === obj2.x && obj.y === obj2.y
        }) // returns true if at least one doesn't match x & y
      });
    }
    
    vacantKingSpaces = exclusion(kingSpaces, occupiedKingSpaces);
    // console.log(vacantKingSpaces); // WORKS!
    
    kingOpenSpaces = vacantKingSpaces.map(space => { // for each vacant king space
    // if every opposing piece fails to check that vacant king space, then return that vacant space   
      if (passiveSide.every(piece => {
        return !checkingSpace(piece, space); 
      }) ) { return space; }
    }).filter(item => { return item !== undefined; }); // contains kingSpaces free from attack
    
    // console.log(kingOpenSpaces); // WORKS! --> []
    
    if (kingOpenSpaces.length > 0) { return false; } // not checkmate
    //============================================================================================================
    else { // since king can't move: can king/kingSide EAT checking piece or BLOCK its checking path?
      
      let defenders = [], pawnDefenders = [];
  
      for (let i = 0; i < kingSide.length; i++) { // if unpinned, add to defenders
        // console.log(!pinnedPieces.includes(kingSide[i])); // WORKS!
        if (kingSide[i].name === 'pawn') {
          if (!pinnedPieces.includes(kingSide[i])) {
            pawnDefenders.push(kingSide[i]);
          }
        } 
        else if (!pinnedPieces.includes(kingSide[i])) {
          defenders.push(kingSide[i]);
        } 
      } 
      // populates defenders & pawnDefenders with unpinned kingSide pieces --> WORKS!
 
      function blockCheck() { // RETURNS FALSE IF ANY DEFENDERS BLOCK CHECK
        for (let k = 0; k < checkedPaths.length; k++) {
          for (let i = 0; i < pawnDefenders.length; i++) {
            if (pawnDefenders[i].x === checkedPaths[k].x) { // if Xs align
              if (pawnDefenders[i].side === 'blue') { // if white pawn
                if (pawnDefenders[i].y === 6) { // if first move
                  if (pawnDefenders[i].y - 1 === checkedPaths[k].y) { return false; }  
                  if (pawnDefenders[i].y - 2 === checkedPaths[k].y) { return false; }
                  // pawn can block check, not a mate
                } // since not first move
                else if (pawnDefenders[i].y - 1 === checkedPaths[k].y) { return false; } 
                // pawn can block check, not a mate
              } // since black pawn =====================================
              else {
                if (pawnDefenders[i].y === 1) { // if first move
                  if (pawnDefenders[i].y + 1 === checkedPaths[k].y) { return false; }  
                  if (pawnDefenders[i].y + 2 === checkedPaths[k].y) { return false; }
                  // pawn can block check, not a mate
                } // since not first move
                else if (pawnDefenders[i].x === checkedPaths[k].x) {
                  if (pawnDefenders[i].y + 1 === checkedPaths[k].y) { return false; } 
                  // pawn can block check, not a mate
                }
              }
            }
          } // ends pawnDefender for-loop
          for (let j = 0; j < defenders.length; j++) { // for each defender
            if (checkingSpace(defenders[j], checkedPaths[k])) { return false; } 
            // defender can block check, not a mate
          }
        } // sees if any defenders can block any checkedPaths space
        return true; // check mate
      } // RETURNS TRUE/FALSE IF CHECK MATE --> WORKS!

    // 1. EN PASSANT? --> if king's attacker is a pawn, is en passant possible? --> WORKS!
      if (kingAttackers[0].name === "pawn") {
        if (kingAttackers[0].prevY === kingAttackers[0].y + 2) { // white pawn
          for (let p = 0; p < pawnDefenders.length; p++) {
            if (kingAttackers[0].y === pawnDefenders[p].y) { // Y aligns
              if (pawnDefenders[p].x === kingAttackers[0].x - 1) { // left
                return false; // pawnDefender eats kingAttacker
              }
              if (pawnDefenders[p].x === kingAttackers[0].x + 1) { // right
                return false; // pawnDefender eats kingAttacker
              }
            }
          }
        }
        else if (kingAttackers[0].prevY === kingAttackers[0].y - 2) { // black pawn
          for (let p = 0; p < pawnDefenders.length; p++) {
            if (kingAttackers[0].y === pawnDefenders[p].y) { // Y aligns
              if (pawnDefenders[p].x === kingAttackers[0].x + 1) { // left
                return false; // pawnDefender eats kingAttacker
              }
              if (pawnDefenders[p].x === kingAttackers[0].x -1) { // right
                return false; // pawnDefender eats kingAttacker
              }
            }
          }
        }
      } 
      
    // 2. IS KINGATTACKER COVERED?
      
      // does opposingKing cover kingAttacker?
      if (checkingSpace(opposingKing, kingAttackers[0])) { // opposingKing covers attacker
        return blockCheck();
      }
      
      // do any passiveSide pieces cover kingAttacker?
      if (passiveSide.length > 1) { // if only one, passiveSide[0] is kingAttackers[0]
        for (let i = 0; i < passiveSide.length; i++) {
          if (checkingSpace(passiveSide[i], kingAttackers[0])) {
            return blockCheck();
          } // passiveSide covers attacker
        }
      }
      
    // 3. SINCE UNCOVERED, IS KINGATTACKER EATABLE?
      
      // does king EAT its attacker?
      if (checkingSpace(king, kingAttackers[0])) { return false; } // king EATS, not mate
      
      // do any defenders Eat king's attacker? --> WORKS!
      for (let j = 0; j < defenders.length; j++) {
        if (checkingSpace(defenders[j], kingAttackers[0])) { return false; } 
      } // defender EATS, not mate
      
      // do any Pawndefenders Eat king's attacker? --> WORKS!
      for (let k = 0; k < pawnDefenders.length; k++) {
        if (checkingSpace(pawnDefenders[k], kingAttackers[0])) { return false; }
      } // PawnDefender EATS, not mate
      
    // 3. SINCE UNEATABLE, IS KINGATTACKER'S PATH BLOCKABLE?
      return blockCheck();
    }
  } // returns true/false if check mate
  //===============================================================================================
  //===============================================================================================
  if (player === 'blue') { return checkMate(blacks, blackKing, whiteKing, whites); }
  else { return checkMate(whites, whiteKing, blackKing, blacks); }
} // returns true/false if check mate


// if (isCheck(passiveSide, activeSideKing) {
//   if (isMate(passiveSide, activeSideKing) { endGame = true; }
// }

//===============================================================================================

/*
function checkingSpace(somePiece, checkSpace) { // returns true/false if opposing piece checks space 
  // somePiece is an object in the passiveSide array ---> checkSpace is the target piece

  function knightAttacks(knight, checkSpace) { // returns true/false if knight can checkSpace
    knightMoves = []; // contains the two spaces where knight might checkSpace

    if (knight.x < checkSpace.x) { // if knight is left of checkSpace
      if (knight.y < checkSpace.y) { // and if knight is above checkSpace
        knightMoves.push({x: knight.x + 1, y: knight.y + 2});
        knightMoves.push({x: knight.x + 2, y: knight.y + 1});
      } else { // knight is left of and below checkSpace
        knightMoves.push({x: knight.x + 1, y: knight.y - 2});
        knightMoves.push({x: knight.x + 2, y: knight.y - 1});
      }
    } else { // knight is right of checkSpace
      if (knight.y < checkSpace.y) { // and knight is above checkSpace
          knightMoves.push({x: knight.x - 1, y: knight.y + 2});
          knightMoves.push({x: knight.x - 2, y: knight.y + 1});
      } else { // knight is right of and below checkSpace
        knightMoves.push({x: knight.x - 1, y: knight.y - 2});
        knightMoves.push({x: knight.x - 2, y: knight.y - 1});
      }
    }
    for (let i = 0; i < knightMoves.length; i++) {
      if (knightMoves[i].x === checkSpace.x) {
        if (knightMoves[i].y === checkSpace.y) return true;
      }
    }
  } // end of knightAttacks --> returns true/false if knight can checkSpace
  
  function bishopAttacks (bishop, checkSpace) { // returns true/false if bishop can checkSpace
    
    bishopMoves = []; // contains all spaces bishop attacks enroute to checkSpace
    nails = []; // collects possible pinnedPieces
    bishopX = bishop.x;
    bishopY = bishop.y;
    
    
    if (bishop.x === checkSpace.x) { return false; }
    if (bishop.y === checkSpace.y) { return false; }
          
    if (bishop.x < checkSpace.x) { // if bishop is left of king (LEFT BOARD SIDE)
      
      if (bishop.y < checkSpace.y) { // and if bishop is above king (FIRST QUADRANT)
        if (checkSpace.x - bishop.x === checkSpace.y - bishop.y) { // if bishop aligns with king
          while (bishopX < checkSpace.x - 1) { // collects all attacking spaces between them
            bishopX += 1;
            bishopY += 1;
            bishopMoves.push( {x: bishopX, y: bishopY} );
          }
        }
        else { return false; } // bishop cannot checkSpace
      }
      else { // bishop is left of and below checkSpace (THIRD QUADRANT)
        if (checkSpace.x - bishop.x === bishop.y - checkSpace.y) { // if bishop aligns with checkSpace
          while (bishopX < checkSpace.x - 1) { // collects all attacking spaces between them
            bishopX += 1;
            bishopY -= 1;
            bishopMoves.push( {x: bishopX, y: bishopY} );
          }
        } 
        else { return false; } // bishop cannot checkSpace
      }
    }
    else { // bishop is right of checkSpace (RIGHT BOARD SIDE)
      if (bishop.y < checkSpace.y) { // and bishop is above checkSpace (SECOND QUADRANT)
        if (bishop.x - checkSpace.x === checkSpace.y - bishop.y) { // if bishop aligns with checkSpace
          while (bishopX > checkSpace.x + 1) { // collects all attacking spaces between them
            bishopX -= 1;
            bishopY += 1;
            bishopMoves.push( {x: bishopX, y: bishopY} );
          } // console.log(bishopMoves);
        } 
        else { return false; } // bishop cannot checkSpace  
      } 
      else { // bishop is right of and below checkSpace (FOURTH QUADRANT)
        if (bishop.x - checkSpace.x === bishop.y - checkSpace.y) { // if bishop aligns with checkSpace
          while (bishopX > checkSpace.x + 1) {  // collects all attacking spaces between them
            bishopX -= 1;
            bishopY -= 1;
            bishopMoves.push( {x: bishopX, y: bishopY} );
          } // console.log(bishopMoves);
        } 
        else { return false; } // bishop can't attack king 
      }
    } // console.log(bishopMoves);
    
    // sees if any piece obstructs bishop's check  
    for (let i = 0; i < pieces.length; i++) { // for each piece on board 
      for (let k = 0; k < bishopMoves.length; k++) { // for each space bishop moves enroute to checkSpace
        if (pieces[i].x === bishopMoves[k].x) {
          if (pieces[i].y === bishopMoves[k].y) {
            nails.push(pieces[i]);
          }
        }
      }
    } 
    if (nails.length === 1) { 
      if (nails[0].side !== bishop.side) {
        pinnedPieces.push(nails[0]) 
      }
    }
    return nails.length === 0; // returns true if no pieces block, else returns false
  } // end of bishopAttacks

  function rookAttacks(rook, checkSpace) { // returns true/false if rook can checkSpace
    rookMoves = []; nails = []; // holds all spaces that rook attacks enroute to checkSpace
    // pushes all spaces between Ys of rook & checkSpace
    if (rook.x === checkSpace.x) { // rook & checkSpace share column x
      if (rook.y < checkSpace.y) { // & rook below checkSpace
        for (let i = rook.y + 1; i < checkSpace.y; i++) { // rook.y++
          rookMoves.push( {x: checkSpace.x, y: i} );
        }
      } else { // & rook above checkSpace 
        for (let i = rook.y - 1; i > checkSpace.y; i--) { // rook.y--
          rookMoves.push( {x: checkSpace.x, y: i} );
        }
      }
    }
    // pushes all spaces between Xs of rook & checkSpace
    else if (rook.y === checkSpace.y) { // rook & checkSpace share row y
      if (rook.x < checkSpace.x) { // & rook left of checkSpace
        for (let i = rook.x + 1; i < checkSpace.x; i++) { // rook.x++
          rookMoves.push( {x: i, y: checkSpace.y} );
        }
      } else { // & rook right of checkSpace
        for (let i = rook.x - 1; i > checkSpace.x; i--) { // rook.x--
          rookMoves.push( {x: i, y: checkSpace.y} );
        }
      }
    } else { return false; } // rook can't check checkSpace
    // sees if any piece blocks rook's check
    for (let i = 0; i < pieces.length; i++) { // for each piece on board 
      for (let k = 0; k < rookMoves.length; k++) { // & each space rook moves enroute to checkSpace
        if (pieces[i].x === rookMoves[k].x) {
          if (pieces[i].y === rookMoves[k].y) {
            nails.push(pieces[i]);
          }
        }
      }
    } 
    if (nails.length === 1) { 
      if (nails[0].side !== rook.side) {
        pinnedPieces.push(nails[0]) 
      }
    }
    return nails.length === 0; // returns true if no pieces block, else returns false
  } // end of rookAttacks 
  
  function queenAttacks(queen, checkSpace) { // returns true/false if queen can checkSpace
    return (bishopAttacks(queen, checkSpace) || rookAttacks(queen, checkSpace));
  }
  
  function kingAttacks(king, checkSpace) { // returns true if king can attack checkSpace
    switch (checkSpace.x) {
      case king.x - 1: return (checkSpace.y === king.y + 1) || (checkSpace.y === king.y) || (checkSpace.y === king.y - 1);
      case king.x: return (checkSpace.y === king.y + 1) || (checkSpace.y === king.y - 1);
      case king.x + 1: return (checkSpace.y === king.y + 1) || (checkSpace.y === king.y) || (checkSpace.y === king.y - 1);
    }
  }
    
  switch (somePiece.name) { // conditions for each piece to checkSpace
    case 'pawn': // ADD PAWN JUMP TWO & ENPASSANT
      // console.log(checkSpace.x);
      if ( [somePiece.x - 1, somePiece.x + 1].includes(checkSpace.x) ) { // sees if pawn can checkSpace
        if (somePiece.side === 'blue') return checkSpace.y === (somePiece.y - 1);
        return checkSpace.y === (somePiece.y + 1);
      } return false;
    case 'knight': return knightAttacks(somePiece, checkSpace); // sees if knight can checkSpace
    case 'bishop': return bishopAttacks(somePiece, checkSpace); // sees if bishop can checkSpace
    case 'rook': return rookAttacks(somePiece, checkSpace); // sees if rook can checkSpace
    case 'queen': return queenAttacks(somePiece, checkSpace); // sees if queen can checkSpace
    case 'king': return kingAttacks(somePiece, checkSpace); // sees if king can checkSpace
  }
} // returns true/false if somePiece checks space
*/

//===============================================================================================

 /*
function isCheck(pieces, player) { // returns EITHER an array of checking pieces OR false
  
  whites = []; blacks = []; pinnedPieces = []; checkedPaths = [];
  
  function checkingKing(somePiece, king) { // returns true/false if piece checks opposing king
    
    function knightAttacks(knight, king) { // returns true/false if knight checks king
      // console.log([knight, king]);
      
      knightMoves = []; // contains the two spaces where knight might check king
      
      if (knight.x < king.x) { // if knight is left of king
        if (knight.y < king.y) { // and if knight is above king
          knightMoves.push({x: knight.x + 1, y: knight.y + 2});
          knightMoves.push({x: knight.x + 2, y: knight.y + 1});
        } else { // knight is left of and below king
          knightMoves.push({x: knight.x + 1, y: knight.y - 2});
          knightMoves.push({x: knight.x + 2, y: knight.y - 1});
        }
      } 
      else { // knight is right of king
        if (knight.y < king.y) { // and knight is above king
           knightMoves.push({x: knight.x - 1, y: knight.y + 2});
           knightMoves.push({x: knight.x - 2, y: knight.y + 1});
        } else { // knight is right of and below king
          knightMoves.push({x: knight.x - 1, y: knight.y - 2});
          knightMoves.push({x: knight.x - 2, y: knight.y - 1});
        }
      }
      for (let i = 0; i < knightMoves.length; i++) {
        if (knightMoves[i].x === king.x) {
          if (knightMoves[i].y === king.y) { return true; }
        }
      }
    } // end of knightAttacks
  
    function bishopAttacks (bishop, king) { // returns true/false if bishop checks king
      // console.log('bishop');
      
      bishopMoves = []; // contains all spaces bishop attacks enroute to king
      bishopX = bishop.x;
      bishopY = bishop.y;
      nails = [];
      
      if (bishop.x === king.x) { return false; }
      if (bishop.y === king.y) { return false; }
            
      if (bishop.x < king.x) { // if bishop is left of king (LEFT BOARD SIDE)
        
        if (bishop.y < king.y) { // and if bishop is above king (FIRST QUADRANT)
          if (king.x - bishop.x === king.y - bishop.y) { // if bishop aligns with king
            while (bishopX < king.x - 1) { // collect all attacking spaces between them
              bishopX += 1;
              bishopY += 1;
              bishopMoves.push( {x: bishopX, y: bishopY} );
            } // console.log(bishopMoves);
          }
          else { return false; } // bishop can't attack king
        }
        else { // bishop is left of and below king (THIRD QUADRANT)
          if (king.x - bishop.x === bishop.y - king.y) { // if bishop aligns with king
            while (bishopX < king.x - 1) { // collect all attacking spaces between them
              bishopX += 1;
              bishopY -= 1;
              bishopMoves.push( {x: bishopX, y: bishopY} );
            } // console.log(bishopMoves);
          } 
          else { return false; } // bishop can't attack king
        }
      }
      else { // bishop is right of king (RIGHT BOARD SIDE)
        if (bishop.y < king.y) { // and bishop is above king (SECOND QUADRANT)
          if (bishop.x - king.x === king.y - bishop.y) { // if bishop aligns with king
            while (bishopX > king.x + 1) { // collect all attacking spaces between them
              bishopX -= 1;
              bishopY += 1;
              bishopMoves.push( {x: bishopX, y: bishopY} );
            } // console.log(bishopMoves);
          } 
          else { return false; } // bishop can't attack king  
        } 
        else { // bishop is right of and below king (FOURTH QUADRANT)
          if (bishop.x - king.x === bishop.y - king.y) { // if bishop aligns with king
            while (bishopX > king.x + 1) {  // collect all attacking spaces between them
              bishopX -= 1;
              bishopY -= 1;
              bishopMoves.push( {x: bishopX, y: bishopY} );
            } // console.log(bishopMoves);
          } 
          else { return false; } // bishop can't attack king 
        }
      } // console.log(bishopMoves);
      // sees if any piece obstructs bishop's check
       
      // sees if any piece obstructs bishop's check  
      for (let i = 0; i < pieces.length; i++) { // for each piece on board 
        for (let k = 0; k < bishopMoves.length; k++) { // for each space bishop moves enroute to king
          if (pieces[i].x === bishopMoves[k].x) {
            if (pieces[i].y === bishopMoves[k].y) {
              nails.push(pieces[i]);
            }
          }
        }
      } 
      if (nails.length === 1) { 
        if (nails[0].side !== bishop.side) {
          pinnedPieces.push(nails[0]); 
        }
      }
      if (nails.length === 0) {
        bishopMoves.forEach(move => {
          checkedPaths.push(move);
        });
        return true;
      } // returns true if no pieces block, else returns false
      else { return false; }
    } // end of bishopAttacks
    
    function rookAttacks(rook, king) { // returns true/false
      rookMoves = []; nails = []; // holds all spaces that rook attacks enroute to king
      // pushes all spaces between Ys of bishop & king
      if (rook.x === king.x) { // rook & king share column x
        if (rook.y < king.y) { // & rook below king
          for (let i = rook.y + 1; i < king.y; i++) { // rook.y++
            rookMoves.push( {x: king.x, y: i} );
          }
        } else { // & rook above king 
          for (let i = rook.y - 1; i > king.y; i--) { // rook.y--
            rookMoves.push( {x: king.x, y: i} );
          }
        }
      }
      // pushes all spaces between Xs of bishop & king
      else if (rook.y === king.y) { // rook & king share row y
        if (rook.x < king.x) { // & rook left of king
          for (let i = rook.x + 1; i < king.x; i++) { // rook.x++
            rookMoves.push( {x: i, y: king.y} );
          }
        } else { // & rook right of king
          for (let i = rook.x - 1; i > king.x; i--) { // rook.x--
            rookMoves.push( {x: i, y: king.y} );
          }
        }
      } else { return false; } // rook can't check king
      // sees if any piece blocks rook's check
      for (let i = 0; i < pieces.length; i++) { // for each piece on board 
        for (let k = 0; k < rookMoves.length; k++) { // & each space rook moves enroute to king
          if (pieces[i].x === rookMoves[k].x) {
            if (pieces[i].y === rookMoves[k].y) {
              nails.push(pieces[i]);
            }
          }
        }
      } 
      if (nails.length === 1) { 
        if (nails[0].side !== rook.side) {
          pinnedPieces.push(nails[0]) 
        }
      }
      if (nails.length === 0) {
        rookMoves.forEach(move => {
          checkedPaths.push(move);
        });
        return true;
      } // returns true if no pieces block, else returns false
      else { return false; }
    } // end of rookAttacks
    
    function queenAttacks(queen, king) { // returns true/false if queen checks king
      return ( bishopAttacks(queen, king) || rookAttacks(queen, king) );
    }
    
    switch (somePiece.name) { // conditions for each piece (except king) to check opposing king
      case 'pawn':
       if (somePiece.side === 'blue') { // sees if white pawn checks blackKing or if black pawn checks whiteKing
          if ([somePiece.x - 1, somePiece.x + 1].includes(blackKing.x)) return blackKing.y === (somePiece.y - 1);
        } else if ([somePiece.x - 1, somePiece.x + 1].includes(whiteKing.x)) return whiteKing.y === (somePiece.y + 1);
        return false;
      case 'knight':
        if (somePiece.side === 'blue') return knightAttacks(somePiece, blackKing); // sees if white knight checks blackKing
        return knightAttacks(somePiece, whiteKing); // sees if black knight checks whiteKing
      case 'bishop':
        if (somePiece.side === 'blue') return bishopAttacks(somePiece, blackKing); // sees if white bishop checks blackKing
        return bishopAttacks(somePiece, whiteKing); // sees if black bishop checks whiteKing
      case 'rook':
       if (somePiece.side === 'blue') return rookAttacks(somePiece, blackKing); // sees if white rook checks blackKing
       return rookAttacks(somePiece, whiteKing); // see if black rook checks whiteKing
      case 'queen':
        if (somePiece.side === 'blue') return queenAttacks(somePiece, blackKing); // sees if white queen checks blackKing
        return queenAttacks(somePiece, whiteKing); // sees if black queen checks whiteKing
    }
  }
  
  function inCheck(passiveSide, king) { // discerns if check
    
    kingAttackers = []; // contains pieces checking king
    
    passiveSide.forEach(item => {
      if (checkingKing(item, king)) { kingAttackers.push(item); }
    }); //console.log(kingAttackers);
    
    if (kingAttackers.length > 0) { return kingAttackers; }
    else { return false; }
  }
 
  pieces.forEach(function(item) { // sets whiteKing & blackKing values
    if (item.name === 'king') {
      if (item.side === 'blue') { whiteKing = item; } // cover for more multiple white kings?
      else { blackKing = item; }
    } 
    else { // since not a king, add piece to whites or blacks array
      if (item.side === 'blue') { whites.push(item); }
      else { blacks.push(item); }
    }
  });
  
  if (player === 'blue') { return inCheck(blacks, whiteKing); }
  else { return inCheck(whites, blackKing); }
}
*/