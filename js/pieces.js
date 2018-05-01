var player = 'blue', defenders = [], pawnDefenders = [], enPassantCell = '', orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1, enPassanting = false, endOfGame = false,
bishopPathId, rookPathId, blueKingFirstMove, blueRook1FirstMove, activeKing, blueRook2FirstMove,  orangeKingFirstMove, orangeRook1FirstMove, orangeRook2FirstMove, castleIds = [], noCastle, kingAble, pieceToMove, goToDiv, enPassantDiv, prevGoToDiv, enPassantGoToDiv, pawnJumpDiv, enPassantables2 = [], enPassantedPawn, knightLight,takenOrangeBox, takenBlueBox, pieceLit, gameEnds, tempSide, movedPiece, mainLitDiv, litDivs, unLitDivs, img, index1, index2, tempPiece, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, block1, block2, block3, block4, block5, block6, block7, block8, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, kingAttackers, defenders, pinnedPieces, checkedPaths, nails, whites, blacks;

// holds one or two pawn(s) that can eat the enPassanter pawn
var enPassantables = [];

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

// function endGameNow() {
// remove activeSide click listener

// if (activeSide === blues) { alert("blue resigns"); }
// else {alert("orange resigns");} 

// update user profile
// }

function openSpaces(arr1, arr2) { // maybe this needs fixing
  return arr1.filter(cell => {
    return !arr2.some(piece => {
      return cell === piece.id;
    });
  });
}

var board = document.getElementById('board');

let orangeNodes = board.querySelectorAll("[data-side='orange']");
let blueNodes = board.querySelectorAll("[data-side='blue']");

var oranges = Array.from(orangeNodes), blues = Array.from(blueNodes);

var activity = blues, passivity = oranges; 

var pieces = [...oranges, ...blues]; // WORKS

var emptySpaces = openSpaces(boardIds, pieces);

// emptySpaces.forEach( emptySpace => {
//   document.getElementById(emptySpace).side = '';
// });

//========================================================================================
//========================================================================================

// returns true/false if some-piece checks-space 
function checkingSpace(somePiece, checkSpace) {
  // somePiece is a passiveSide <img>
  // checkSpace is an activeSideID (kingSpace not held by an activeSide piece)
  pinnedPieces = []; checkedPaths = [];
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
          // collect that nailed piece into pinnedPieces
          pinnedPieces.push(nails[0]);
      }
    } 
    // returns true/false if no pieces block
    // return nails.length === 0;
    if (nails.length === 0) {
      rookMoves.forEach(move => {
        checkedPaths.push(move);
      });
      return true;
    }
    else { return false; }
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
        for (let i = (+someRook.id[1] + 1); i < checkSpace[1]; i++) {
          rookMoves.push( checkSpace[0] + i.toString() );
        }
      }
      else { // & since someRook above checkSpace
        // rook.y--
        for (let i = (someRook.id[1] - 1); i > checkSpace[1]; i--) {
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
        for (let i = (+someRook.id[0] + 1); i < checkSpace[0]; i++) {
          rookMoves.push( i.toString() + checkSpace[1] );
        }
      }
      else { // since rook right of checkSpace
        // rook.x--
        for (let i = (someRook.id[0] - 1); i > checkSpace[0]; i--) {
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
    // return nails.length === 0;
    if (nails.length === 0) {
      rookMoves.forEach(move => {
        // pushes an id
        checkedPaths.push(move);
      });
      return true;
    } // returns true if no pieces block, else returns false
    else { return false; }
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
