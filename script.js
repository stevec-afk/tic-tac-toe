function Gameboard() {
    let board = ["","","","","","","","",""];
    const getBoard = () => board;
    
    const addToken = (token, index) => { 
        if (board[index] !== "") return;
        else board[index] = token;
    };

    const reset = () => {
        console.log("Clearing board...");
        board = ["","","","","","","","",""];
    };

    return {
        getBoard,
        addToken,
        reset
    };
}

function GameController() {
    const board = Gameboard();
    let activePlayer = "X"; 

    const playRound = (index) => {
        board.addToken(activePlayer, index);
        activePlayer = activePlayer === "X" ? "O" : "X"; // still flips turn if move was invalid...
        checkWinner(board.getBoard());
    }

    const checkWinner = (board) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let winner;

        for (const pattern of winConditions) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = board[a];
                console.log(`${winner} wins!`);
            };
        }
        if (winner !== null) return winner;
    }
    
    return {
        playRound,
        getBoard: board.getBoard, 
        reset: board.reset
    };
}

function DisplayController() {
    const game = GameController();
    const boardDiv = document.querySelector('.board');
    const resetButton = document.querySelector('.reset');

    // Renders the game board on the page
    const updateScreen = () => {
        boardDiv.textContent = ""; // Clears the boardDiv & all nested elements
        const board = game.getBoard(); // Gets newest board state from controller
        
        board.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.index = index;
            cellDiv.textContent = cell;
            boardDiv.appendChild(cellDiv);
        })
    }

    // Click handlers for the board and reset button respectively
    function clickHandlerBoard(e) {
        const clickedCell = e.target;
        if (!clickedCell.classList.contains('cell')) return;
        game.playRound(clickedCell.dataset.index);
        updateScreen();
    }

    function resetGame() {
        game.reset();
        updateScreen();
    }

    // Initialize
    resetButton.addEventListener("click", resetGame);
    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen();
};

DisplayController();