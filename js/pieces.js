var player = 'blue', enPassantCell = '', orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1,
bishopPathId, rookPathId, pieceToMove, goToDiv, enPassantedPawn, takenOrangeBox, takenBlueBox, pieceLit, gameEnds, tempSide, movedPiece, mainLitDiv, litDivs, unLitDivs, img, index1, index2, tempId, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, block1, block2, block3, block4, block5, block6, block7, block8, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, kingAttackers, defenders, pinnedPieces, checkedPaths, nails, whites, blacks;

// holds pawns that can eat the enPassanter pawn
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

let orangeNodes = board.getElementsByClassName('orange');
let blueNodes = board.getElementsByClassName('blue');

var oranges = Array.from(orangeNodes), blues = Array.from(blueNodes);

var pieces = [...oranges, ...blues]; // WORKS

var emptySpaces = openSpaces(boardIds, pieces);

//========================================================================================
//========================================================================================
//========================================================================================

// returns true/false if some-piece checks-space 
function checkingSpace(somePiece, checkSpace, passiveSide) {
  // somePiece is an <img> in the passiveSide array 
  // checkSpace is a kingSpace <img> lacking any kingSide pieces
  pinnedPieces = [];
  //--------------------------------------------------------------------------------------------
  // returns true/false if knight can checkSpace
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
      else {
      // since someKnight is left of & below checkSpace
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
    else { 
    // since someKnight is right of & above checkSpace
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
  } // returns true/false if knight can checkSpace
  //--------------------------------------------------------------------------------------------
  // returns true/false if someBishop can checkSpace
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
  // FIX THIS --> can't read checkSpace.id[0]
          console.log(checkSpace);
          while (bishopX < (checkSpace.id[0] - 1)) {
            bishopX += 1;
            bishopY -= 1;
            bishopMoves.push( bishopX + bishopY.toString() );
          }
        }
        else { return false; } // bishop cannot checkSpace
      }
    }
    else {// (RIGHT BOARD SIDE)
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
    // for each piece on board,
    for (let i = 0; i < pieces.length; i++) {
       // for each space bishop moves enroute to checkSpace
      for (let k = 0; k < bishopMoves.length; k++) {
        if (+pieces[i].id[0] === bishopMoves[k].x) {
          if (+pieces[i].id[0] === bishopMoves[k].y) {
            nails.push(pieces[i]);
          }
        }
      }
    }
    if (nails.length === 1) {
      // if (nails[0].side !== bishop.side) {
      if (nails[0].classList.contains('blue')) {
        if (someBishop.classList.contains('blue')) {
          pinnedPieces.push(nails[0]);
        }
      } else if (nails[0].classList.contains('orange')) {
        if (someBishop.classList.contains('orange')) {
          pinnedPieces.push(nails[0]);
        }
      }
    }
    // returns true if no pieces block,
    // else returns false
    return nails.length === 0;
  }
  //--------------------------------------------------------------------------------------------
  // returns true/false if someRook can checkSpace
  function rookAttacks(someRook, checkSpace) {
    // to hold spaces rook attacks enroute to checkSpace
    rookMoves = [];
    // to hold spaces that cannot be moved
    nails = [];
  
    // someRook.id --> '##';   checkSpace --> '##';
    // pushes row spaces between someRook & checkSpace
  
    // if someRook & checkSpace share column x
    if (someRook.id[0] === checkSpace[0]) {
      // & if someRook below checkSpace
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
      // & if someRook left of checkSpace
      if (someRook.id[0] < checkSpace[0]) {
        // someRook.x++
        for (let i = +someRook.id[0] + 1; i < checkSpace[0]; i++) {
          rookMoves.push( i.toString() + checkSpace[1] );
        }
      }
      else { // & since rook right of checkSpace
        // rook.x--
        for (let i = +someRook.id[0] - 1; i > checkSpace[0]; i--) {
          rookMoves.push( i.toString() + checkSpace[1] );
        }
      }
    }
    else { return false; } // rook can't checkSpace
    
    // sees if any piece blocks rook's attack path
    
    // for each piece's <img> on board 
    for (let i = 0; i < pieces.length; i++) {
      // & each rook id enroute to checkSpace
      for (let k = 0; k < rookMoves.length; k++) {
        if (pieces[i].id === rookMoves[k]) {
          // pushes nailed piece's <img>
          nails.push(pieces[i]);
        }
      }
    }
    // (passiveSide contains somePiece)
    if (nails.length === 1) {
      // if (nails[0].side !== someRook.side) {
      if (nails[0].classList.contains('blue')) {
        if (someRook.classList.contains('blue')) {
          pinnedPieces.push(nails[0]);
        }
      } else if (nails[0].classList.contains('orange')) {
        if (someRook.classList.contains('orange')) {
          pinnedPieces.push(nails[0]);
        }
      }
    }
    // returns true/false if no pieces block
    return nails.length === 0;
  }
  //--------------------------------------------------------------------------------------------
  // returns true/false if queen can checkSpace
  function queenAttacks(someQueen, checkSpace) {
    return (
      bishopAttacks(someQueen, checkSpace) 
      || rookAttacks(someQueen, checkSpace)
    );
  }
  //--------------------------------------------------------------------------------------------
  // returns true if someKing can attack checkSpace
  function kingAttacks(someKing, checkSpace) {
    switch (+checkSpace[0]) {
      case +someKing.id[0]:
        return (+checkSpace[1] === +someKing.id[1] + 1)
            || (+checkSpace[1] === +someKing.id[1] - 1);
      case +someKing.id[0] + 1:
        return (+checkSpace[1] === +someKing.id[1])
            || (+checkSpace[1] === +someKing.id[1] + 1)
            || (+checkSpace[1] === +someKing.id[1] - 1);
      case +someKing.id[0] - 1:
        return (+checkSpace[1] === +someKing.id[1])
            || (+checkSpace[1] === +someKing.id[1] + 1)
            || (+checkSpace[1] === +someKing.id[1] - 1);
    }
  }
  //--------------------------------------------------------------------------------------------
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/  
  //--------------------------------------------------------------------------------------------
  // sees if some piece can check space
  switch (somePiece.name) {
    //--------------------------------------------------------------------------------------------
    case 'pawn':
    // ADD PAWN JUMP TWO & ENPASSANT?
      // if pawn is one left or right of check space
      if ([somePiece.id[0] - 1, +somePiece.id[0] + 1].includes(+checkSpace[0])) {
        // sees if pawn can checkSpace
        if (passiveSide === blues) {
          return checkSpace[1] == (somePiece.id[1] - 1);
        }
        else {
          return checkSpace[1] == (+somePiece.id[1] + 1);
        }
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
} // returns true/false if somePiece checks space
//===============================================================================================
