function insert(arr) {
  arr.forEach((item) => {
    const id = item.x + item.y;
    const img = document.createElement("img");
    img.src = item.image;
    document.getElementById(id).appendChild(img);
  });
}

let blacks = [
  { name: 'pawn', x: "0", y: "1", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'pawn', x: "1", y: "1", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'pawn', x: "2", y: "1", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'pawn', x: "3", y: "1", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'pawn', x: "4", y: "1", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'pawn', x: "5", y: "1", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'pawn', x: "6", y: "1", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'pawn', x: "7", y: "1", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },

  { name: 'knight', x: "1", y: "0", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'knight', x: "6", y: "0", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },

  { name: 'bishop', x: "2", y: "0", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'bishop', x: "5", y: "0", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },

  { name: 'rook', x: "0", y: "0", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
  { name: 'rook', x: "7", y: "0", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },

  { name: 'queen', x: "3", y: "0", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },

  { name: 'king', x: "4", y: "0", image: 'https://github.com/lemokh/Photos/blob/master/whitePawn.png?raw=true' },
];

let whites = [
  { name: 'pawn', x: "0", y: "6", image: 'https://github.com/lemokh/Photos/blob/master/bluePawn.png?raw=true' },
  { name: 'pawn', x: "1", y: "6", image: 'https://github.com/lemokh/Photos/blob/master/bluePawn.png?raw=true' },
  { name: 'pawn', x: "2", y: "6", image: 'https://github.com/lemokh/Photos/blob/master/bluePawn.png?raw=true' },
  { name: 'pawn', x: "3", y: "6", image: 'https://github.com/lemokh/Photos/blob/master/bluePawn.png?raw=true' },
  { name: 'pawn', x: "4", y: "6", image: 'https://github.com/lemokh/Photos/blob/master/bluePawn.png?raw=true' },
  { name: 'pawn', x: "5", y: "6", image: 'https://github.com/lemokh/Photos/blob/master/bluePawn.png?raw=true' },
  { name: 'pawn', x: "6", y: "6", image: 'https://github.com/lemokh/Photos/blob/master/bluePawn.png?raw=true' },
  { name: 'pawn', x: "7", y: "6", image: 'https://github.com/lemokh/Photos/blob/master/bluePawn.png?raw=true' },

  { name: 'knight', x: "1", y: "7", image: '' },
  { name: 'knight', x: "6", y: "7", image: '' },

  { name: 'bishop', x: "2", y: "7", image: '' },
  { name: 'bishop', x: "5", y: "7", image: '' },

  { name: 'rook', x: "0", y: "7", image: '' },
  { name: 'rook', x: "7", y: "7", image: '' },

  { name: 'queen', x: "3", y: "7", image: '' },

  { name: 'king', x: "4", y: "7", image: '' }
];

let pieces = [blacks, whites].reduce((b, w) => b.concat(w), []);

// console.log(pieces);
insert(pieces);
