const STATUS_UNDECIDED = 100;
const STATUS_TIE = 200;
const STATUS_PLAYER_ONE_WINS = 300;
const STATUS_PLAYER_TWO_WINS = 400;

//create factory functions for game, player, board objects
function Player(name) {
    return { name };
}

function Board() {
    let board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];

    const updateBoard = function (position /* should be passed as an array */, player  /* should be passed as an integer */) {
        board[position[0]][position[1]] = (player == 0) ? 1 : 2;
    }

    return { board, updateBoard };
}

function Game(firstPlayer, secondPlayer, board) {
    let currentStatus = STATUS_UNDECIDED;
    let turn = 1;

    const updateStatus = function () {
        /*
         * I'm doing it using a brute force method, because honsetly this problem is too simple
         * to think of a clever algorithm for it and my midterms start tomorrow :)
         */

        //check for player_1 win
        if (board.board[0][0] == 1 && board.board[0][1] == 1 && board.board[0][2] == 1 ||
            board.board[1][0] == 1 && board.board[1][1] == 1 && board.board[1][2] == 1 ||
            board.board[2][0] == 1 && board.board[2][1] == 1 && board.board[2][2] == 1 ||
            board.board[0][0] == 1 && board.board[1][0] == 1 && board.board[2][0] == 1 ||
            board.board[0][1] == 1 && board.board[1][1] == 1 && board.board[2][1] == 1 ||
            board.board[0][2] == 1 && board.board[1][2] == 1 && board.board[2][2] == 1 ||
            board.board[0][0] == 1 && board.board[1][1] == 1 && board.board[2][2] == 1 ||
            board.board[0][2] == 1 && board.board[1][1] == 1 && board.board[2][0] == 1
        ) {
            currentStatus = STATUS_PLAYER_ONE_WINS;
            return;
        }
        //check for player_2 win
        else if (board.board[0][0] == 2 && board.board[0][1] == 2 && board.board[0][2] == 2 ||
            board.board[1][0] == 2 && board.board[1][1] == 2 && board.board[1][2] == 2 ||
            board.board[2][0] == 2 && board.board[2][1] == 2 && board.board[2][2] == 2 ||
            board.board[0][0] == 2 && board.board[1][0] == 2 && board.board[2][0] == 2 ||
            board.board[0][1] == 2 && board.board[1][1] == 2 && board.board[2][1] == 2 ||
            board.board[0][2] == 2 && board.board[1][2] == 2 && board.board[2][2] == 2 ||
            board.board[0][0] == 2 && board.board[1][1] == 2 && board.board[2][2] == 2 ||
            board.board[0][2] == 2 && board.board[1][1] == 2 && board.board[2][0] == 2
        ) {
            currentStatus = STATUS_PLAYER_TWO_WINS;
            return;
        }

        //check for tie
        else if (board.board[0][0] != -1 && board.board[0][1] != -1 && board.board[0][2] != -1 ||
            board.board[1][0] != -1 && board.board[1][1] != -1 && board.board[1][2] != -1 ||
            board.board[2][0] != -1 && board.board[2][1] != -1 && board.board[2][2] != -1 ||
            board.board[0][0] != -1 && board.board[1][0] != -1 && board.board[2][0] != -1 ||
            board.board[0][1] != -1 && board.board[1][1] != -1 && board.board[2][1] != -1 ||
            board.board[0][2] != -1 && board.board[1][2] != -1 && board.board[2][2] != -1 ||
            board.board[0][0] != -1 && board.board[1][1] != -1 && board.board[2][2] != -1 ||
            board.board[0][2] != -1 && board.board[1][1] != -1 && board.board[2][0] != -1
        ) {
            currentStatus = STATUS_TIE;
            return;
        }
    }

    const updateTurn = function () {
        turn = (turn == 1) ? 2 : 1;
    }
    return { firstPlayer, secondPlayer, board, turn, currentStatus, updateStatus, updateTurn };
}

//getting a reference to all the elements we'll use
const startGameBox = document.querySelector(".start-game-form-box");
const startGameBoxForm = document.querySelector(".start-game-box form");

const ticTacToeBox = document.querySelector(".tic-tac-toe-box");
const box = document.getElementsByClassName(".box");
const box11 = document.querySelector("first-row-one");
const box12 = document.querySelector("first-row-two");
const box13 = document.querySelector("first-row-three");
const box21 = document.querySelector("second-row-one");
const box22 = document.querySelector("second-row-two");
const box23 = document.querySelector("second-row-three");
const box31 = document.querySelector("third-row-one");
const box32 = document.querySelector("third-row-two");
const box33 = document.querySelector("third-row-three");
const gameOverBox = document.querySelector(".game-over-box");



function clear(element) {
    if (!element.classList.contains("hide")) {
        element.classList.add("hide");
    }

    if (element.classList.contains("tic-tac-toe-box")) {
        for(let i = 0; i<9; i++) {
            //box here is an HTMLCollection
            box[i].innerHTML = "";
        }
    }
}

function show(element) {
    if (element.classList.contains("hide")) {
        element.classList.remove("hide");
    }
}

function position(index) {
    return (index == 0) ? [0,0] :
           (index == 1) ? [0,1] :
           (index == 2) ? [0,2] :
           (index == 3) ? [1,0] :
           (index == 4) ? [1,1] :
           (index == 5) ? [1,2] :
           (index == 6) ? [2,0] :
           (index == 7) ? [2,1] :
           (index == 8) ? [2,2] : -1;
}