/*
ERRORS:

    1.  pinnedPiece no longer moves between its path to king and its path to its pinner 
    
    2.  in check, king does not turn grey and move if able...

    3.  if (pinnedPiece no longer pinned) { 
            pinnedPiece.setAttribute('data-pinned', 'true');
        }


METHOD:  walk through lit() step by step with the scenario in mind --> find mis-alignments


BUILD:

    1. pawn evolution --> queen or knight
    
    2. add two clocks --> choose the game duration

    3. add resign button

*/