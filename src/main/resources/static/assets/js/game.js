const urlParams = new URLSearchParams(window.location.search);
const difficultyLevel = urlParams.get('difficultyLevel');
const playerName = urlParams.get('playerName');





function getCurrentPlayer() {
    return turn === 0 ? 'Computer' : 'You';
}

function updateCurrentPlayerText() {
    const currentPlayerText = document.getElementById('current-player-text');
    currentPlayerText.textContent = `Current Player: ${getCurrentPlayer()}`;
    if(getCurrentPlayer() === 'Computer'){
            currentPlayerText.textContent=`Current Player: Computer (Please wait...)`;
    }



}





function determineDepth(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 0;
        case 'difficult':
            return 1;
        case 'insane':
            return 3;
        default:
            return 1;
    }
}

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

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            // Check rows
            if (allEqual(arr[i][j], 'X') || allEqual(arr[i][j], 'O')) {
                return true;
            }

            let column = [arr[i][0][j], arr[i][1][j], arr[i][2][j], arr[i][3][j]];
            if (allEqual(column, 'X') || allEqual(column, 'O')) {
                return true;
            }

                       let depth = [];
                       for (let k = 0; k < arr.length; k++) {
                           depth.push(arr[k][j][i]);
                       }
                       if (allEqual(depth, 'X') || allEqual(depth, 'O')) {
                           return true;
                       }



                        if (i === j) {
                                       let diagonalSameLevel = [];
                                       for (let k = 0; k < arr.length; k++) {
                                           diagonalSameLevel.push(arr[i][k][k]);
                                       }
                                       if (allEqual(diagonalSameLevel, 'X') || allEqual(diagonalSameLevel, 'O')) {
                                           return true;
                                       }
                                   }

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

    return false;
}










function showResultMessage(winner) {
    const resultMessage = document.querySelector('.result-message');
    const resultText = document.getElementById('result-text');


    resultText.textContent = winner+ ' won the game!';


    resultMessage.classList.add('show');

     if (winner === playerName) {
            // Play the audio when the winner is 'X'
            const winSound = document.getElementById('winSound');
            winSound.play();
        }
          if (winner === 'O') {
                    // Play the audio when the winner is 'X'
                    const lostSound = document.getElementById('lostSound');
                    lostSound.play();
                }

}



function changeColor(cell, table_no, row, col) {
    console.log(`Clicked cell: Table:${table_no} ${row},${col}`);
     const clickSound = document.getElementById('clickSound');
                clickSound.play();

    if (cell.style.backgroundColor !== '' && cell.style.backgroundColor !== 'transparent') {
        console.log("Already Changed");
        return;
    }

    if (turn==0) {

    updateCurrentPlayerText();
        cell.style.backgroundColor = 'red';
        cell.textContent = 'X';
        emptyArray4x4[table_no][row][col] = 'X';
        cell.style.color = 'white';
        cell.style.fontSize = '20px';
        lastColor = 'red';
                    let winnerExists = checkWinner(emptyArray4x4);
                    console.log(emptyArray4x4);
                    if (winnerExists) {

                        console.log("We have a winner!");

                            showResultMessage(playerName);
                            console.log(turn);
                             turn = -1;
                                 return;

                    }

        turn = 1






            setTimeout(computerMove, 1000);


 } else if(turn==1) {

    console.log("It's the computer's turn");

    }else{


         let confirmNewGame = window.confirm("Gameover! Start a new game?");

                 if (confirmNewGame) {
                     window.location.reload();
                 } else {

                 }

    }



}




function evaluateBoard(board) {
    let score = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].includes('O')) score++;
            if (board[i][j].includes('X')) score--;

            let depth = [];
            for (let k = 0; k < board[i].length; k++) {
                depth.push(board[k][j][i]);
            }
            if (depth.includes('O')) score++;
            if (depth.includes('X')) score--;

            if (i === j) {
                let diagonalSameLevel = [];
                for (let k = 0; k < board[i].length; k++) {
                    diagonalSameLevel.push(board[i][k][k]);
                }
                if (diagonalSameLevel.includes('O')) score++;
                if (diagonalSameLevel.includes('X')) score--;
            }

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
                return -10 + depth;
            } else {
                return 10 - depth;
            }
        }
        return evaluateBoard(board);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                for (let k = 0; k < board[i][j].length; k++) {
                    if (board[i][j][k] === '') {
                        board[i][j][k] = 'O';
                        let score = minimax(board, depth - 1, alpha, beta, false);
                        board[i][j][k] = '';
                        bestScore = Math.max(bestScore, score);
                        alpha = Math.max(alpha, bestScore);
                        if (beta <= alpha) {
                            break;
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
                        board[i][j][k] = '';
                        bestScore = Math.min(bestScore, score);
                        beta = Math.min(beta, bestScore);
                        if (beta <= alpha) {
                            break;
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
                    let score = minimax(emptyArray4x4, depth, -Infinity, Infinity, false);
                    emptyArray4x4[i][j][k] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { table_no: i, row: j, col: k };
                    }
                }
            }
        }
    }



    const cellId = `${bestMove.table_no}${bestMove.row}${bestMove.col}`;
    console.log(cellId);

    const cell = document.getElementById(cellId);

    if (cell) {
    updateCurrentPlayerText();
        cell.style.backgroundColor = 'blue';
        cell.textContent = 'O';
        emptyArray4x4[bestMove.table_no][bestMove.row][bestMove.col] = 'O';
        cell.style.color = 'white';
        cell.style.fontSize = '20px';
        lastColor = 'blue';
                            let winnerExists = checkWinner(emptyArray4x4);
                            console.log(emptyArray4x4);
                            if (winnerExists) {

                                console.log("We have a winner!");

                                    showResultMessage('O');
                                    console.log(turn);
                                     turn = -1;
                                         return;

                            }
        turn = 0;
    } else {
        console.log('Cell is null. Invalid move.');
    }
}




