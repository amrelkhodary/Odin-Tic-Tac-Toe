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
        /*
         * I'm doing it using a brute force method, because honsetly this problem is too simple
         * to think of a clever algorithm for it and my midterms start tomorrow :)
         */

        //check for player_1 win
        if(board.board[0][0] == 1 && board.board[0][1] == 1 && board.board[0][2] == 1 ||
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
        else if(board.board[0][0] == 2 && board.board[0][1] == 2 && board.board[0][2] == 2 ||
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
        else if(board.board[0][0] != -1 && board.board[0][1] != -1 && board.board[0][2] != -1 ||
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
    
    const updateTurn = function() {
        turn = (turn == 1) ? 2 : 1;
    }
    return {firstPlayer, secondPlayer, board, turn, currentStatus, updateStatus, updateTurn};
}

