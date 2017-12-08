const pieces = [
  { piece: "king", owner: 1, x: 4, y: 0 },
  { piece: "king", owner: 0, x: 4, y: 7 },
  { piece: "pawn", owner: 1, x: 5, y: 6 } // expected result
];

// var pieces = [
//   {piece: "king", owner: 1, x: 4, y: 0},
//   {piece: "king", owner: 0, x: 4, y: 7},
//   {piece: "rook", owner: 1, x: 4, y: 1}
// ];

// var pieces = [
//   {piece: "king", owner: 1, x: 4, y: 0},
//   {piece: "king", owner: 0, x: 4, y: 7},
//   {piece: "knight", owner: 1, x: 2, y: 6}
// ];

// var pieces = [
//   {piece: "king", owner: 1, x: 4, y: 0},
//   {piece: "king", owner: 0, x: 4, y: 7},
//   {piece: "bishop", owner: 1, x: 0, y: 3}
// ];

// var pieces = [
//   {piece: "king", owner: 1, x: 4, y: 0},
//   {piece: "king", owner: 0, x: 4, y: 7},
//   {piece: "queen", owner: 1, x: 4, y: 1}
// ];

// var pieces = [
//   {piece: "king", owner: 1, x: 4, y: 0},
//   {piece: "king", owner: 0, x: 4, y: 7},
//   {piece: "queen", owner: 1, x: 7, y: 4}
// ];

// var pieces = [
//   {piece: "king", owner: 1, x: 4, y: 0},
//   {piece: "pawn", owner: 0, x: 4, y: 6},
//   {piece: "pawn", owner: 0, x: 5, y: 6},
//   {piece: "king", owner: 0, x: 4, y: 7},
//   {piece: "bishop", owner: 0, x: 5, y: 7},
//   {piece: "bishop", owner: 1, x: 1, y: 4},
//   {piece: "rook", owner: 1, x: 2, y: 7, prevX: 2, prevY: 5}
// ];

//=======================================================================================================================
// {
//   piece: string, // pawn, rook, knight, bishop, queen or king
//   owner: int,    // 0 for white or 1 for black
//   x: int,        // 0-7 where 0 is the leftmost column (or "A")
//   y: int,        // 0-7 where 0 is the top row (or "8" in the board below)
//   prevX: int,    // 0-7, presents this piece's previous x, only given if this is the piece that was just moved
//   prevY: int     // 0-7, presents this piece's previous y, only given if this is the piece that was just moved
// }
// ----------------------------------------------------------------------------------------------------------------------
//***********************************************************************************************************************

let whiteKing, blackKing, clearPath, knightMoves, bishopMoves, rookMoves, kingClear, kingSpaces, kingFreeSpaces, kingAttackers, storage, pinnedPieces = [],
  whites = [],
  blacks = [];

//-----------------------------------------------------------------------------------------------------------------------

