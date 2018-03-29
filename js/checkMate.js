function checkMate() {
    
    function isCheck(pieces, player) { // returns EITHER an array of checking pieces OR false
      
      whites = []; blacks = []; pinnedPieces = []; checkedPaths = [];
      
      function checkingKing(somePiece, king) { // returns true/false if piece checks opposing king
        
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
        

        // FIX .side value to fit pieces array values!
        switch (somePiece.name) { // conditions for each piece (except king) to check opposing king
          case 'pawn':
           if (somePiece.side === 0) { // sees if white pawn checks blackKing or if black pawn checks whiteKing
              if ([somePiece.x - 1, somePiece.x + 1].includes(blackKing.x)) return blackKing.y === (somePiece.y - 1);
            } else if ([somePiece.x - 1, somePiece.x + 1].includes(whiteKing.x)) return whiteKing.y === (somePiece.y + 1);
            return false;
          case 'knight':
            if (somePiece.side === 0) return knightAttacks(somePiece, blackKing); // sees if white knight checks blackKing
            return knightAttacks(somePiece, whiteKing); // sees if black knight checks whiteKing
          case 'bishop':
            if (somePiece.side === 0) return bishopAttacks(somePiece, blackKing); // sees if white bishop checks blackKing
            return bishopAttacks(somePiece, whiteKing); // sees if black bishop checks whiteKing
          case 'rook':
           if (somePiece.side === 0) return rookAttacks(somePiece, blackKing); // sees if white rook checks blackKing
           return rookAttacks(somePiece, whiteKing); // see if black rook checks whiteKing
          case 'queen':
            if (somePiece.side === 0) return queenAttacks(somePiece, blackKing); // sees if white queen checks blackKing
            return queenAttacks(somePiece, whiteKing); // sees if black queen checks whiteKing
        }
      }
      
      function inCheck(opposingSide, king) { // discerns if check
        
        kingAttackers = []; // contains pieces checking king
        
        opposingSide.forEach(item => {
          if (checkingKing(item, king)) { kingAttackers.push(item); }
        }); //console.log(kingAttackers);
        
        if (kingAttackers.length > 0) { return kingAttackers; }
        else { return false; }
      }
     

      // FIX .side value to fit pieces array values!
      pieces.forEach(function(item) { // sets whiteKing & blackKing values
        if (item.name === 'king') {
          if (item.side === 0) { whiteKing = item; } // cover for more multiple white kings?
          else { blackKing = item; }
        } 
        else { // since not a king, add piece to whites or blacks array
          if (item.side === 0) { whites.push(item); }
          else { blacks.push(item); }
        }
      });
      
      inCheck(opponentSide, activeSideKing); }
    }
}