// exports to checkingSpace.js
export default function kingAttacks(king) {
	
	switch (+checkSpaceId[0]) { // if checkSpaceId's column equals...
		case +king.id[0]: // king's column
			return (
				+checkSpaceId[1] === (+king.id[1] + 1)
				|| 
				+checkSpaceId[1] === (king.id[1] - 1)
			);
		case +king.id[0] + 1: // king's column + 1
			return (
				checkSpaceId[1] === king.id[1]
				||
				+checkSpaceId[1] === (+king.id[1] + 1)
				||
				+checkSpaceId[1] === (king.id[1] - 1)
			);
		case king.id[0] - 1: // king's column - 1
			return (
				checkSpaceId[1] === king.id[1]
				||
				+checkSpaceId[1] === (+king.id[1] + 1)
				||
				+checkSpaceId[1] === (king.id[1] - 1)
			);
		default: return false;
	}
} // returns true if king can attack checkSpaceId