function isCheck(pieces, player) { // returns EITHER an array of checking pieces OR false
  // debugger;
  function checkingKing(somePiece, king) { // returns true/false if piece checks opposing king 

    function knightAttacks(knight, king) { // returns true/false if knight checks king
      knightMoves = []; // will contain the two spaces where knight might check king
      // console.log([knight, king]);
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
        // console.log('found');
        if (somePiece.owner === 0) { // sees if white pawn checks blackKing or if black pawn checks whiteKing
          if ([somePiece.x - 1, somePiece.x + 1].includes(blackKing.x)) return blackKing.y === (somePiece.y - 1);
        }
        else if ([somePiece.x - 1, somePiece.x + 1].includes(whiteKing.x)) return whiteKing.y === (somePiece.y + 1);
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

  function inCheck(opposingSide, king) { // discerns whether king is in check
    // console.log(attackingArmy);
    kingAttackers = []; // to contain an array of pieces checking king

    opposingSide.forEach((item) => {
      if (checkingKing(item, king)) { kingAttackers.push(item); }
    });
    // console.log(kingAttackers);
    if (kingAttackers.length > 0) { return kingAttackers; }
    else { return false; }
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

//=================================================================================================
//=================================================================================================

function isMate(pieces, player) { // returns true/false if king checkmated
  //===============================================================================================
  function checkingSpace(somePiece, space) { // returns true/false if opposing piece checks space 
    // somePiece === a piece in opposingSide

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

    switch (somePiece.piece) { // conditions for each opposing piece (except king) to check space
      case 'pawn':
        if ([somePiece.x - 1, somePiece.x + 1].includes(space.x)) {
          if (somePiece.owner === 0) return space.y === (somePiece.y - 1);
          return space.y === (somePiece.y + 1);
        }
        return false;
      case 'knight':
        return knightAttacks(somePiece, space); // sees if black knight checks space
      case 'bishop':
        return bishopAttacks(somePiece, space); // sees if black bishop checks space
      case 'rook':
        return rookAttacks(somePiece, space); // see if black rook checks space
      case 'queen':
        return queenAttacks(somePiece, space); // sees if black queen checks space
    }
  }
  //===============================================================================================
  function kingFree(king, opposingSide) { // returns true/false if king evades check mate
    storage = [];
    kingSpaces = [

      { x: king.x - 1, y: king.y },
      { x: king.x - 1, y: king.y + 1 },
      { x: king.x, y: king.y + 1 },
      { x: king.x + 1, y: king.y + 1 },
      { x: king.x + 1, y: king.y },
      { x: king.x + 1, y: king.y - 1 },
      { x: king.x, y: king.y - 1 },
      { x: king.x - 1, y: king.y - 1 }

    ].map((space) => { // keeps only on-board kingSpaces
      if (space.x >= 0 && space.x <= 7) {
        if (space.y <= 7 && space.y <= 7) { return space; }
      }
    }).filter((item) => { return item !== undefined; });

    pieces.forEach((piece) => { // pushes each occupied space to storage
      if (kingSpaces.includes({ x: piece.x, y: piece.y })) {
        storage.push({ x: piece.x, y: piece.y });
      }
    });

    storage.forEach((item) => { // removes each storage item from kingSpaces
      kingSpaces.splice(kingSpaces.indexOf(item), 1);
    });

    kingFreeSpaces = kingSpaces.map((space) => { // for each space in kingSpaces
      // if no opposing piece attacks that space, add that space to kingFreeSpaces
      if (opposingSide.every((piece) => {!checkingSpace(piece, space); })) { return space; }
    }).filter((item) => { return item !== undefined; });

    if (kingFreeSpaces.length > 0) { console.log(true); return true; } // returns true if king can move out of check

    else { // sees if the attacker inCheck by an opposing piece

      // kingSpaces.forEach((space) => {
      // if ( kingSpaces.includes( the checking piece ) ) {
      //   if ( !inCheck( the checking piece ) ) { king can eat piece }
      // } // *** may have to fiddle with the pieces checking the checking piece... default is opposite side 
      // });

      let possibleCounterAttackers = [];
      let counterAttackers = []; // each king's piece checking the attacker's space
      storage = [];

      if (opposingSide === whites) { // if white defends
        blacks.forEach((piece) => { // for each black piece (except king)
          if (pinnedPieces.includes(piece)) { return; } // if black piece is pinned, try next
          else { possibleCounterAttackers.push(piece);
            storage.push(piece); } // else collect black piece
        });

        storage.forEach((item, index) => { // removes each storage item from possibleCounterAttackers
          possibleCounterAttackers.splice(index, 1);
        });

        //***********************************************
        possibleCounterAttackers.forEach((piece) => { // for each possibleCounterAttacking piece
          // if piece checks space... push piece into counterAttackers array
          kingAttackers.forEach((attacker) => {
            if (checkingSpace(piece, { x: attacker.x, y: attacker.y })) { counterAttackers.push(piece); }
          });
        });
        //***********************************************

        if (counterAttackers === []) { console.log(false); return false; }
      }
      else { // since black defends
        whites.forEach((piece) => { // for each white piece (exept king)
          if (pinnedPieces.includes({ x: piece.x, y: piece.y })) { return; }
          else { possibleCounterAttackers.push({ x: piece.x, y: piece.y }); }
        });

        possibleCounterAttackers.forEach((piece) => {
          if (pinnedPieces.includes(piece)) { storage.push(piece); }
        });

        storage.forEach((item) => { // removes each storage item from kingSpace
          possibleCounterAttackers.splice(possibleCounterAttackers.indexOf(item), 1);
        });

        if (counterAttackers === []) { console.log(false); return false; }
      }
    }
  }
  //===============================================================================================
  if (player === 0) { return kingFree(whiteKing, whites); }
  else { return kingFree(blackKing, blacks); }
}

isCheck(pieces);
