function setSides(pieces) { // sets whiteKing & blackKing values
  pieces.forEach(function(item) { 
    if (item.piece === 'king') {
      if (item.owner === 0) { whiteKing = item; } // cover for more multiple white kings?
      else { blackKing = item; }
    }
    else { // since not a king, add piece to whites or blacks array
      if (item.owner === 0) { whites.push(item); }
      else { blacks.push(item); }
    }
  });
}