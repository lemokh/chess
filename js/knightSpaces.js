export default function knightSpaces(knight) { 
    return [
        (+knight.id[0] + 1) + (+knight.id[1] + 2).toString(),
        (+knight.id[0] + 1) + (knight.id[1] - 2).toString(),
        (knight.id[0] - 1) + (+knight.id[1] + 2).toString(),
        (knight.id[0] - 1) + (knight.id[1] - 2).toString(),
        (+knight.id[0] + 2) + (+knight.id[1] + 1).toString(),
        (+knight.id[0] + 2) + (knight.id[1] - 1).toString(),
        (knight.id[0] - 2) + (+knight.id[1] + 1).toString(),
        (knight.id[0] - 2) + (knight.id[1] - 1).toString()
    ];
} // knightLit helper