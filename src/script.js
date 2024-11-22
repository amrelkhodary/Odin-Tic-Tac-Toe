function Game() {
    const STATUS_PLAYER_ONE_WINS = 399;
    const STATUS_PLAYER_TWO_WINS = 401;
    const STATUS_TIE = 407;
    const STATUS_UNDECIDED = 500;
    const TURN_PLAYER_ONE = 793;
    const TURN_PLAYER_TWO = 891;
    const X = 999;
    const O = 1001;
    let turn = TURN_PLAYER_ONE;
    let status = STATUS_UNDECIDED;
    let board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];


    const updateBoard = function (position /* should be passed as an array*/) {
        board[position[0]][position[1]] = (turn == TURN_PLAYER_ONE) ? X : O;
        updateStatus();
        if(status == STATUS_UNDECIDED) {
            updateTurn();
        }
    }

    const updateStatus = function () {
        /* write the algorithm to determine the current status of the game*/
        if ((board[0][0] == X && board[0][1] == X && board[0][2] == X) ||
            (board[1][0] == X && board[1][1] == X && board[1][2] == X) ||
            (board[2][0] == X && board[2][1] == X && board[2][2] == X) ||
            (board[0][0] == X && board[1][0] == X && board[2][0] == X) ||
            (board[0][1] == X && board[1][1] == X && board[2][1] == X) ||
            (board[0][2] == X && board[1][2] == X && board[2][2] == X) ||
            (board[0][0] == X && board[1][1] == X && board[2][2] == X) ||
            (board[0][2] == X && board[1][1] == X && board[2][0] == X)) {
            status = STATUS_PLAYER_ONE_WINS;
        }

        else if ((board[0][0] == O && board[0][1] == O && board[0][2] == O) ||
            (board[1][0] == O && board[1][1] == O && board[1][2] == O) ||
            (board[2][0] == O && board[2][1] == O && board[2][2] == O) ||
            (board[0][0] == O && board[1][0] == O && board[2][0] == O) ||
            (board[0][1] == O && board[1][1] == O && board[2][1] == O) ||
            (board[0][2] == O && board[1][2] == O && board[2][2] == O) ||
            (board[0][0] == O && board[1][1] == O && board[2][2] == O) ||
            (board[0][2] == O && board[1][1] == O && board[2][0] == O)) {
            status = STATUS_PLAYER_TWO_WINS;
        }

        else if (board[0][0] == -1 || board[0][1] == -1 || board[0][2] == -1 ||
            board[1][0] == -1 || board[1][1] == -1 || board[1][2] == -1 ||
            board[2][0] == -1 || board[2][1] == -1 || board[2][2] == -1) {
            status = STATUS_UNDECIDED;
        }
        else {
            status = STATUS_TIE;
        }
    }

    const updateTurn = function() {
        turn = (turn == TURN_PLAYER_ONE) ? TURN_PLAYER_TWO : TURN_PLAYER_ONE;
    }

    return {status, updateBoard};
}