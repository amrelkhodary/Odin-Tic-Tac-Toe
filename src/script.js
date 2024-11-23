"use strict"

function GameObject(firstPlayer, secondPlayer) {
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
        if (status == STATUS_UNDECIDED) {
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

    const updateTurn = function () {
        turn = (turn == TURN_PLAYER_ONE) ? TURN_PLAYER_TWO : TURN_PLAYER_ONE;
    }

    const getPlayers = function() {
        return {firstPlayer, secondPlayer};
    }

    const setPlayers = function(nFirstPlayer, nSecondPlayer) {
        firstPlayer = nFirstPlayer;
        secondPlayer = nSecondPlayer;
    }

    const getStatus = function() {
        return status;
    }

    const getTurn = function() {
        return turn;
    }

    const __debug_logall = function() {
        console.log("FIRST PLAYER: " + firstPlayer + "\n");
        console.log("SECOND PLAYER: " + secondPlayer + "\n");
        console.log("BOARD: " + board + "\n");
        console.log("STATUS: " + status + "\n");
        console.log("TURN: " + turn + "\n");
        console.log("\n");
    }


    return {getPlayers, setPlayers,getStatus, getTurn, updateBoard, __debug_logall};
}

function StartPage(elements /* should be passed as an object*/, pageId, context) {
    const ACTION_UPDATE_GAME_OBJECT_PLAYER_NAMES = 987;
    const ACTION_MOVE = 1857;

    //TODO: setup event handlers
    elements.container.addEventListener("submit", function (event) {
        event.preventDefault();
        // Create a FormData object from the form
        const formData = new FormData(event.target);
        // Convert FormData to an object or access individual fields
        const formValues = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        let firstPlayer = elements.firstPlayerTextInput.value;
        let secondPlayer = elements.secondPlayerTextInput.value;

        //TODO: implement input validation here

        //TODO: request the controller to to move to the game page
        console.log("START_PAGE: sent a request to change player names to requestHandler.\n");
        context.ctrlRequestHandlerInstance(pageId, ACTION_UPDATE_GAME_OBJECT_PLAYER_NAMES, {firstPlayer, secondPlayer});
        context.ctrlRequestHandlerInstance(pageId, ACTION_MOVE, {fromPageContainer: elements.container, toPageId: context.gamePageId});
        
    })

    return {container: elements.container};
}

function GamePage(elements /* should be passed as an object*/, pageId, context) {
    const ACTION_UPDATE_BOARD = 2378;
    let turn = 1;
    //clear the Tic Tac Toe board
    for(let i = 0; i<9; i++) {
        elements.boxes[i].innerHTML = "";
    }

    const calculatePositionArr = function(index) {
        return (index == 0) ? [0,0] : 
               (index == 1) ? [0,1] :
               (index == 2) ? [0,2] :
               (index == 3) ? [1,0] :
               (index == 4) ? [1,1] :
               (index == 5) ? [1,2] :
               (index == 6) ? [2,0] :
               (index == 7) ? [2,1] :
               (index == 8) ? [2,2] : [-1,-1];
    }

    //set up event handlers
    for(let i = 0; i<9; i++) {
        elements.boxes[i].addEventListener("click", function(event) {
            if(elements.boxes[i].innerHTML == "") {
                elements.boxes[i].innerHTML = (turn == 1) ? "X" : "O";
                context.ctrlRequestHandlerInstance(pageId, ACTION_UPDATE_BOARD, {position: calculatePositionArr(i)})
                turn = (turn == 1) ? 2 : 1;
            }
            
        }) ;
    }
    return {container: elements.container}
}

function GameOverPage(elements /* should be passed as an object*/, pageId, context) {
    const STATUS_PLAYER_ONE_WINS = 399;
    const STATUS_TIE = 407;
    elements.gameOverText.textContent = (context.status == STATUS_TIE) ? "It's a tie!" :
                                        (context.status == STATUS_PLAYER_ONE_WINS) ? context.firstPlayer + " wins!" :
                                        context.secondPlayer + " wins!"; 
    
    //TODO: setup event handlers
    return {container: elements.container};
}

function App() {
    const TYPE_START_PAGE = "a@3fIOgkas9";
    const TYPE_GAME_PAGE = "b#7aTYklvx1";
    const TYPE_GAME_OVER_PAGE = "q*1uESapzs8";
    const ACTION_UPDATE_GAME_OBJECT_PLAYER_NAMES = 987;
    const ACTION_MOVE = 1857;
    const ACTION_UPDATE_BOARD = 2378;
    const STATUS_PLAYER_ONE_WINS = 399;
    const STATUS_PLAYER_TWO_WINS = 401;
    const STATUS_TIE = 407;
    const STATUS_UNDECIDED = 500;

    let controller = {};
    let pages = {};
    let game;

    //implementing the controller
    controller.start = function () {
        //create a new GameObject
        game = GameObject();
        pages = {}; //set it to an empty object to make sure it's clear

        //create the pages
        let startPageId = generateNewId(TYPE_START_PAGE);
        let gamePageId = generateNewId(TYPE_GAME_PAGE);
        let gameOverPageId = generateNewId(TYPE_GAME_OVER_PAGE);

        const startPage = StartPage({
            container: document.querySelector(".start-game-form-box"),
            firstPlayerTextInput: document.querySelector("#player-1-name-textbox"),
            secondPlayerTextInput: document.querySelector("#player-2-name-textbox"),
            submitButton: document.querySelector(".submit-button")
        }, startPageId, {ctrlRequestHandlerInstance: controller.requestHandler, gamePageId});

        const gamePage = GamePage({
            container: document.querySelector(".tic-tac-toe-box"),
            boxes: document.getElementsByClassName("box")
        }, gamePageId, {ctrlRequestHandlerInstance: controller.requestHandler});

        const gameOverPage = GameOverPage({
            container: document.querySelector(".game-over-box"),
            gameOverText: document.querySelector(".game-over-box h1"),
            playAgainButton: document.querySelector(".play-again-button"),
            newGameButton: document.querySelector(".back-to-home-button")
        }, gameOverPageId, {ctrlRequestHandlerInstance: controller.requestHandler});

        pages.startPage = { pageId: startPageId, page: startPage };
        pages.gamePage = { pageId: gamePageId, page: gamePage };
        pages.gameOverPage = { pageId: gameOverPageId, page: gameOverPage };
        
        controller.switchPage(null, startPage.container)
    }

    controller.requestHandler = function(pageId, requestType, requestParams) {
        if(verifyId(pageId) == TYPE_START_PAGE) {
            if(requestType == ACTION_UPDATE_GAME_OBJECT_PLAYER_NAMES) {
                console.log("REQUEST_HANDLER: recieved a request from start page to change player names\n");
                controller.updateGamePlayerNames(requestParams.firstPlayer, requestParams.secondPlayer);
            }
            if(requestType == ACTION_MOVE && verifyId(requestParams.toPageId) == TYPE_GAME_PAGE) {
                //TODO: Impement the page switching logic
                controller.switchPage(requestParams.fromPageContainer, pages.gamePage.page.container);
            }
        }
        else if(verifyId(pageId) == TYPE_GAME_PAGE) {
            if(requestType == ACTION_UPDATE_BOARD) {
                controller.updateGameBoard(requestParams.position);
            }
        }
        else if(verifyId(pageId) == TYPE_GAME_OVER_PAGE) {

        }
    }

    controller.updateGamePlayerNames = function(firstPlayer, secondPlayer) {
        game.setPlayers(firstPlayer, secondPlayer);
    }

    controller.switchPage = function(fromPageContainer, toPageContainer) {
        if(fromPageContainer == null) {
            //request comming from controller.start
            toPageContainer.classList.remove("hide");
            return;
        }
        //TODO: hide the from page, and show the toPage
        fromPageContainer.classList.add("hide");
        toPageContainer.classList.remove("hide");
    }

    controller.switchAndReplacePage = function(pageType, context) {
        if(pageType == TYPE_GAME_OVER_PAGE) {
            delete pages.gaveOverPage;

            const gameOverPageId = generateNewId(TYPE_GAME_OVER_PAGE);

            //create the new page
            const gameOverPage = GameOverPage({
                container: document.querySelector(".game-over-box"),
                gameOverText: document.querySelector(".game-over-box h1"),
                playAgainButton: document.querySelector(".play-again-button"),
                newGameButton: document.querySelector(".back-to-home-button")
            }, gameOverPageId, context);

            pages.gameOverPage = {pageId: gameOverPageId, page: gameOverPage};
            controller.switchPage(pages.gamePage.page.container, gameOverPage.container);
        }
    }

    controller.updateGameBoard = function(position) {
        game.updateBoard(position);
        if(game.getStatus() != STATUS_UNDECIDED) {
            controller.switchAndReplacePage(TYPE_GAME_OVER_PAGE, {ctrlRequestHandlerInstance: controller.requestHandler, 
                status: game.getStatus(), 
                firstPlayer: game.getPlayers().firstPlayer, secondPlayer: game.getPlayers().secondPlayer})
        }
    }


    const generateNewId = function (pageType) {
        const numericalPart = Math.floor(Math.random() * 1000);
        return pageType + numericalPart;
    }

    const verifyId = function(pageId) {
        for(const page in pages) {
            if(pages[page].pageId == pageId) {
                return pageId.substr(0,11);
            }
        }
    }

    return { start: controller.start };
}

let newApp = App();
newApp.start();