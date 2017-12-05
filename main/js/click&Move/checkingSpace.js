 function checkingSpace(somePiece, space) { // returns true/false if opposing piece checks space 
   // somePiece ==== opposingSide(index) ---> pieces[i];
   // returns true/false if any opposing piece attacks space (king)

   function knightAttacks(knight, king) { // returns true/false if knight checks king

     knightMoves = []; // will contain the two spaces where knight might check king

     if (knight.x < king.x) { // if knight is left of king
       if (knight.y < king.y) { // and if knight is below king
         knightMoves.push({ x: knight.x + 1, y: knight.y + 2 });
         knightMoves.push({ x: knight.x + 2, y: knight.y + 1 });
       }
       else { // knight is left of and above king
         knightMoves.push({ x: knight.x + 1, y: knight.y - 2 });
         knightMoves.push({ x: knight.x + 2, y: knight.y - 1 });
       }
     }
     else { // knight is right of king
       if (knight.y < king.y) { // and knight is below king
         knightMoves.push({ x: knight.x - 1, y: knight.y + 2 });
         knightMoves.push({ x: knight.x - 2, y: knight.y + 1 });
       }
       else { // knight is right of and above king
         knightMoves.push({ x: knight.x - 1, y: knight.y - 2 });
         knightMoves.push({ x: knight.x - 2, y: knight.y - 1 });
       }
     }
     return knightMoves.includes({ x: king.x, y: king.y });
   } // end of kingAttacks

   function bishopAttacks(bishop, king) { // returns true/false if bishop checks king

     bishopMoves = []; // will contain all spaces bishop attacks enroute to king
     clearPath = true;

     if (bishop.x < king.x) { // if bishop is left of king
       if (bishop.y < king.y) { // and if bishop is below king
         while (bishop.x <= king.x && bishop.y >= king.y) { // push all x & y between bishop & king
           bishop.x += 1;
           bishop.y += 1;
           bishopMoves.push({ x: bishop.x, y: bishop.y });
         }
       }
       else { // bishop is left of and above king
         while (bishop.x <= king.x && bishop.y >= king.y) { // push all x & y between bishop & king
           bishop.x += 1;
           bishop.y -= 1;
           bishopMoves.push({ x: bishop.x, y: bishop.y });
         }
       }
     }
     else { // bishop is right of king
       if (bishop.y < king.y) { // and bishop is below king
         while (bishop.x >= king.x && bishop.y <= king.y) { // push all x & y between bishop & king
           bishop.x -= 1;
           bishop.y += 1;
           bishopMoves.push({ x: bishop.x, y: bishop.y });
         }
       }
       else { // bishop is right of and above king
         while (bishop.x >= king.x && bishop.y >= king.y) { // push all x & y between bishop & king
           bishop.x -= 1;
           bishop.y -= 1;
           bishopMoves.push({ x: bishop.x, y: bishop.y });
         }
       }
     }
     if (bishopMoves.includes({ x: king.x, y: king.y })) { // if bishop aligns with king
       // sees if any piece obstructs bishop's check
       pieces.forEach((item) => { // for each piece on board (except this bishop & that king)
         if (clearPath === false) return;
         if (item.piece === 'rook' && item.owner === bishop.owner) return;
         if (item.piece === 'king' && item.owner === king.owner) return;
         return bishopMoves.forEach((space) => { // & for each space bishop attacks enroute to king
           if ({ x: item.x, y: item.y } === space) { clearPath = false; } // item blocks bishop's path to king
         });
       });
       return clearPath; // returns true if no pieces block, else false
     }
     return false; // since bishop doesn't align with king
   } // end of bishopAttacks

   function rookAttacks(rook, king) { // returns true/false
     rookMoves = [];
     clearPath = true;
     // will contain all spaces that rook attacks enroute to king

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
         if ({ x: item.x, y: item.y } === space) { clearPath = false; } // item blocks rook's path to king
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
       if (somePiece.owner === 0) return knightAttacks(somePiece, space); // sees if white knight checks space
       return knightAttacks(somePiece, space); // sees if black knight checks space
     case 'bishop':
       if (somePiece.owner === 0) return bishopAttacks(somePiece, space); // sees if white bishop checks space
       return bishopAttacks(somePiece, space); // sees if black bishop checks space
     case 'rook':
       if (somePiece.owner === 0) return rookAttacks(somePiece, space); // sees if white rook checks space
       return rookAttacks(somePiece, space); // see if black rook checks space
     case 'queen':
       if (somePiece.owner === 0) return queenAttacks(somePiece, space); // sees if white queen checks space
       return queenAttacks(somePiece, space); // sees if black queen checks space
   }
 }
 