function pawnLit(pawn) {
    console.log();
    litDivs = [];
    mainLitDiv = pawn.x.toString() + pawn.y.toString(); // clicked pawn
    tempId.push( mainLitDiv );

    // highlights clicked pawn
    document.getElementById( mainLitDiv ).classList.add('mainLit');

    // highlights all possible moves for clicked piece --> WORKS!
    if (activeSide === blues) {
        takenBox = document.getElementsById('takenBox1');
        passiveSide.forEach(item => { // highlights anywhere pawn can attack
            if (item.y === pawn.y - 1) {
                if (item.x === pawn.x + 1) {
                    document.getElementById(
                        item.x.toString() + item.y.toString()
                    ).classList.add('lit');
                    litDivs.push( item.x.toString() + item.y.toString() );
                }
                if (item.x === pawn.x - 1) {
                    document.getElementById(
                        item.x.toString() + item.y.toString()
                    ).classList.add('lit');
                    litDivs.push( item.x.toString() + item.y.toString() );
                }
            }
        });

        // if empty space one ahead of pawn, highlights it --> WORKS!
        if (emptySpaces.includes(pawn.x.toString() + (pawn.y - 1).toString())) {    
            document.getElementById(
                pawn.x.toString() + (pawn.y - 1).toString()
            ).classList.add('lit');
            litDivs.push(pawn.x.toString() + (pawn.y - 1).toString());

            if (pawn.y === 6) { // if empty space two ahead of pawn, highlights it
                if (emptySpaces.includes(pawn.x.toString() + (pawn.y - 2).toString())) {
                    document.getElementById(
                        pawn.x.toString() + (pawn.y - 2).toString()
                    ).classList.add('lit');
                    litDivs.push(pawn.x.toString() + (pawn.y - 2).toString());
                }
            }
        }
    } 
    else { // since activeSide === oranges... does same --> WORKS!
        takenBox = document.getElementsById('takenBox2');
        passiveSide.forEach(item => { // highlights any spaces that pawn can attack
            if (item.y === pawn.y + 1) {
                if (item.x === pawn.x + 1) {
                    document.getElementById(
                        item.x.toString() + item.y.toString()
                    ).classList.add('lit');
                    litDivs.push(item.x.toString() + item.y.toString());
                }
                if (item.x === pawn.x - 1) {
                    document.getElementById(
                        item.x.toString() + item.y.toString()
                    ).classList.add('lit');
                    litDivs.push(item.x.toString() + item.y.toString());
                }
            }
        });
        // if empty space one ahead of pawn, highlight it
        if (emptySpaces.includes(pawn.x.toString() + (pawn.y + 1).toString())) {
            document.getElementById(
                pawn.x.toString() + (pawn.y + 1).toString()
            ).classList.add('lit');
            litDivs.push(pawn.x.toString() + (pawn.y + 1).toString());

            if (pawn.y === 1) { // if empty space two ahead of pawn, highlight it
                if (emptySpaces.includes(pawn.x.toString() + (pawn.y + 2).toString())) {
                    document.getElementById(
                        pawn.x.toString() + (pawn.y + 2).toString()
                    ).classList.add('lit');
                    litDivs.push(pawn.x.toString() + (pawn.y + 2).toString());
                }
            }
        }
    } // WORKS!
// MOVE() ======================================================================================== 
    litDivs.forEach(item => { // if a litDiv is clicked, move piece there
        document.getElementById(item).addEventListener(
            'click',
            function move(e) { // moves piece and begins next turn
            // console.log();

            // un-highlights all cells
            document.getElementById(tempId[0]).classList.remove('mainLit');
            tempId = [];
            litDivs.forEach(item => {
                document.getElementById(item).classList.remove('lit')
            });

            // toggles activeSide .noClick
            function toggleNoClick() {
                if (document.getElementById(activeSide[0].x.toString + activeSide[0].y.toString).classList.includes('noClick')) {
                    activeSide.forEach(item => {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.remove('noClick');
                        // removeEventListener('click', highlight);
                    });
                }
                else {
                    activeSide.forEach(item => {
                        document.getElementById(
                            item.x.toString() + item.y.toString()
                        ).classList.add('noClick');
                        // removeEventListener('click', highlight);
                    });
                }
            }

            // gets activeSide index for clicked mainLitDiv pawn 
            index1 = activeSide.indexOf(pawn);
            // console.log(activeSide[index]); // {x:_, y:_}
            // console.log(mainLitDiv); // 01
            index2 = passiveSide.indexOf(e.target.id.firstChild);
            // div of clicked lit cell
            mainLitDiv = e.target.id;  // console.log(e.target.id);
            
            // UPDATES x && y of original clicked piece to equal the second clicked x & y
            // updates piece x & y                
            activeSide[index1].x = +e.target.id[0];
            activeSide[index1].y = +e.target.id[1];
             
            // if piece eaten, remove that piece from pieces array & push to proper takenBox div
            // if new cell id already has an image attribute,
            if (document.getElementById(e.target.id).firstChild) {
                passiveSide.splice(index2, 1); // removes piece from passiveSide
                pieces = [...oranges, ...blues]; // updates pieces
                // adds that image to takenBox1/2 div
                // img.src = activeSide[index].image;
                // takenBox.appendChild(img);
            }

            // add image to new cell --> WORKS!
            // img.src = pieces[index].image;
            // img.id = pieces[index].x.toString() + pieces[index].y.toString();
            // document.getElementById(img.id).appendChild(img);

            // console.log(activeSide[index]);
            

            // board.removeEventListener() ??
        /*    if (activeSide === blues) { 
                // toggleClocks();
                // disables blues click-listener
                // for (let i = 0; i < activeSide.length; i++) {
                //     document.getElementById(
                //         activeSide[i].x.toString() + activeSide[i].y.toString()
                //     ).removeEventListener('click', highlight);
                // }
                toggleNoClick();
                activeSide = oranges;
                toggleNoClick();
                lit(oranges, blues);
            }
            else {
                // toggleClocks();

                // diables oranges click-listener
                // for (let i = 0; i < activeSide.length; i++) {
                //     document.getElementById(
                //         activeSide[i].x.toString() + activeSide[i].y.toString()
                //     ).removeEventListener('click', highlight);
                // }
                toggleNoClick();
                player = 'blue';
                lit(blues, oranges);
            } */
        });
    });
} 