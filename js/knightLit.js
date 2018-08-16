import onBoardNonActiveIds from './onBoardNonActiveIds.js';
import knightSpaces from './knightSpaces.js';

// exports to possibleMoves
export default function knightLit() {
	litIds = knightSpaces(pieceToMove).filter(onBoardNonActiveIds);
} // fills litIds with ids where knight can move