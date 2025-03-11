const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');
let isXTurn = true; // Player is 'X', AI is 'O'
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;

    if (cell.innerText !== '' || !gameActive || !isXTurn) {
        return;
    }

    placeMark(cell, 'X');
    if (checkWin('X')) {
        endGame(false, 'X');
    } else if (isDraw()) {
        endGame(true);
    } else {
        isXTurn = false;
        gameStatus.innerText = "AI's Turn (O)";
        setTimeout(aiMove, 500); // Give AI a small delay for a better UX
    }
}

function aiMove() {
    const availableCells = [...cells].filter(cell => cell.innerText === '');
    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        placeMark(availableCells[randomIndex], 'O');
        if (checkWin('O')) {
            endGame(false, 'O');
        } else if (isDraw()) {
            endGame(true);
        } else {
            isXTurn = true;
            gameStatus.innerText = "Player X's Turn";
        }
    }
}

function placeMark(cell, currentClass) {
    cell.innerText = currentClass;
}

function checkWin(currentClass) {
    return winningConditions.some(combination => {
        return combination.every(index => {
            return cells[index].innerText === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.innerText === 'X' || cell.innerText === 'O';
    });
}

function endGame(draw, winner = '') {
    if (draw) {
        gameStatus.innerText = 'Draw!';
    } else {
        gameStatus.innerText = `Player ${winner} Wins!`;
    }
    gameActive = false;
}

function restartGame() {
    isXTurn = true;
    gameActive = true;
    gameStatus.innerText = "Player X's Turn";
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
