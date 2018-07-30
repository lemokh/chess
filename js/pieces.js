<<<<<<< HEAD
var endOfGame = false,
  enPassantCell = '',
  orangeTakenBoxIdCounter = -16,
  blueTakenBoxIdCounter = -1,
  pawn, pieceToMove, knight, bishop, rook, queen, king, enPassantedPawn, takenOrangeBox, takenBlueBox, pieceLit, gameEnds, tempSide, movedPiece, mainLitDiv, litDivs, unLitDivs, img, index1, index2, tempId, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, block1, block2, block3, block4, block5, block6, block7, block8, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, kingAttackers, defenders, pinnedPieces, checkedPaths, nails, whites, blacks;
=======
var player = 'blue', enPassantCell = '', orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1,
bishopPathId, rookPathId, pieceToMove, goToDiv, enPassantedPawn, takenOrangeBox, takenBlueBox, pieceLit, gameEnds, tempSide, movedPiece, mainLitDiv, litDivs, unLitDivs, img, index1, index2, tempId, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, block1, block2, block3, block4, block5, block6, block7, block8, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, kingAttackers, defenders, pinnedPieces, checkedPaths, nails, whites, blacks;
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5

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

var oranges = Array.from(orangeNodes),
  blues = Array.from(blueNodes);

var pieces = [...oranges, ...blues]; // WORKS

var emptySpaces = openSpaces(boardIds, pieces);

//========================================================================================
//========================================================================================
//========================================================================================

