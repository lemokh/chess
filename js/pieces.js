var pieces, mainLitDiv, litDivs, unLitDivs, img, index, tempId, moves, takenBox, enPassant, activeCells, activeSideLessKingSpaces, kingSpacesUnderAttack, orangeKingSpacesUnderAttack, orangelessKingSpaces, orangelessKingSpaces, blueKingSpaces, bluelessKingSpaces, orangeKingSpacesUnderAttack, block1, block2, block3, block4, block5, block6, block7, block8, vacantKingSpaces, whiteKing, blackKing, knightMoves, bishopMoves, bishopX, bishopY, rookMoves, kingSpaces, kingOpenSpaces, occupiedKingSpaces, kingAttackers, defenders, pinnedPieces, checkedPaths, nails, whites, blacks;

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


function openSpaces(arr1, arr2) {
	return arr1.filter(cell => {
   return !arr2.some(piece => {
     return cell === piece.x.toString() + piece.y.toString();
   });
  });
}


let oranges = [
{ name: 'pawn', x: 0, y: 1, image: './images/orangePawn.png' },
{ name: 'pawn', x: 1, y: 3, image: './images/orangePawn.png' },
{ name: 'pawn', x: 2, y: 1, image: './images/orangePawn.png' },
{ name: 'pawn', x: 3, y: 1, image: './images/orangePawn.png' },
{ name: 'pawn', x: 4, y: 1, image: './images/orangePawn.png' },
{ name: 'pawn', x: 5, y: 2, image: './images/orangePawn.png' },
{ name: 'pawn', x: 6, y: 1, image: './images/orangePawn.png' },
{ name: 'pawn', x: 7, y: 4, image: './images/orangePawn.png' },

{ name: 'knight', x: 6, y: 3, image: './images/orangeKnight.png' },
{ name: 'knight', x: 6, y: 0, image: './images/orangeKnight.png' },

{ name: 'bishop', x: 3, y: 3, image: './images/orangeBishop.png' },
{ name: 'bishop', x: 5, y: 0, image: './images/orangeBishop.png' },

{ name: 'rook', x: 0, y: 0, image: './images/orangeRook.png' },
{ name: 'rook', x: 7, y: 0, image: './images/orangeRook.png' },

{ name: 'queen', x: 3, y: 0, image: './images/orangeQueen.png' },

{ name: 'king', x: 5, y: 3, image: './images/orangeKing.png' },
];

let blues = [
{ name: 'pawn', x: 0, y: 5, image: './images/bluePawn.png' },
{ name: 'pawn', x: 1, y: 6, image: './images/bluePawn.png' },
{ name: 'pawn', x: 2, y: 6, image: './images/bluePawn.png' },
{ name: 'pawn', x: 3, y: 6, image: './images/bluePawn.png' },
{ name: 'pawn', x: 4, y: 6, image: './images/bluePawn.png' },
{ name: 'pawn', x: 5, y: 6, image: './images/bluePawn.png' },
{ name: 'pawn', x: 6, y: 5, image: './images/bluePawn.png' },
{ name: 'pawn', x: 7, y: 5, image: './images/bluePawn.png' },

{ name: 'knight', x: 1, y: 7, image: './images/blueKnight.png' },
{ name: 'knight', x: 6, y: 7, image: './images/blueKnight.png' },

{ name: 'bishop', x: 2, y: 4, image: './images/blueBishop.png' },
{ name: 'bishop', x: 5, y: 7, image: './images/blueBishop.png' },

{ name: 'rook', x: 0, y: 7, image: './images/blueRook.png' },
{ name: 'rook', x: 7, y: 7, image: './images/blueRook.png' },

{ name: 'queen', x: 3, y: 7, image: './images/blueQueen.png' },

{ name: 'king', x: 4, y: 5, image: './images/blueKing.png' }
];
  
pieces = [...oranges, ...blues];

// const board = document.getElementsByTagName('board');

pieces.forEach(item => {
  img = document.createElement("img");
  img.src = item.image;
  img.id = item.x.toString() + item.y.toString();;
  document.getElementById(img.id).appendChild(img);
});

let emptySpaces = openSpaces(boardIds, pieces);

function checkingSpace(somePiece, checkSpace) { // returns true/false if opposing piece checks space 
    // somePiece is an object in the opposingSide array ---> checkSpace is the target piece
  
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
        if (nails[0].owner !== bishop.owner) {
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
        if (nails[0].owner !== rook.owner) {
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
          if (somePiece.owner === 0) return checkSpace.y === (somePiece.y - 1);
          return checkSpace.y === (somePiece.y + 1);
        } return false;
      case 'knight': return knightAttacks(somePiece, checkSpace); // sees if knight can checkSpace
      case 'bishop': return bishopAttacks(somePiece, checkSpace); // sees if bishop can checkSpace
      case 'rook': return rookAttacks(somePiece, checkSpace); // sees if rook can checkSpace
      case 'queen': return queenAttacks(somePiece, checkSpace); // sees if queen can checkSpace
      case 'king': return kingAttacks(somePiece, checkSpace); // sees if king can checkSpace
    }
} // returns true/false if somePiece checks space
//===============================================================================================