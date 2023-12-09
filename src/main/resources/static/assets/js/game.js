// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const difficultyLevel = urlParams.get('difficultyLevel');
const playerName = urlParams.get('playerName');

// Function to determine depth based on difficulty level
function determineDepth(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 0; // Set depth to an appropriate value for the 'easy' difficulty
        case 'difficult':
            return 1; // Set depth to an appropriate value for the 'medium' difficulty
        case 'insane':
            return 2; // Set depth to 1 for the 'difficult' difficulty
        default:
            return 1; // Set a default depth value if the difficulty level is not recognized
    }
}

// Usage of the determineDepth function to set the depth
const depth = determineDepth(difficultyLevel);











let turn = 0;
let lastColor = null;






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


    resultText.textContent = winner+ ' won the game!'; // Computer (O) wins


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
         // Check for a winner after each move
                    let winnerExists = checkWinner(emptyArray4x4);
                    console.log(emptyArray4x4);
                    if (winnerExists) {

                        console.log("We have a winner!");

                            showResultMessage(playerName);
                            console.log(turn);
                             turn = -1; // Set turn to a value that won't allow further moves
                                 return; // Display the correct winner

                        // Perform actions when a winner is found (e.g., display a message, end the game, etc.)
                    }

        turn = 1






           computerMove();
    } else if(turn==1) {
    console.log("It's the computer's turn");

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



}




// Evaluation function for the board
function evaluateBoard(board) {
    // A simple evaluation function that counts the number of rows, columns, and diagonals containing 'O' and 'X'
    let score = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            // Check rows and columns
            if (board[i][j].includes('O')) score++;
            if (board[i][j].includes('X')) score--;

            // Check depth
            let depth = [];
            for (let k = 0; k < board[i].length; k++) {
                depth.push(board[k][j][i]);
            }
            if (depth.includes('O')) score++;
            if (depth.includes('X')) score--;

            // Check diagonals in the same level
            if (i === j) {
                let diagonalSameLevel = [];
                for (let k = 0; k < board[i].length; k++) {
                    diagonalSameLevel.push(board[i][k][k]);
                }
                if (diagonalSameLevel.includes('O')) score++;
                if (diagonalSameLevel.includes('X')) score--;
            }

            // Check other diagonal in the same level
            if (i + j === board.length - 1) {
                let otherDiagonalSameLevel = [];
                for (let k = 0; k < board[i].length; k++) {
                    otherDiagonalSameLevel.push(board[i][k][board.length - 1 - k]);
                }
                if (otherDiagonalSameLevel.includes('O')) score++;
                if (otherDiagonalSameLevel.includes('X')) score--;
            }
        }
    }

    return score;
}




function minimax(board, depth, alpha, beta, isMaximizing) {
    if (checkWinner(board) || depth === 0) {
        if (checkWinner(board)) {
            if (lastColor === 'red') {
                return -10 + depth; // 'X' (red) wins
            } else {
                return 10 - depth; // 'O' (blue) wins
            }
        }
        return evaluateBoard(board); // Use the evaluation function to get the score
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                for (let k = 0; k < board[i][j].length; k++) {
                    if (board[i][j][k] === '') {
                        board[i][j][k] = 'O';
                        let score = minimax(board, depth - 1, alpha, beta, false);
                        board[i][j][k] = ''; // Undo the move
                        bestScore = Math.max(bestScore, score);
                        alpha = Math.max(alpha, bestScore);
                        if (beta <= alpha) {
                            break; // Beta cutoff
                        }
                    }
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                for (let k = 0; k < board[i][j].length; k++) {
                    if (board[i][j][k] === '') {
                        board[i][j][k] = 'X';
                        let score = minimax(board, depth - 1, alpha, beta, true);
                        board[i][j][k] = ''; // Undo the move
                        bestScore = Math.min(bestScore, score);
                        beta = Math.min(beta, bestScore);
                        if (beta <= alpha) {
                            break; // Alpha cutoff
                        }
                    }
                }
            }
        }
        return bestScore;
    }
}


function computerMove() {
    let bestScore = -Infinity;
    let bestMove = { table_no: -1, row: -1, col: -1 };

    for (let i = 0; i < emptyArray4x4.length; i++) {
        for (let j = 0; j < emptyArray4x4[i].length; j++) {
            for (let k = 0; k < emptyArray4x4[i][j].length; k++) {
                if (emptyArray4x4[i][j][k] === '') {
                    emptyArray4x4[i][j][k] = 'O';
                    let score = minimax(emptyArray4x4, depth, -Infinity, Infinity, false); // Depth set for "Insane" level
                    emptyArray4x4[i][j][k] = ''; // Undo the move

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { table_no: i, row: j, col: k };
                    }
                }
            }
        }
    }



    // Construct the ID based on table_no, row, and col
    const cellId = `${bestMove.table_no}${bestMove.row}${bestMove.col}`;
    console.log(cellId);

    // Select the cell using the constructed ID
    const cell = document.getElementById(cellId);

    // Check if the cell exists and perform necessary actions
    if (cell) {
        // Cell exists, perform actions on the cell
        cell.style.backgroundColor = 'blue'; // Simulate computer move UI update
        cell.textContent = 'O';
        emptyArray4x4[bestMove.table_no][bestMove.row][bestMove.col] = 'O'; // Update game state
        cell.style.color = 'white';
        cell.style.fontSize = '20px';
        lastColor = 'blue';
          // Check for a winner after each move
                            let winnerExists = checkWinner(emptyArray4x4);
                            console.log(emptyArray4x4);
                            if (winnerExists) {

                                console.log("We have a winner!");

                                    showResultMessage('O');
                                    console.log(turn);
                                     turn = -1; // Set turn to a value that won't allow further moves
                                         return; // Display the correct winner

                                // Perform actions when a winner is found (e.g., display a message, end the game, etc.)
                            }
        turn = 0; // Set turn back to 0 for the human's move
    } else {
        // Cell doesn't exist, handle the error or perform appropriate actions
        console.log('Cell is null. Invalid move.');
    }
}


