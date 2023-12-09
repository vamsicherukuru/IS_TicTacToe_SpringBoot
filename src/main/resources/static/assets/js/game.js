let turn = 0;
let lastColor = null;
let winneris = '';
let emptyArray4x4 = [
    [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
    [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
    [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
    [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
];

function checkWinner(arr) {
    function allEqual(arr, val) {
        return arr.every(element => element === val);
    }

    // Check rows, columns, and depth for a winner
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            // Check rows
            if (allEqual(arr[i][j], 'X') || allEqual(arr[i][j], 'O')) {
                return true;
            }

            // Check columns
            let column = [arr[i][0][j], arr[i][1][j], arr[i][2][j], arr[i][3][j]];
            if (allEqual(column, 'X') || allEqual(column, 'O')) {
                return true;
            }

           // Check depth (new logic)
                       let depth = [];
                       for (let k = 0; k < arr.length; k++) {
                           depth.push(arr[k][j][i]);
                       }
                       if (allEqual(depth, 'X') || allEqual(depth, 'O')) {
                           return true;
                       }


            // Check diagonal in the same level

                        if (i === j) {
                                       let diagonalSameLevel = [];
                                       for (let k = 0; k < arr.length; k++) {
                                           diagonalSameLevel.push(arr[i][k][k]);
                                       }
                                       if (allEqual(diagonalSameLevel, 'X') || allEqual(diagonalSameLevel, 'O')) {
                                           return true;
                                       }
                                   }

                                   // Check other diagonal in the same level
                                   if (i + j === arr.length - 1) {
                                       let otherDiagonalSameLevel = [];
                                       for (let k = 0; k < arr.length; k++) {
                                           otherDiagonalSameLevel.push(arr[i][k][arr.length - 1 - k]);
                                       }
                                       if (allEqual(otherDiagonalSameLevel, 'X') || allEqual(otherDiagonalSameLevel, 'O')) {
                                           return true;
                                       }
                                   }




        }
    }

    // Check diagonals in a 3D space
    let diagonal1 = [arr[0][0][0], arr[1][1][1], arr[2][2][2], arr[3][3][3]];
    let diagonal2 = [arr[0][0][3], arr[1][1][2], arr[2][2][1], arr[3][3][0]];
    let diagonal3 = [arr[0][3][0], arr[1][2][1], arr[2][1][2], arr[3][0][3]];
    let diagonal4 = [arr[0][3][3], arr[1][2][2], arr[2][1][1], arr[3][0][0]];

    if (
        allEqual(diagonal1, 'X') || allEqual(diagonal1, 'O') ||
        allEqual(diagonal2, 'X') || allEqual(diagonal2, 'O') ||
        allEqual(diagonal3, 'X') || allEqual(diagonal3, 'O') ||
        allEqual(diagonal4, 'X') || allEqual(diagonal4, 'O')
    ) {
        return true;
    }

    return false; // No winner
}










function showResultMessage(winner) {
    const resultMessage = document.querySelector('.result-message');
    const resultText = document.getElementById('result-text');

    resultText.textContent = winner + ' won the game!';
    resultMessage.classList.add('show');
}




function changeColor(cell, table_no, row, col) {
    console.log(`Clicked cell: Table:${table_no} ${row},${col}`);

    if (cell.style.backgroundColor !== '' && cell.style.backgroundColor !== 'transparent') {
        console.log("Already Changed");
        return;
    }

    if (turn==0) {
        cell.style.backgroundColor = 'red';
        cell.textContent = 'X';
        emptyArray4x4[table_no][row][col] = 'X';
        cell.style.color = 'white';
        cell.style.fontSize = '20px';
        lastColor = 'red';
        turn = 1
    } else if(turn==1) {
        cell.style.backgroundColor = 'blue';
        cell.textContent = 'O';
        emptyArray4x4[table_no][row][col] = 'O'; // Fixed indexing here
        cell.style.color = 'white';
        cell.style.fontSize = '20px';
        lastColor = 'blue';
        turn = 0;
    }else{


         let confirmNewGame = window.confirm("winner! Start a new game?");

                 if (confirmNewGame) {
                     window.location.reload(); // Reload the page to start a new game
                 } else {
                     // Stay on the current game
                     // Perform actions if you want to continue the game without reloading
                     // For example: Allow the game to continue without refreshing the page
                 }

    }


    // Check for a winner after each move
    let winnerExists = checkWinner(emptyArray4x4);
    console.log(emptyArray4x4);
    if (winnerExists) {
    turn = -1;
        console.log("We have a winner!");

 showResultMessage(lastColor === 'red' ? 'X' : 'O'); // Display the correct winner

        // Perform actions when a winner is found (e.g., display a message, end the game, etc.)
    }
}
