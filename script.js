function Gameboard() {
    const board = ["","","","","","","","",""];
    const getBoard = () => board;
    
    const addToken = (token, index) => { 
        if (board[index] !== "") return;
        else board[index] = token;
    };

    const reset = () => {
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
        checkWinner(board);
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
        for (const pattern of winConditions) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            };
        }
    }
    
    return {
        playRound
    };
}

function DisplayController() {
    const game = GameController();

    const updateScreen = () => {

    }


    updateScreen();
};

DisplayController();