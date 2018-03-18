function insert(arr) {
  arr.forEach(item => {
    const id = item.x + item.y;
    const img = document.createElement("img");
    img.src = item.image;
    document.getElementById(id).appendChild(img);
  });
}

let blacks = [
  { name: 'pawn', x: "0", y: "1", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/black-ink-grunge-stamps-textures-icons-sports-hobbies/042467-black-ink-grunge-stamp-textures-icon-sports-hobbies-chess-pawn2-sc51.png' },
  { name: 'pawn', x: "1", y: "1", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/orange-fiesta-icons-sports-hobbies/046085-orange-fiesta-icon-sports-hobbies-chess-pawn2-sc51.png' },
  { name: 'pawn', x: "2", y: "1", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/green-grunge-clipart-icons-sports-hobbies/045147-green-grunge-clipart-icon-sports-hobbies-chess-pawn2-sc51.png' },
  { name: 'pawn', x: "3", y: "1", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-space-icons-sports-hobbies/044745-glossy-space-icon-sports-hobbies-chess-pawn2-sc51.png' },
  { name: 'pawn', x: "4", y: "1", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/pink-black-cherry-blossom-festival-icons-sports-hobbies/046487-pink-black-cherry-blossom-festival-icon-sports-hobbies-chess-pawn2-sc51.png' },
  { name: 'pawn', x: "5", y: "1", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glowing-green-neon-icons-sports-hobbies/112281-glowing-green-neon-icon-sports-hobbies-chess-pawn2-sc51.png' },
  { name: 'pawn', x: "6", y: "1", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/striped-retro-grunge-icons-sports-hobbies/048095-striped-retro-grunge-icon-sports-hobbies-chess-pawn2-sc51.png' },
  { name: 'pawn', x: "7", y: "1", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/black-ink-grunge-stamps-textures-icons-sports-hobbies/042467-black-ink-grunge-stamp-textures-icon-sports-hobbies-chess-pawn2-sc51.png' },

  { name: 'knight', x: "1", y: "0", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/orange-fiesta-icons-sports-hobbies/046083-orange-fiesta-icon-sports-hobbies-chess-horse2-sc51.png' },
  { name: 'knight', x: "6", y: "0", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/striped-retro-grunge-icons-sports-hobbies/048093-striped-retro-grunge-icon-sports-hobbies-chess-horse2-sc51.png' },

  { name: 'bishop', x: "2", y: "0", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/green-grunge-clipart-icons-sports-hobbies/045143-green-grunge-clipart-icon-sports-hobbies-chess-bishop2-sc51.png' },
  { name: 'bishop', x: "5", y: "0", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glowing-green-neon-icons-sports-hobbies/112277-glowing-green-neon-icon-sports-hobbies-chess-bishop2-sc51.png' },

  { name: 'rook', x: "0", y: "0", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/black-ink-grunge-stamps-textures-icons-sports-hobbies/042464-black-ink-grunge-stamp-textures-icon-sports-hobbies-chess-castle2-sc51.png' },
  { name: 'rook', x: "7", y: "0", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/black-ink-grunge-stamps-textures-icons-sports-hobbies/042464-black-ink-grunge-stamp-textures-icon-sports-hobbies-chess-castle2-sc51.png' },

  { name: 'queen', x: "3", y: "0", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/glossy-space-icons-sports-hobbies/044744-glossy-space-icon-sports-hobbies-chess-king2-sc51.png' },

  { name: 'king', x: "4", y: "0", image: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/pink-black-cherry-blossom-festival-icons-sports-hobbies/046488-pink-black-cherry-blossom-festival-icon-sports-hobbies-chess-queen1-sc51.png' },
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

  { name: 'knight', x: "1", y: "7", image: 'https://github.com/lemokh/Photos/blob/master/blueKnight.png?raw=true' },
  { name: 'knight', x: "6", y: "7", image: 'https://github.com/lemokh/Photos/blob/master/blueKnight.png?raw=true' },

  { name: 'bishop', x: "2", y: "7", image: 'https://github.com/lemokh/Photos/blob/master/blueBishop.png?raw=true' },
  { name: 'bishop', x: "5", y: "7", image: 'https://github.com/lemokh/Photos/blob/master/blueBishop.png?raw=true' },

  { name: 'rook', x: "0", y: "7", image: 'https://github.com/lemokh/Photos/blob/master/blueRook.png?raw=true' },
  { name: 'rook', x: "7", y: "7", image: 'https://github.com/lemokh/Photos/blob/master/blueRook.png?raw=true' },

  { name: 'queen', x: "3", y: "7", image: 'https://github.com/lemokh/Photos/blob/master/blueQueen.png?raw=true' },

  { name: 'king', x: "4", y: "7", image: 'https://github.com/lemokh/Photos/blob/master/blueKing.png?raw=true' }
];

let pieces = [blacks, whites].reduce((b, w) => b.concat(w), []);

// console.log(pieces);
insert(pieces);
