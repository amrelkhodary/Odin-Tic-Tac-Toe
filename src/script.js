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

    return { firstPlayer, secondPlayer, status, turn, updateBoard };
}

function StartPage(elements /* should be passed as an object*/, pageId, context) {
    const ACTION_UPDATE_GAME_OBJECT_PLAYER_NAMES = 987;
    const ACTION_MOVE = 1857;

    //TODO: clear HTML elements

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
        console.log("START_PAGE: sent 2 requests to controller.\n");
        context.ctrlRequestHandlerInstance(pageId, ACTION_UPDATE_GAME_OBJECT_PLAYER_NAMES, {firstPlayer, secondPlayer});
        context.ctrlRequestHandlerInstance(pageId, ACTION_MOVE, {fromPageContainer: elements.container, toPageId: context.gamePageId});
        
    })

    return {container: elements.container};
}

function GamePage(elements /* should be passed as an object*/, pageId, ctrlRequestHandlerInstance) {

    //TODO: clear HTML elements
    
    //TODO: setup event handlers
    return {container: elements.container}
}

function GameOverPage(elements /* should be passed as an object*/, pageId, ctrlRequestHandlerInstance) {

    //TODO: clear HTML elements

    //TODO: setup event handlers

}

function App() {
    const TYPE_START_PAGE = "a@3fIOgkas9";
    const TYPE_GAME_PAGE = "b#7aTYklvx1";
    const TYPE_GAME_OVER_PAGE = "q*1uESapzs8";
    const ACTION_UPDATE_GAME_OBJECT_PLAYER_NAMES = 987;
    const ACTION_MOVE = 1857;

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
            playAgainButton: document.querySelector(".play-again-button"),
            newGameButton: document.querySelector(".back-to-home-button")
        }, gameOverPageId, {ctrlRequestHandlerInstance: controller.requestHandler});

        pages.startPage = { pageId: startPageId, page: startPage };
        pages.gamePage = { pageId: gamePageId, page: gamePage };
        pages.gameOverPage = { pageId: gameOverPageId, page: gameOverPage };
        
        controller.switchPage(null, startPage.container)
    }

    controller.requestHandler = function(pageId, requestType, requestParams) {
        console.log("REQUEST_HANDLER:\n");
        console.log("REQUEST FROM: " + pageId + "\n");
        console.log("REQUEST TYPE: " + requestType + "\n");
        console.log("REQEST PARAMS: \n");
        for(const param in requestParams) {
            console.log(param + ": " + requestParams[param] + "\n");
        }

        if(verifyId(pageId) == TYPE_START_PAGE) {
            console.log("inside verify Id");
            if(requestType == ACTION_UPDATE_GAME_OBJECT_PLAYER_NAMES) {
                controller.updateGamePlayerNames(requestParams.firstPlayer, requestParams.secondPlayer);
            }
            if(requestType == ACTION_MOVE && verifyId(requestParams.toPageId) == TYPE_GAME_PAGE) {
                //TODO: Impement the page switching logic
                controller.switchPage(requestParams.fromPageContainer, pages.gamePage.container);
            }
        }
        else if(verifyId(pageId) == TYPE_GAME_PAGE) {

        }
        else if(verifyId(pageId) == TYPE_GAME_OVER_PAGE) {

        }
    }

    controller.updateGamePlayerNames = function(firstPlayer, secondPlayer) {
        console.log("updateGamePlayerNames:\n");
        console.log("first player: " + firstPlayer + ", second player: " + secondPlayer + "\n");
        game.firstPlayer = firstPlayer; 
        game.secondPlayer = secondPlayer;
    }

    controller.switchPage = function(fromPageContainer, toPageContainer) {
        console.log("switchPage:\n");
        console.log("from page container: " + fromPageContainer + ", to page container: " + toPageContainer + "\n");
        if(fromPageContainer == null) {
            //request comming from controller.start
            toPageContainer.classList.remove("hide");
            return;
        }

        //TODO: hide the from page, and show the toPage
        fromPageContainer.classList.add("hide");
        toPageContainer.classList.remove("hide");
    }



    const generateNewId = function (pageType) {
        const numericalPart = Math.floor(Math.random() * 1000);
        return pageType + numericalPart;
    }

    const verifyId = function(pageId) {
        for(const page in pages) {
            if(pages[page].pageId == pageId) {
                return pageId.substr(0,12);
            }
        }
    }

    return { start: controller.start };
}

let newApp = App();
newApp.start();