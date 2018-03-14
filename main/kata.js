var whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, kingAttackers, defenders, pinnedPieces, checkedPaths, nails, whites, blacks;

function isCheck(pieces, player) { // returns EITHER an array of checking pieces OR false

  whites = [];
  blacks = [];
  pinnedPieces = [];
  checkedPaths = [];

  function checkingKing(somePiece, king) { // returns true/false if piece checks opposing king

    function knightAttacks(knight, king) { // returns true/false if knight checks king
      // returns true/false if king checkmate --> player = turn to avoid checkmate 
      //===============================================================================================
      if (!(isCheck(pieces, player))) { return false; }
      if (kingAttackers.length > 1) { return true; }
      // console.log(kingAttackers); // WORKS! -->  OPTIMIZE kingAttackers INTO kingAttacker
      // console.log(checkSpace.x);
      if ([somePiece.x - 1, somePiece.x + 1].includes(checkSpace.x)) { // sees if pawn can checkSpace
        if (somePiece.owner === 0) return checkSpace.y === (somePiece.y - 1);
        return checkSpace.y === (somePiece.y + 1);
      }
      return false;
      case 'knight':
        return knightAttacks(somePiece, checkSpace); // sees if knight can checkSpace
      case 'bishop':
        return bishopAttacks(somePiece, checkSpace); // sees if bishop can checkSpace
      case 'rook':
        return rookAttacks(somePiece, checkSpace); // sees if rook can checkSpace
      case 'queen':
        return queenAttacks(somePiece, checkSpace); // sees if queen can checkSpace
      case 'king':
        return kingAttacks(somePiece, checkSpace); // sees if king can checkSpace
    }
  } // returns true/false if somePiece checks space
  //===============================================================================================
  function checkMate(opposingSide, opposingKing, king, kingSide) { // returns true/false if check mate

    occupiedKingSpaces = []; // contains {x,y} of all pieces surrounding king

    kingSpaces = [

      { x: king.x - 1, y: king.y },
      { x: king.x - 1, y: king.y + 1 },
      { x: king.x, y: king.y + 1 },
      { x: king.x + 1, y: king.y + 1 },
      { x: king.x + 1, y: king.y },
      { x: king.x + 1, y: king.y - 1 },
      { x: king.x, y: king.y - 1 },
      { x: king.x - 1, y: king.y - 1 }

    ].map(space => { // keeps only on-board kingSpaces
      if (space.x >= 0 && space.x <= 7) {
        if (space.y <= 7 && space.y <= 7) { return space; }
      }
    }).filter(item => { return item !== undefined; });

    for (let i = 0; i < pieces.length; i++) {
      for (let k = 0; k < kingSpaces.length; k++) {
        if (kingSpaces[k].x === pieces[i].x) {
          if (kingSpaces[k].y === pieces[i].y) {
            occupiedKingSpaces.push({ x: pieces[i].x, y: pieces[i].y });
          }
        }
      }
    } // populates occupiedKingSpaces array --> WORKS!

    function exclusion(res1, res2) {
      return res1.filter(obj => { // obj --> each item in res1
        return !res2.some(obj2 => { // obj --> each item in res2
          return obj.x === obj2.x && obj.y === obj2.y
        }) // returns true if at least one doesn't match x & y
      });
    }

    let vacantKingSpaces = exclusion(kingSpaces, occupiedKingSpaces);
    // console.log(vacantKingSpaces); // WORKS!

    kingOpenSpaces = vacantKingSpaces.map(space => { // for each vacant king space
      // if every opposing piece fails to check that vacant king space, then return that vacant space   
      if (opposingSide.every(piece => {
          return !checkingSpace(piece, space);
        })) { return space; }
    }).filter(item => { return item !== undefined; }); // populates kingSpaces free from attack

    // console.log(kingOpenSpaces); // WORKS! --> []

    if (kingOpenSpaces.length > 0) { return false; } // not checkmate
    //============================================================================================================
    else { // since king can't move: can king/kingSide EAT checking piece or BLOCK its checking path?

      let defenders = [],
        pawnDefenders = [];

      for (let i = 0; i < kingSide.length; i++) { // if unpinned, add to defenders
        // console.log(!pinnedPieces.includes(kingSide[i])); // WORKS!
        if (kingSide[i].piece === 'pawn') {
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
              if (pawnDefenders[i].owner === 0) { // if white pawn
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
      if (kingAttackers[0].piece === "pawn") {
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
              if (pawnDefenders[p].x === kingAttackers[0].x - 1) { // right
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

      // do any opposingSide pieces cover kingAttacker?
      if (opposingSide.length > 1) { // if only one, opposingSide[0] is kingAttackers[0]
        for (let i = 0; i < opposingSide.length; i++) {
          if (checkingSpace(opposingSide[i], kingAttackers[0])) {
            return blockCheck();
          } // opposingSide covers attacker
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
  if (player === 0) { return checkMate(blacks, blackKing, whiteKing, whites); }
  else { return checkMate(whites, whiteKing, blackKing, blacks); }
} // returns true/false if check mate
