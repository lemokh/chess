function kingFree(king, opposingSideArr) { // returns true/false if king evades check mate

  kingSpaces = [{ x: king.x - 1, y: king.y }, { x: king.x - 1, y: king.y + 1 }, { x: king.x, y: king.y + 1 }, { x: king.x + 1, y: king.y + 1 }, { x: king.x + 1, y: king.y }, { x: king.x + 1, y: king.y - 1 }, { x: king.x, y: king.y - 1 }, { x: king.x - 1, y: king.y - 1 }];

  attackingSpace = { x: opposingSideArr[index].x, y: opposingSideArr[index].y };

  kingSpaces.forEach((place, index, object) => { // removes any off-board kingSpaces
    if (place.x < 0 || place.y < 0) return object.splice(index, 1);
    if (place.x > 7 || place.y > 7) return object.splice(index, 1);
  });

  // array of spaces where king may avoid check mate  
  const kingFreeSpaces = pieces.map(function(item) { // for each attacking piece on board
    // sees if any of these places are under check
    return kingSpaces.forEach((space, index, object) => { // for each space surrounding king
      if ({ x: item.x, y: item.y } === space) return object.splice(index, 1); // if piece occupyies space, try next piece

      // sees if each OPPOSING piece checks space
      if (isCheck(opposingSideArr[index], space)) return space;
      return object.splice(index, 1);

    });
  });
  return kingFreeSpaces.length === 0; // returns true/false if king can move out of check
}
