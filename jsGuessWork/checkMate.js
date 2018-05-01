// returns EITHER an array of checking pieces OR false
function isCheck(pieces, player) {
  
  whites = []; blacks = []; pinnedPieces = []; checkedPaths = [];
  
  function setKingValues() {
    pieces.forEach(item => { // sets whiteKing & blackKing values
      if (item.name === 'king') {
        if (item.side === 'blue') { whiteKing = item; } // cover for more multiple white kings?
        else { blackKing = item; }
      } 
      else { // since not a king, add piece to whites or blacks array
        if (item.side === 'blue') { whites.push(item); }
        else { blacks.push(item); }
      }
    });
  }
  // checkingSpace yields same result I think
  // returns true/false if piece checks opposing king
  function checkingKing(somePiece, king) {
    
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
  // discerns if check occurs
  function inCheck(passiveSide, king) {   
    kingAttackers = []; // contains pieces checking king
    
    passiveSide.forEach(item => {
      if (checkingKing(item, king)) { kingAttackers.push(item); }
    }); //console.log(kingAttackers);
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (kingAttackers.length > 0) { isMate(); }
    else { console.log(''+activeSide+' in check'); }
  } // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  setKingValues();
  inCheck(passiveSide, activeSideKing); 
}

//===============================================================================================
//===============================================================================================
//===============================================================================================

// returns true/false if check mate
function isMate(pieces, side) { 
  // returns true/false if king checkmate --> side = turn to avoid checkmate 
  //===============================================================================================
  if (kingAttackers.length > 1) { return true; } // this is not correct
  // console.log(kingAttackers); // WORKS! -->  OPTIMIZE kingAttackers INTO kingAttacker
  //===============================================================================================
  // returns true/false if check mate for activeKing
  function checkMate(passiveSide, opposingKing, king, kingSide) {
    
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
    else {
      // since king can't move out of check: 
      // can king/kingSide EAT checking piece or BLOCK its checking path?
      let defenders = [], pawnDefenders = [];
      
      // populates defenders & pawnDefenders with unpinned kingSide pieces
      for (let i = 0; i < kingSide.length; i++) {
        // console.log(!pinnedPieces.includes(kingSide[i])); // WORKS!
        // if unpinned, add to defenders
        if (kingSide[i].name === 'pawn') {
          if (!pinnedPieces.includes(kingSide[i])) {
            pawnDefenders.push(kingSide[i]);
          }
        } 
        else if (!pinnedPieces.includes(kingSide[i])) {
          defenders.push(kingSide[i]);
        } 
      } // WORKS!

      // RETURNS TRUE/FALSE IF CHECK MATE
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
      } // WORKS!

    // 1. EN PASSANT? --> if king's attacker is a pawn,
      // can any kingSide pawn do enPassant to eat attacker possible? --> WORKS!
      if (kingAttackers[0].name === "pawn") {
        // make this a separate function to run here...
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
      
    // 2. IS KINGATTACKER COVERED BY OWN SIDE?      
      // if opposingKing covers attacker
      if (checkingSpace(opposingKing, kingAttackers[0])) { return blockCheck(); }
      
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
      
    // 3. SINCE KINGATTACKER IS UNEATABLE, IS KINGATTACKER'S PATH BLOCKABLE?
      return blockCheck();
    }
  } // returns true/false if check mate
  //===============================================================================================
  //===============================================================================================
  if (side === blues) { return checkMate(blacks, blackKing, whiteKing, whites); }
  else { return checkMate(whites, whiteKing, blackKing, blacks); }
}

//===============================================================================================
//===============================================================================================
//===============================================================================================
//===============================================================================================
//===============================================================================================
//===============================================================================================

if ( isCheck(passiveSide, activeKing.id) ) { // if activeKing in check
  if ( isMate(passiveSide, activeKing.id) ) { endOfGame = true; }
  else { console.log('activeKing IN CHECK!'); }
}

//===============================================================================================
//===============================================================================================
//===============================================================================================
//===============================================================================================
//===============================================================================================
//===============================================================================================

// returns true/false if some-piece checks-space 
function checkingSpace(somePiece, checkSpace) {
  // somePiece is a passiveSide <img>
  // checkSpace is an activeSideID (kingSpace not held by an activeSide piece)
  pinnedPieces = [];
  //--------------------------------------------------------------------------------------------
  // returns true/false if some passiveSide knight can attack checkSpace
  function knightAttacks(someKnight, checkSpace) {
    // to hold two spaces where knight might checkSpace
    knightMoves = [];
    
    // if someKnight is left of checkSpace
    if (someKnight.id[0] < checkSpace[0]) {
      // and if someKnight is above checkSpace
      if (someKnight.id[1] < checkSpace[1]) {
        knightMoves.push(
          (+someKnight.id[0] + 1) +
          (+someKnight.id[1] + 2).toString()
        );
        knightMoves.push(
          (+someKnight.id[0] + 2) +
          (+someKnight.id[1] + 1).toString()
        );
      }
      else { // since someKnight is left of & below checkSpace
        knightMoves.push(
          (+someKnight.id[0] + 1) +
          (someKnight.id[1] - 2).toString()
        );
        knightMoves.push(
          (+someKnight.id[0] + 2) +
          (someKnight.id[1] - 1).toString()
        );
      }
    }
    else { // since someKnight is right of & above checkSpace
      if (someKnight.id[1] < checkSpace[1]) {
        knightMoves.push(
          (someKnight.id[0] - 1) +
          (+someKnight.id[1] + 2).toString()
        );
        knightMoves.push(
          (someKnight.id[0] - 2) +
          (+someKnight.id[1] + 1).toString()
        );
      }
      else { 
        // since someKnight is right of & below checkSpace
        knightMoves.push(
          (someKnight.id[0] - 1) +
          (someKnight.id[1] - 2).toString()
        );
        knightMoves.push(
          (someKnight.id[0] - 2) +
          (someKnight.id[1] - 1).toString()
        );
      }
    }
    return knightMoves.includes(checkSpace); 
  }
  //--------------------------------------------------------------------------------------------
  // returns true/false if some passiveSide bishop can attack checkSpace
  function bishopAttacks(someBishop, checkSpace) {
    // contains spaces someBishop attacks enroute to checkSpace
    bishopMoves = [];
    nails = []; // collects possible pinnedPieces
    bishopX = +someBishop.id[0];
    bishopY = +someBishop.id[1];

    if (someBishop.id === checkSpace) { return false; }
    
    // (LEFT BOARD SIDE) if someBishop.id is left of checkSpace
    if (someBishop.id[0] < checkSpace[0]) {
      // (FIRST QUADRANT) and if someBishop is above checkSpace
      if (someBishop.id[1] < checkSpace[1]) {
        // if someBishop's path aligns with checkSpace
        if ( checkSpace[0] - someBishop.id[0] 
          === checkSpace[1] - someBishop.id[1] ) {
          // collects bishop's attack path to checkSpace
          while (bishopX < (checkSpace[0] - 1)) {
            bishopX += 1;
            bishopY += 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          }
        }
        else { return false; } // bishop can't checkSpace
      }
      else {
       // (THIRD QUADRANT) bishop is left of & below checkSpace
        // if someBishop aligns with checkSpace
        if ( checkSpace[0] - someBishop.id[0]
          === someBishop.id[1] - checkSpace[1] ) {
          // collects bishop's attack path to checkSpace
          while (bishopX < (checkSpace[0] - 1)) {
            bishopX += 1;
            bishopY -= 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          }
        }
        else { return false; } // bishop cannot checkSpace
      }
    }
    else { // (RIGHT BOARD SIDE)
      // since bishop is right of checkSpace
      // (SECOND QUADRANT)
      // and since someBishop is above checkSpace
      if (someBishop.id[1] < checkSpace[1]) {
        // if bishop aligns with checkSpace
        if ( someBishop.id[0] - checkSpace[0]
          === checkSpace[1] - someBishop.id[1] ) {
          // collects bishop's attack path to checkSpace
          while (bishopX > (+checkSpace[0] + 1)) {
            bishopX -= 1;
            bishopY += 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          } // console.log(bishopMoves);
        }
        else { return false; } // bishop can't checkSpace  
      }
      else { // (FOURTH QUADRANT) 
        // since bishop is right of & below checkSpace
        // if someBishop aligns with checkSpace
        if ( someBishop.id[0] - checkSpace[0] 
          === someBishop.id[1] - checkSpace[1] ) {
          // collects bishop's attack path to checkSpace
          while (bishopX > (checkSpace[0] + 1)) {
            bishopX -= 1;
            bishopY -= 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          } // console.log(bishopMoves);
        }
        // bishop can't attack king
        else { return false; }
      }
    } // console.log(bishopMoves);

    // sees if any piece obstructs bishop's check
    for (let i = 0; i < pieces.length; i++) { // for each piece on board
      // for each space in bishop's path to checkSpace
      for (let k = 0; k < bishopMoves.length; k++) {
        // if a piece matches a bishopMove, add piece to nails
        if (pieces[i].id === bishopMoves[k]) {
          nails.push(pieces[i]);
        }
      }
    }
    if (nails.length === 1) { // if only one nail
      // if that one nail & that bishop are on the same side
      if (nails[0].getAttribute('data-side') 
      === someBishop.getAttribute('data-side')) {
          pinnedPieces.push(nails[0]); // that nail is a pinnedPiece
      }
    } 
    // returns true/false if no pieces block
    return nails.length === 0;
  }
  //--------------------------------------------------------------------------------------------
  // returns true/false if some passiveSide rook can attack checkSpace
  function rookAttacks(someRook, checkSpace) {
    // to hold spaces rook attacks enroute to checkSpace
    rookMoves = [];
    // to hold spaces that cannot be moved
    nails = [];
  
    // someRook.id --> '##';   checkSpace --> '##';

    // pushes row spaces between someRook & checkSpace
    
    // if someRook & checkSpace share column x
    if (someRook.id[0] === checkSpace[0]) {
      // if someRook below checkSpace
      if (someRook.id[1] < checkSpace[1]) {
        // someRook.y++
        for (let i = +someRook.id[1] + 1; i < checkSpace[1]; i++) {
          rookMoves.push( checkSpace[0] + i.toString() );
        }
      }
      else { // & since someRook above checkSpace
        // rook.y--
        for (let i = +someRook.id[1] - 1; i > checkSpace[1]; i--) {
          rookMoves.push( checkSpace[0] + i.toString() );
        }
      }
    }
    // pushes column spaces between rook & checkSpace
    
    // else if someRook & checkSpace share row y
    else if (someRook.id[1] === checkSpace[1]) {
      // if someRook left of checkSpace
      if (someRook.id[0] < checkSpace[0]) {
        // someRook.x++
        for (let i = +someRook.id[0] + 1; i < checkSpace[0]; i++) {
          rookMoves.push( i.toString() + checkSpace[1] );
        }
      }
      else { // since rook right of checkSpace
        // rook.x--
        for (let i = +someRook.id[0] - 1; i > checkSpace[0]; i--) {
          rookMoves.push( i.toString() + checkSpace[1] );
        }
      }
    }
    else { return false; } // rook can't checkSpace
    
    // sees if any piece blocks rook's attack path
    
    // for each piece <img> on board 
    for (let i = 0; i < pieces.length; i++) {
      // & each id in rook's path to checkSpace
      for (let k = 0; k < rookMoves.length; k++) {
        if (pieces[i].id === rookMoves[k]) {
          nails.push(pieces[i]); // array of <img>
        }
      }
    }
    if (nails.length === 1) { // if only one nail
      // if that one nail & that bishop are on the same side
      if (nails[0].getAttribute('data-side')
      === someRook.getAttribute('data-side')) {
          pinnedPieces.push(nails[0]); // that rook is a pinnedPiece
      }
    }
    // returns true/false if no pieces block
    return nails.length === 0;
  }
  //--------------------------------------------------------------------------------------------
  // returns true/false if some passiveSide queen can attack checkSpace
  function queenAttacks(someQueen, checkSpace) {
    return (
      bishopAttacks(someQueen, checkSpace) 
      || rookAttacks(someQueen, checkSpace)
    );
  }
  //--------------------------------------------------------------------------------------------
  // returns true if the passiveSide king can attack checkSpace
  function kingAttacks(someKing, checkSpace) {
    switch (+checkSpace[0]) { // if checkSpace's column equals
      case +someKing.id[0]: // passiveSide king's column
        return (
          ( checkSpace[1] == (+someKing.id[1] + 1) )
          || 
          ( checkSpace[1] == (someKing.id[1] - 1) )
        );
      case +someKing.id[0] + 1: // passiveSide king's column + 1
        return (
          ( checkSpace[1] == someKing.id[1] )
          ||
          ( checkSpace[1] == (+someKing.id[1] + 1) )
          ||
          ( checkSpace[1] == (someKing.id[1] - 1) )
        );
      case someKing.id[0] - 1: // passiveSide king's column - 1
        return (
          ( checkSpace[1] == someKing.id[1] )
          ||
          ( checkSpace[1] == (+someKing.id[1] + 1) )
          ||
          ( checkSpace[1] == (someKing.id[1] - 1) )
        );
      default: return false;
    }
  }
  //--------------------------------------------------------------------------------------------
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/  
  //--------------------------------------------------------------------------------------------
  // sees if some piece can check space
  switch (somePiece.getAttribute('data-name')) {
    //--------------------------------------------------------------------------------------------
    case 'pawn':
      // if pawn is beside checkSpace
      if (somePiece.id[0] - 1 == checkSpace[0]
      || (+somePiece.id[0] + 1) == checkSpace[0]) {
        // sees if pawn can checkSpace
        // if passiveSide is blue
        if (somePiece.getAttribute('data-side') === 'blue') {
          return checkSpace[1] == (somePiece.id[1] - 1);
        } else { return checkSpace[1] == (+somePiece.id[1] + 1); }
      } return false;
    //--------------------------------------------------------------------------------------------
    case 'knight': return knightAttacks(somePiece, checkSpace); 
    //--------------------------------------------------------------------------------------------
    case 'bishop': return bishopAttacks(somePiece, checkSpace);
    //--------------------------------------------------------------------------------------------
    case 'rook': return rookAttacks(somePiece, checkSpace);
    //--------------------------------------------------------------------------------------------
    case 'queen': return queenAttacks(somePiece, checkSpace);
    //--------------------------------------------------------------------------------------------
    case 'king': return kingAttacks(somePiece, checkSpace);
  }
} // returns true/false if somePiece checks checkSpace
//===============================================================================================