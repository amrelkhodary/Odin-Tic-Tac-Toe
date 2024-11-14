const STATUS_UNDECIDED = 100;
const STATUS_TIE = 200;
const STATUS_PLAYER_ONE_WINS = 300;
const STATUS_PLAYER_TWO_WINS = 400;

//create factory functions for game, player, board objects
function Player(name) {
    return {name};
}

function Board() {
    let board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    
    const updateBoard = function (position /* should be passed as an array */, player  /* should be passed as an integer */) {
        board[position[0]][position[1]] = (player == 0) ? 1 : 2;
    }

    return {board, updateBoard};
}

function Game(firstPlayer, secondPlayer, board, turn, currentStatus) {
    currentStatus = STATUS_UNDECIDED;
    turn = 1;

    const updateStatus = function() {
        /**
         * implement logic to inspect the board to see if a player has won
         */

        
    }
    
    const updateTurn = function() {
        turn = (turn == 1) ? 2 : 1;
    }
    return {firstPlayer, secondPlayer, board, turn, currentStatus, updateStatus, updateTurn};
}