function checkingSpace(somePiece, checkSpace, passiveSide) { // returns true/false if some-piece checks-space 
  // somePiece is an <img> in the passiveSide array 
  // checkSpace is a kingSpace <img> lacking any kingSide pieces
  pinnedPieces = [];
  //--------------------------------------------------------------------------------------------
<<<<<<< HEAD
  function knightAttacks(someKnight, checkSpace) { // returns true/false if knight can checkSpace
    knightMoves = []; // contains the two spaces where knight might checkSpace

    if (+someKnight.id[0] < +checkSpace[0]) { // if someKnight is left of checkSpace
      if (+someKnight.id[1] < +checkSpace[1]) { // and if someKnight is above checkSpace
        knightMoves.push({ x: +someKnight.id[0] + 1, y: +someKnight.id[1] + 2 });
        knightMoves.push({ x: +someKnight.id[0] + 2, y: +someKnight.id[1] + 1 });
=======
  // returns true/false if knight can checkSpace
  function knightAttacks(someKnight, checkSpace) {
    // contains two spaces where knight might checkSpace
    knightMoves = [];
    // if someKnight is left of checkSpace
    if (+someKnight.id[0] < +checkSpace[0]) {
      // and if someKnight is above checkSpace
      if (+someKnight.id[1] < +checkSpace[1]) {
        knightMoves.push(
          { x: +someKnight.id[0] + 1,
            y: +someKnight.id[1] + 2 }
        );
        knightMoves.push(
          { x: +someKnight.id[0] + 2,
            y: +someKnight.id[1] + 1 }
        );
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
      }
      else { // someKnight is left of & below checkSpace
        knightMoves.push({ x: +someKnight.id[0] + 1, y: +someKnight.id[1] - 2 });
        knightMoves.push({ x: +someKnight.id[0] + 2, y: +someKnight.id[1] - 1 });
      }
    }
    else { // someKnight is right of checkSpace
      // and someKnight is above checkSpace
      if (+someKnight.id[1] < +checkSpace[1]) {
        knightMoves.push(
          { x: +someKnight.id[0] - 1,
            y: +someKnight.id[1] + 2 }
        );
        knightMoves.push(
          { x: +someKnight.id[0] - 2,
            y: +someKnight.id[1] + 1 }
        );
      }
      else { // someKnight is right of & below checkSpace
        knightMoves.push(
          { x: +someKnight.id[0] - 1,
            y: +someKnight.id[1] - 2 }
        );
        knightMoves.push(
          { x: +someKnight.id[0] - 2,
            y: +someKnight.id[1] - 1 }
        );
      } // push an id instead?
    }
    for (let i = 0; i < knightMoves.length; i++) {
      if (knightMoves[i].x === +checkSpace[0]) {
        if (knightMoves[i].y === +checkSpace[1]) { 
          return true; 
        }
      }
    }
  } // returns true/false if knight can checkSpace
  //--------------------------------------------------------------------------------------------
  // returns true/false if someBishop can checkSpace
  function bishopAttacks(someBishop, checkSpace) {
    // contains spaces someBishop attacks enroute to checkSpace
    bishopMoves = [];
    nails = []; // collects possible pinnedPieces
    bishopX = someBishop.id[0];
    bishopY = someBishop.id[1];

    if (+someBishop.id[0] === +checkSpace[0]) { return false; }
    if (+someBishop.id[1] === +checkSpace[1]) { return false; }
    
    // (LEFT BOARD SIDE) if someBishop.id is left of king
    if (+someBishop.id[0] < +checkSpace[0]) {
      // (FIRST QUADRANT) and if someBishop is above king
      if (+someBishop.id[1] < +checkSpace[1]) {
        // if someBishop aligns with king
        if (+checkSpace[0] - (+someBishop.id[0]) === (+checkSpace[1]) - (+someBishop.id[1])) {
          // collects all attacking spaces between them
          // while (someBishopX < ) ?
          while (bishopX < (+checkSpace[0] - 1)) {  
            bishopX += 1;
            bishopY += 1;
            bishopMoves.push({ x: bishopX, y: bishopY });
          }
        }
        else { return false; } // bishop can't checkSpace
      }
      else {
       // (THIRD QUADRANT) bishop is left of & below checkSpace
        // if someBishop aligns with checkSpace
        if (+checkSpace[0] - (+someBishop.id[0]) === (+someBishop.id[1]) - (+checkSpace[1])) {
           // collects all attacking spaces between them
           while (bishopX < (+checkSpace.id[0] - 1)) {
            bishopX += 1;
            bishopY -= 1;
            bishopMoves.push({ x: bishopX, y: bishopY });
          }
        }
        else { return false; } // bishop cannot checkSpace
      }
    }
    else {// (RIGHT BOARD SIDE) bishop is right of checkSpace
      // (SECOND QUADRANT) and someBishop is above checkSpace
      if (+someBishop.id[1] < +checkSpace[1]) {
        // if bishop aligns with checkSpace
        if (+someBishop.id[0] - (+checkSpace[0]) === 
           (+checkSpace[1]) - (+someBishop.id[1])) {
// UNSNAG THIS SECTION!!
          // collects all attacking spaces between them
          while (bishopX > (+checkSpace[0] + 1)) { 
            bishopX -= 1;
            bishopY += 1;
            bishopMoves.push({ x: bishopX, y: bishopY });
          } // console.log(bishopMoves);
        }
        else { return false; } // bishop can't checkSpace  
      }
      else {// (FOURTH QUADRANT) bishop is right of & below checkSpace
        // if someBishop aligns with checkSpace
        if (+someBishop.id[0] - (+checkSpace[0]) === 
           (+someBishop.id[1]) - (+checkSpace[1])) {
          // collects all attacking spaces between them
          while (bishopX > +checkSpace[0] + 1) {
            bishopX -= 1;
            bishopY -= 1;
            bishopMoves.push({ x: bishopX, y: bishopY });
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
      }
      else if (nails[0].classList.contains('orange')) {
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
    rookMoves = [];
    // holds spaces rook attacks enroute to checkSpace
    nails = [];
    
    // pushes spaces between Ys of someRook & checkSpace
    // someRook.id --> '00'; checkSpace --> '46';
    
    // someRook & checkSpace share column x
    if (+someRook.id[0] === +checkSpace[0]) {
      // & someRook below checkSpace
      if (+someRook.id[1] < +checkSpace[1]) {
         // someRook.y++
        for (let i = +someRook.id[1] + 1; i < +checkSpace[1]; i++) {
          rookMoves.push({ x: +checkSpace[0], y: i });
        }
      }
      else { // & someRook above checkSpace
        // rook.y--
        for (let i = +someRook.id[1] - 1; i > +checkSpace[1]; i--) {
          rookMoves.push({ x: +checkSpace[0], y: i });
        }
      }
    }
    // pushes all spaces between Xs of rook & checkSpace
    // someRook & checkSpace share row y
    else if (+someRook.id[1] === +checkSpace[1]) {
      // & someRook left of checkSpace
      if (+someRook.id[0] < +checkSpace[0]) {
        // someRook.x++
        for (let i = +someRook.id[0] + 1; i < +checkSpace[0]; i++) {
          rookMoves.push({ x: i, y: +checkSpace[1] });
        }
      }
      else { // & rook right of checkSpace
        // rook.x--
        for (let i = +someRook.id[0] - 1; i > +checkSpace[0]; i--) {
          rookMoves.push({ x: i, y: +checkSpace[1] });
        }
      }
    }
    else { return false; } // rook can't check checkSpace
    // sees if any piece blocks rook's check
    // for each piece on board 
    for (let i = 0; i < pieces.length; i++) {
      // & each space rook moves enroute to checkSpace
      for (let k = 0; k < rookMoves.length; k++) {
        if (+pieces[i].id[0] === rookMoves[k].x) {
          if (+pieces[i].id[1] === rookMoves[k].y) {
            nails.push(pieces[i]);
            // expecting {x: _, y: _} ... got <img>
          }
        }
      }
    }
    if (nails.length === 1) {
      // if (nails[0].side !== someRook.side) {
      if (nails[0].classList.contains('blue')) {
        if (someRook.classList.contains('blue')) {
          pinnedPieces.push(nails[0]);
        }
      }
      else if (nails[0].classList.contains('orange')) {
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
    case 'pawn': // ADD PAWN JUMP TWO & ENPASSANT?
      // if pawn is one left or right of check space,
      // then sees if pawn can checkSpace
      if ([+somePiece.id[0] - 1, +somePiece.x + 1].includes(+checkSpace[0])) {
<<<<<<< HEAD
        if (passiveSide === blues) { return +checkSpace[1] === (+somePiece.id[1] - 1); }
        else { return +checkSpace[1] === (+somePiece.id[1] + 1); }
      }
      return false;
      //--------------------------------------------------------------------------------------------
    case 'knight':
      return knightAttacks(somePiece, checkSpace);
      //--------------------------------------------------------------------------------------------
    case 'bishop':
      return bishopAttacks(somePiece, checkSpace);
      //--------------------------------------------------------------------------------------------
    case 'rook':
      return rookAttacks(somePiece, checkSpace);
      //--------------------------------------------------------------------------------------------
    case 'queen':
      return queenAttacks(somePiece, checkSpace);
      //--------------------------------------------------------------------------------------------
    case 'king':
      return kingAttacks(somePiece, checkSpace);
=======
        if (passiveSide === blues) {
          return +checkSpace[1] === (+somePiece.id[1] - 1);
        }
        else {
          return +checkSpace[1] === (+somePiece.id[1] + 1);
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
>>>>>>> fa3be4fed88dbe2911ed04145a4581804d6286e5
  }
} // returns true/false if somePiece checks space
//===============================================================================================
