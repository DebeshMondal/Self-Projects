const board = document.getElementById('board');
const resultScreen = document.getElementById('result-screen');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const playerNamesDiv = document.getElementById('player-names');
const message = document.getElementById('message');

let currentPlayer = 'X';
let player1Name = '';
let player2Name = '';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

function startGame() {
    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;

    if (player1Name.trim() === '' || player2Name.trim() === '') {
        message.textContent = 'Please enter names for both players.';
        return;
    }

    gameActive = true;
    playerNamesDiv.style.display = 'none';
    startBtn.style.display = 'none';
    message.textContent = '';
    renderBoard();
}

function newGame() {
    gameActive = true;
    boardState.fill('');
    resultScreen.style.display = 'none';
    startBtn.style.display = 'block';
    renderBoard();
}

function handleCellClick(event) {
    if (!gameActive) return;

    const index = Array.from(board.children).indexOf(event.target);
    if (boardState[index] !== '') return;

    boardState[index] = currentPlayer;
    renderCell(index);
    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            result.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
            resultScreen.style.display = 'block';
            restartBtn.focus();
            autoRestart();
            return;
        }
    }

    if (!boardState.includes('')) {
        gameActive = false;
        result.textContent = 'It\'s a draw!';
        resultScreen.style.display = 'block';
        restartBtn.focus();
        autoRestart();
    }
}

function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function renderCell(index) {
    const cell = board.children[index];
    cell.textContent = boardState[index];
    cell.removeEventListener('click', handleCellClick);
}

// Automatically restart the game after 2 seconds when the result screen is shown
function autoRestart() {
    setTimeout(() => {
        newGame();
    }, 2000);
}
