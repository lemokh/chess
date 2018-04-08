var player = 'blue', enPassantCell = '', orangeTakenBoxIdCounter = -16, blueTakenBoxIdCounter = -1,
pawn, knight, bishop, rook, queen, king, enPassantedPawn, takenOrangeBox, takenBlueBox, pieceLit, gameEnds, tempSide, movedPiece, mainLitDiv, litDivs, unLitDivs, img, index1, index2, tempId, moves, takenBox, activeCells, openAndOpponentHeldKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, block1, block2, block3, block4, block5, block6, block7, block8, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, kingAttackers, defenders, pinnedPieces, checkedPaths, nails, whites, blacks;

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

function checkingSpace(somePiece, checkSpace, passiveSide) { // returns true/false if some-piece checks-space 
  // somePiece is an <img> in the passiveSide array 
  // checkSpace is a kingSpace <img> lacking any kingSide pieces
  //--------------------------------------------------------------------------------------------
  function knightAttacks(knight, checkSpace) { // returns true/false if knight can checkSpace
    knightMoves = []; // contains the two spaces where knight might checkSpace

    if (+knight.id[0] < +checkSpace.id[0]) { // if knight is left of checkSpace
      if (+knight.id[1] < +checkSpace.id[1]) { // and if knight is above checkSpace
        knightMoves.push({ x: +knight.id[0] + 1, y: +knight.id[1] + 2 });
        knightMoves.push({ x: +knight.id[0] + 2, y: +knight.id[1] + 1 });
      }
      else { // knight is left of and below checkSpace
        knightMoves.push({ x: +knight.id[0] + 1, y: +knight.id[1] - 2 });
        knightMoves.push({ x: +knight.id[0] + 2, y: +knight.id[1] - 1 });
      }
    }
    else { // knight is right of checkSpace
      if (+knight.id[1] < +checkSpace.id[1]) { // and knight is above checkSpace
        knightMoves.push({ x: +knight.id[0] - 1, y: +knight.id[1] + 2 });
        knightMoves.push({ x: +knight.id[0] - 2, y: +knight.id[1] + 1 });
      }
      else { // knight is right of and below checkSpace
        knightMoves.push({ x: +knight.id[0] - 1, y: +knight.id[1] - 2 });
        knightMoves.push({ x: +knight.id[0] - 2, y: +knight.id[1] - 1 });
      } // push an instead id?
    }
    for (let i = 0; i < knightMoves.length; i++) {
      if (knightMoves[i].x === +checkSpace.id[0]) {
        if (knightMoves[i].y === +checkSpace.id[1]) { return true; }
      }
    }
  } // end of knightAttacks --> returns true/false if knight can checkSpace
  //--------------------------------------------------------------------------------------------
  function bishopAttacks(bishop, checkSpace) { // returns true/false if bishop can checkSpace
    bishopMoves = []; // contains all spaces bishop attacks enroute to checkSpace
    nails = []; // collects possible pinnedPieces
    bishopX = bishop.id[0];
    bishopY = bishop.id[1];


    if (+bishop.id[0] === +checkSpace.id[0]) { return false; }
    if (+bishop.id[1] === +checkSpace.id[1]) { return false; }

    if (+bishop.id[0] < +checkSpace.id[0]) { // if bishop is left of king (LEFT BOARD SIDE)

      if (+bishop.id[1] < +checkSpace.id[1]) { // and if bishop is above king (FIRST QUADRANT)
        if (+checkSpace.id[0] - (+bishop.id[0]) === (+checkSpace.id[1]) - (+bishop.id[1])) { // if bishop aligns with king
          while (bishopX < +checkSpace.id[0] - 1) { // collects all attacking spaces between them
            bishopX += 1;
            bishopY += 1;
            bishopMoves.push({ x: bishopX, y: bishopY });
          }
        }
        else { return false; } // bishop cannot checkSpace
      }
      else { // bishop is left of and below checkSpace (THIRD QUADRANT)
        if (+checkSpace.id[0] - (+bishop.id[0]) === (+bishop.id[1]) - (+checkSpace.id[1])) { // if bishop aligns with checkSpace
          while (bishopX < (+checkSpace.id[0]) - 1) { // collects all attacking spaces between them
            bishopX += 1;
            bishopY -= 1;
            bishopMoves.push({ x: bishopX, y: bishopY });
          }
        }
        else { return false; } // bishop cannot checkSpace
      }
    }
    else { // bishop is right of checkSpace (RIGHT BOARD SIDE)
      if (+bishop.id[1] < +checkSpace.id[1]) { // and bishop is above checkSpace (SECOND QUADRANT)
        if (+bishop.id[0] - (+checkSpace.id[0]) === (+checkSpace.id[1]) - (+bishop.id[1])) { // if bishop aligns with checkSpace
          while (bishopX > +checkSpace.id[0] + 1) { // collects all attacking spaces between them
            bishopX -= 1;
            bishopY += 1;
            bishopMoves.push({ x: bishopX, y: bishopY });
          } // console.log(bishopMoves);
        }
        else { return false; } // bishop cannot checkSpace  
      }
      else { // bishop is right of and below checkSpace (FOURTH QUADRANT)
        if (+bishop.id[0] - (+checkSpace.id[0]) === (+bishop.id[1]) - (+checkSpace.id[1])) { // if bishop aligns with checkSpace
          while (bishopX > +checkSpace.id[0] + 1) { // collects all attacking spaces between them
            bishopX -= 1;
            bishopY -= 1;
            bishopMoves.push({ x: bishopX, y: bishopY });
          } // console.log(bishopMoves);
        }
        else { return false; } // bishop can't attack king 
      }
    } // console.log(bishopMoves);

    // sees if any piece obstructs bishop's check  
    for (let i = 0; i < pieces.length; i++) { // for each piece on board 
      for (let k = 0; k < bishopMoves.length; k++) { // for each space bishop moves enroute to checkSpace
        if (+pieces[i].id[0] === bishopMoves[k].x) {
          if (+pieces[i].id[0] === bishopMoves[k].y) {
            nails.push(pieces[i]);
          }
        }
      }
    }
    if (nails.length === 1) {
      // if (nails[0].side !== bishop.side) {
      if (nails[0].classList.includes('blue')) {
        if (bishop.classList.includes('blue')) {
          pinnedPieces.push(nails[0]);
        }
      } else if (nails[0].classList.includes('orange')) {
        if (bishop.classList.includes('orange')) {
          pinnedPieces.push(nails[0]);
        }
      }
    }
    return nails.length === 0; // returns true if no pieces block, else returns false
  } // end of bishopAttacks
  //--------------------------------------------------------------------------------------------
  function rookAttacks(rook, checkSpace) { // returns true/false if rook can checkSpace
    rookMoves = [];
    nails = []; // holds all spaces that rook attacks enroute to checkSpace
    // pushes all spaces between Ys of rook & checkSpace
    if (+rook.id[0] === +checkSpace.id[0]) { // rook & checkSpace share column x
      if (+rook.id[1] < +checkSpace.id[1]) { // & rook below checkSpace
        for (let i = +rook.id[1] + 1; i < +checkSpace.id[1]; i++) { // rook.y++
          rookMoves.push({ x: +checkSpace.id[0], y: i });
        }
      }
      else { // & rook above checkSpace 
        for (let i = +rook.id[1] - 1; i > +checkSpace.id[1]; i--) { // rook.y--
          rookMoves.push({ x: +checkSpace.id[0], y: i });
        }
      }
    }
    // pushes all spaces between Xs of rook & checkSpace
    else if (+rook.id[1] === +checkSpace.id[1]) { // rook & checkSpace share row y
      if (+rook.id[0] < +checkSpace.id[0]) { // & rook left of checkSpace
        for (let i = +rook.id[0] + 1; i < +checkSpace.id[0]; i++) { // rook.x++
          rookMoves.push({ x: i, y: +checkSpace.id[1] });
        }
      }
      else { // & rook right of checkSpace
        for (let i = +rook.id[0] - 1; i > +checkSpace.id[0]; i--) { // rook.x--
          rookMoves.push({ x: i, y: +checkSpace.id[1] });
        }
      }
    }
    else { return false; } // rook can't check checkSpace
    // sees if any piece blocks rook's check
    for (let i = 0; i < pieces.length; i++) { // for each piece on board 
      for (let k = 0; k < rookMoves.length; k++) { // & each space rook moves enroute to checkSpace
        if (+pieces[i].id[0] === rookMoves[k].x) {
          if (+pieces[i].id[1] === rookMoves[k].y) {
            nails.push(pieces[i]); // --> expecting {x: _, y: _}
          }
        }
      }
    }
    if (nails.length === 1) {
      // if (nails[0].side !== bishop.side) {
      if (nails[0].classList.includes('blue')) {
        if (rook.classList.includes('blue')) {
          pinnedPieces.push(nails[0]);
        }
      } else if (nails[0].classList.includes('orange')) {
        if (rook.classList.includes('orange')) {
          pinnedPieces.push(nails[0]);
        }
      }
    }
    return nails.length === 0; // returns true if no pieces block, else returns false
  } // end of rookAttacks
  //--------------------------------------------------------------------------------------------
  function queenAttacks(queen, checkSpace) { // returns true/false if queen can checkSpace
    return (bishopAttacks(queen, checkSpace) || rookAttacks(queen, checkSpace));
  }
  //--------------------------------------------------------------------------------------------
  function kingAttacks(king, checkSpace) { // returns true if king can attack checkSpace
    switch (+checkSpace.id[0]) {
      case +king.id[0] - 1:
        return (+checkSpace.id[1] === +king.id[1] + 1) || (+checkSpace.id[1] === +king.id[1]) || (+checkSpace.id[1] === +king.id[1] - 1);
      case +king.id[0]:
        return (+checkSpace.id[1] === +king.id[1] + 1) || (+checkSpace.id[1] === +king.id[1] - 1);
      case +king.id[0] + 1:
        return (+checkSpace.id[1] === +king.id[1] + 1) || (+checkSpace.id[1] === +king.id[1]) || (+checkSpace.id[1] === +king.id[1] - 1);
    }
  }
  //--------------------------------------------------------------------------------------------
  //\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/  
  //--------------------------------------------------------------------------------------------
  switch (somePiece.name) { // sees if some piece can check space
    //--------------------------------------------------------------------------------------------
    case 'pawn': // ADD PAWN JUMP TWO & ENPASSANT
      // if pawn is one cell left or right of check space
      if ([+somePiece.id[0] - 1, +somePiece.x + 1].includes(+checkSpace.id[0])) { // sees if pawn can checkSpace
        if (passiveSide === blues) { return +checkSpace.id[1] === (+somePiece.id[1] - 1); }
        else { return +checkSpace.id[1] === (+somePiece.id[1] + 1); }
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
