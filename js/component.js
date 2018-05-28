/*
ERRORS:

    1. pinned piece doesn't register as pinned after first time,
        although alert declares it as pinned each move that it is pinned.
    
        Must:
            if (pinnedPiece unable to eat kingAttacker) {
                
                no click-listener for pinnedPiece during that turn
                
                maybe darken that cell to show that it is unclikcable
            }
            else { // since pinnedPiece can eat kingAttacker
                
                click-listen to pinnedPiece as only able to eat kingAttacker
                
                this will be a special re-usable function
            }
        
        



BUILD:

    1. pawn evolution --> queen or knight
    
    2. add two clocks --> choose the game duration

    3. add resign button

*/