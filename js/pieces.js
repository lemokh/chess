var player = 'blue',  kingAttackers= [], defenders = [], pawnDefenders = [], enPassantCell = '', orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1, enPassanting = false, endOfGame = false,
heroics = [], mate, emptySpaces, knightLight, bishopPathId, rookPathId, blueKingFirstMove, blueRook1FirstMove, activeKing, blueRook2FirstMove,  orangeKingFirstMove, orangeRook1FirstMove, orangeRook2FirstMove, castleIds = [], noCastle, kingAble, pieceToMove, goToDiv, enPassantDiv, prevGoToDiv, enPassantGoToDiv, pawnJumpDiv, enPassantables2 = [], enPassantedPawn, knightLight, takenOrangeBox, takenBlueBox, pieceLit, gameEnds, tempSide, movedPiece, mainLitDiv, litDivs, unLitDivs, img, index1, index2, tempPiece, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, block1, block2, block3, block4, block5, block6, block7, block8, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, defenders, pinnedPieces, pathOfCheck = [], nails, whites, blacks;

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
const boardIds = [
  '00', '01', '02', '03', '04', '05', '06', '07',
  '10', '11', '12', '13', '14', '15', '16', '17',
  '20', '21', '22', '23', '24', '25', '26', '27',
  '30', '31', '32', '33', '34', '35', '36', '37',
  '40', '41', '42', '43', '44', '45', '46', '47',
  '50', '51', '52', '53', '54', '55', '56', '57',
  '60', '61', '62', '63', '64', '65', '66', '67',
  '70', '71', '72', '73', '74', '75', '76', '77'
];
// ------------------------------
function openSpaces(arr1, arr2) {
  return arr1.filter(cell => {
    return !arr2.some(piece => {
      return cell === piece.id;
    });
  });
}
// ------------------------------------------
var board = document.getElementById('board');
// --------------------------------------------------------------
let orangeNodes = board.querySelectorAll("[data-side='orange']");
let blueNodes = board.querySelectorAll("[data-side='blue']");
// -----------------------------------
var oranges = Array.from(orangeNodes);
var blues = Array.from(blueNodes);
// ---------------------------------
var pieces = [...oranges, ...blues];
// ---------------------------------
/*
////////////////////////////////////
emptySpaces.forEach( emptySpace => {
  document.getElementById( emptySpace ).getAttribute('data-side') === 'empty';
});
///////////////////////
function endGameNow() {
  remove activeSide click listener
  // -------------------------------------------------
  if (activeSide === blues) { alert("blue resigns"); }
  else {alert("orange resigns");} 
  // ----------------
  update user profile
}
*/
//==============================================
//==============================================
//==============================================
// returns true/false if some-piece checks-space
function checkingSpace(somePiece, checkSpaceId) {
  // somePiece is an <img>
  // checkSpaceId is an id (kingSpace not held by an activeSide piece)
  pinnedPieces = []; pathOfCheck = [];
  //---------------------------------------------------------
  // returns true/false if the knight can attack checkSpaceId
  function knightAttacks(someKnight, checkSpaceId) {
    // to hold two spaces where knight might checkSpaceId
    knightMoves = [];
    // -------------------------------------
    // if someKnight is left of checkSpaceId
    if (someKnight.id[0] < checkSpaceId[0]) {
      // and if someKnight is above checkSpaceId
      if (someKnight.id[1] < checkSpaceId[1]) {
        knightMoves.push(
          (+someKnight.id[0] + 1) +
          (+someKnight.id[1] + 2).toString()
        ); // ------------------------------
        knightMoves.push(
          (+someKnight.id[0] + 2) +
          (+someKnight.id[1] + 1).toString()
        );
      } // -----------------------------------------------------
      else { // since someKnight is left of & below checkSpaceId
        knightMoves.push(
          (+someKnight.id[0] + 1) +
          (someKnight.id[1] - 2).toString()
        ); // -----------------------------
        knightMoves.push(
          (+someKnight.id[0] + 2) +
          (someKnight.id[1] - 1).toString()
        );
      }
    } // ------------------------------------------------------
    else { // since someKnight is right of & above checkSpaceId
      if (someKnight.id[1] < checkSpaceId[1]) {
        knightMoves.push(
          (someKnight.id[0] - 1) +
          (+someKnight.id[1] + 2).toString()
        ); // ------------------------------
        knightMoves.push(
          (someKnight.id[0] - 2) +
          (+someKnight.id[1] + 1).toString()
        );
      } // ------------------------------------------------------
      else { // since someKnight is right of & below checkSpaceId
        knightMoves.push(
          (someKnight.id[0] - 1) +
          (someKnight.id[1] - 2).toString()
        ); // -----------------------------
        knightMoves.push(
          (someKnight.id[0] - 2) +
          (someKnight.id[1] - 1).toString()
        );
      }
    } // ------------------------------------
    return knightMoves.includes(checkSpaceId); 
  }
  // ========================================================
  // returns true/false if the bishop can attack checkSpaceId
  function bishopAttacks(someBishop, checkSpaceId) {
    bishopMoves = []; // collects someBishop's id route to checkSpaceId
    nails = []; // collects possible pinnedPieces
    bishopX = +someBishop.id[0];
    bishopY = +someBishop.id[1];
    // -------------------------------------------------
    // someBishop & checkSpaceId cannot have the same id
    if (someBishop.id === checkSpaceId) { return false; }
    // ----------------------------------------------------------
    // (LEFT BOARD SIDE) if someBishop.id is left of checkSpaceId
    if (someBishop.id[0] < checkSpaceId[0]) {
      // (FIRST QUADRANT) and if someBishop is above checkSpaceId
      if (someBishop.id[1] < checkSpaceId[1]) {
        // if someBishop's path aligns with checkSpaceId
        if ( checkSpaceId[0] - someBishop.id[0] 
        === checkSpaceId[1] - someBishop.id[1] ) {
          // collects bishop's attack path to checkSpaceId
          while (bishopX < (checkSpaceId[0] - 1)) {
            bishopX += 1;
            bishopY += 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          }
        } // ----------------------------------------------
        else { return false; } // bishop can't checkSpaceId
      } // ------------------------------------------------------------
      else { // (THIRD QUADRANT) bishop is left of & below checkSpaceId
        // if someBishop aligns with checkSpaceId
        if ( checkSpaceId[0] - someBishop.id[0]
        === someBishop.id[1] - checkSpaceId[1] ) {
          // collects bishop's attack path to checkSpaceId
          while (bishopX < (checkSpaceId[0] - 1)) {
            bishopX += 1;
            bishopY -= 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          }
        } // -----------------------------------------------
        else { return false; } // bishop cannot checkSpaceId
      }
    } // -----------------------
    else { // (RIGHT BOARD SIDE) since bishop is right of checkSpaceId
      // (SECOND QUADRANT) and since someBishop is above checkSpaceId
      if (someBishop.id[1] < checkSpaceId[1]) {
        // if bishop aligns with checkSpaceId
        if ( someBishop.id[0] - checkSpaceId[0]
        === checkSpaceId[1] - someBishop.id[1] ) {
          // collects bishop's attack path to checkSpaceId
          while (bishopX > (+checkSpaceId[0] + 1)) {
            bishopX -= 1;
            bishopY += 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          }
        }
        else { return false; } // bishop can't checkSpaceId  
      }
      else { // (FOURTH QUADRANT) 
        // since bishop is right of & below checkSpaceId
        // if someBishop aligns with checkSpaceId
        if ( someBishop.id[0] - checkSpaceId[0] 
          === someBishop.id[1] - checkSpaceId[1] ) {
          // collects bishop's attack path to checkSpaceId
          while (bishopX > (checkSpaceId[0] + 1)) {
            bishopX -= 1;
            bishopY -= 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          }
        } // ----------------------
        // bishop can't attack king
        else { return false; }
      }
    } // --------------------------------------------------
    // sees if any piece blocks rook's path to checkSpaceId
    for (let i = 0; i < pieces.length; i++) { // loops through pieces array
      // loops through rook's id path to checkSpaceId
      for (let k = 0; k < bishopMoves.length; k++) {
        // if that any piece id blocks rook's path to checkSpaceId 
        if (pieces[i].id === bishopMoves[k]) {
          // adds that piece to nails
          nails.push(pieces[i]); // array of <img>
        }
      }
    }
    // ------------------------------------------
    if (nails.length === 1) { // if only one nail
      // if that nail & someBishop aren't on the same side
      if (nails[0].getAttribute('data-side') !== someBishop.getAttribute('data-side')) {
          // collects that nailed piece into pinnedPieces
          pinnedPieces.push(nails[0]);
          // -------------------------------------------------------------------------------------------
          alert('NEW PINNED PIECE ADDED');  console.log('pinnedPieces -->');  console.log(pinnedPieces);
      }
    } // -----------------------------------
    // returns true/false if no pieces block
    else if (!nails.length) {
      // pathOfCheck array becomes someBishop's id route to checkSpaceId id
      pathOfCheck = bishopMoves;
      return true; // someBishop checks space
    } // --------------------------------
    else { return false; } // not a check
  }
  // ======================================================
  // returns true/false if the rook can attack checkSpaceId
  function rookAttacks(someRook, checkSpaceId) {
    
    rookMoves = []; // will hold spaces rook attacks enroute to checkSpaceId
    nails = []; // will hold spaces that cannot be moved
  
    // someRook.id --> '##';   checkSpaceId --> '##';

    // pushes row spaces between someRook & checkSpaceId
    
    // if someRook & checkSpaceId share column x
    if (someRook.id[0] === checkSpaceId[0]) {
      // if someRook below checkSpaceId
      if (someRook.id[1] < checkSpaceId[1]) {
        // someRook.y++
        for (let i = (+someRook.id[1] + 1); i < checkSpaceId[1]; i++) {
          rookMoves.push( checkSpaceId[0] + i ); // id
        }
      }
      else { // & since someRook above checkSpaceId
        // rook.y--
        for (let i = (someRook.id[1] - 1); i > checkSpaceId[1]; i--) {
          rookMoves.push( checkSpaceId[0] + i ); // id
        }
      }
    }
    // pushes column spaces between rook & checkSpaceId
    
    // else if someRook & checkSpaceId share row y
    else if (someRook.id[1] === checkSpaceId[1]) {
      // if someRook left of checkSpaceId
      if (someRook.id[0] < checkSpaceId[0]) {
        // someRook.x++
        for (let i = (+someRook.id[0] + 1); i < checkSpaceId[0]; i++) {
          rookMoves.push( i + checkSpaceId[1] ); // id
        }
      }
      else { // since rook right of checkSpaceId
        // rook.x--
        for (let i = (someRook.id[0] - 1); i > checkSpaceId[0]; i--) {
          rookMoves.push( i + checkSpaceId[1] ); // id
        }
      }
    }
    else { return false; } // rook can't checkSpaceId
    
    // sees if any piece blocks rook's path to checkSpaceId
    
    // loops through pieces array
    for (let i = 0; i < pieces.length; i++) {
      // loops through rook's id path to checkSpaceId
      for (let k = 0; k < rookMoves.length; k++) {
        // if that any piece id blocks rook's path to checkSpaceId 
        if (pieces[i].id === rookMoves[k]) {
          // adds that piece to nails
          nails.push(pieces[i]); // array of <img>
        }
      }
    }

    if (nails.length === 1) { // if only one nail
      // if that nail & someBishop aren't on the same side
      if (nails[0].getAttribute('data-side') !== someRook.getAttribute('data-side')) {
          // collects that nailed piece into pinnedPieces
          pinnedPieces.push(nails[0]);
          // PINNEDPIECES DOESN'T WORK!
          alert('NEW PINNED PIECE ADDED');
          console.log('pinnedPieces -->');
          console.log(pinnedPieces);
      }
    } 
    // returns true/false if no pieces block
    else if (!nails.length) {
      // pathOfCheck array becomes someRook's id route to checkSpaceId id
      pathOfCheck = rookMoves;
      return true; // someRook checks space
    }
    else { return false; } // not a check
  }
  // =======================================================
  // returns true/false if the queen can attack checkSpaceId
  function queenAttacks(someQueen, checkSpaceId) {
    return (
      bishopAttacks(someQueen, checkSpaceId) 
      || rookAttacks(someQueen, checkSpaceId)
    );
  }
  // ================================================
  // returns true if the king can attack checkSpaceId
  function kingAttacks(someKing, checkSpaceId) {
    switch (+checkSpaceId[0]) { // if checkSpaceId's column equals
      case +someKing.id[0]: // king's column
        return (
          ( checkSpaceId[1] == (+someKing.id[1] + 1) )
          || 
          ( checkSpaceId[1] == (someKing.id[1] - 1) )
        );
      case +someKing.id[0] + 1: // king's column + 1
        return (
          ( checkSpaceId[1] == someKing.id[1] )
          ||
          ( checkSpaceId[1] == (+someKing.id[1] + 1) )
          ||
          ( checkSpaceId[1] == (someKing.id[1] - 1) )
        );
      case someKing.id[0] - 1: // king's column - 1
        return (
          ( checkSpaceId[1] == someKing.id[1] )
          ||
          ( checkSpaceId[1] == (+someKing.id[1] + 1) )
          ||
          ( checkSpaceId[1] == (someKing.id[1] - 1) )
        );
      default: return false;
    }
  }
  // ==================================
  // /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
  // ==================================
  // sees if some piece can check space
  switch (somePiece.getAttribute('data-name')) {
    //------------------------------------------
    case 'pawn':
      // if pawn is beside checkSpaceId
      if (somePiece.id[0] - 1 == checkSpaceId[0]
      || (+somePiece.id[0] + 1) == checkSpaceId[0]) {
        // sees if pawn can checkSpaceId
        // if pawn is blue
        if (somePiece.getAttribute('data-side') === 'blue') {
          return checkSpaceId[1] == (somePiece.id[1] - 1);
        } else { return checkSpaceId[1] == (+somePiece.id[1] + 1); }
      } return false;
    //-----------------------------------------------------------
    case 'knight': return knightAttacks(somePiece, checkSpaceId); 
    //-----------------------------------------------------------
    case 'bishop': return bishopAttacks(somePiece, checkSpaceId);
    //-------------------------------------------------------
    case 'rook': return rookAttacks(somePiece, checkSpaceId);
    //---------------------------------------------------------
    case 'queen': return queenAttacks(somePiece, checkSpaceId);
    //-------------------------------------------------------
    case 'king': return kingAttacks(somePiece, checkSpaceId);
  }
} // returns true/false if somePiece checks checkSpaceId
//======================================================
//======================================================
//======================================================
