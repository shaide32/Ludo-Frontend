import { GAME_STATUS, PLAYER_TYPE, TOKEN_STATUS } from "../constants"

const startGame = (game, updateGame) => {
    updateGame({
        ...game,
        status: GAME_STATUS.waiting_for_dice,
        turnCount: 0,
        playerTurn: PLAYER_TYPE.red
    });
};

const getGameStatusLabel = (game) => {
    let label = "";
    if(game.status === GAME_STATUS.finished) {
        label = "Game has been finished";
    } else if(game.status === GAME_STATUS.not_started ) {
        label = "Game is not started";
    } else {
        if(game.playerTurn === PLAYER_TYPE.red) {
            label = "Waiting for player 1";
        } else if(game.playerTurn === PLAYER_TYPE.green) {
            label = "Waiting for player 2";
        } else if(game.playerTurn === PLAYER_TYPE.yellow) {
            label = "Waiting for player 3";
        } else if(game.playerTurn === PLAYER_TYPE.blue) {
            label = "Waiting for player 4";
        }
    }
    return label;
};

const changeTurns = (game, updateGame) => {
    let playerTurn; 
    if(game.playerTurn === PLAYER_TYPE.red) {
        playerTurn = PLAYER_TYPE.green;
    } else if(game.playerTurn === PLAYER_TYPE.green) {
        playerTurn = PLAYER_TYPE.yellow;
    } else if(game.playerTurn === PLAYER_TYPE.yellow) {
        playerTurn = PLAYER_TYPE.blue;
    } else if(game.playerTurn === PLAYER_TYPE.blue) {
        playerTurn = PLAYER_TYPE.red;
    }
    updateGame({
        ...game,
        playerTurn,
        status: GAME_STATUS.waiting_for_dice
    });
};

const rollDice = (game, updateGame, playerTokens, updatePlayerTokens) => {
    if(game.status ===  GAME_STATUS.waiting_for_dice) {
        const diceVal = 6 //1 + Math.floor(Math.random() * 6);
        updateGame({
            ...game,
            diceVal,
            status: GAME_STATUS.waiting_for_token
        });
        const newPlaerTokens = playerTokens.map(token => {
            if(token.player_id === game.playerTurn &&
                (token.position !== -1 || (token.position === -1 && diceVal === 6)) &&
                token.status !== TOKEN_STATUS.finished
            ) {
                return {
                    ...token,
                    focussed: true
                }
            } else {
                return token;
            }
        });
        updatePlayerTokens(newPlaerTokens);
    }
};

const moveToken = (diceVal, token, player) => {
    let cellIndex = token.position;
    let status = token.status;
    if(token.status === TOKEN_STATUS.not_started) {
        cellIndex = player.startCell;
        status = TOKEN_STATUS.active;
    } else {
        while(diceVal) {
            cellIndex++;
            while(player.skippedCells.includes(cellIndex)) {
                cellIndex++;
                if(cellIndex === 76) {
                    cellIndex = 0;
                }
            }
            diceVal--;
            
            if(cellIndex === 76) {
                cellIndex = 0;
            }
        }
    }
    
    return {
        ...token,
        position: cellIndex,
        status,
        focussed: false
    }
};

const updateTokenPostion = (token, game, players, playerTokens, updatePlayerTokens, updateGame) => {
    if(game.status === GAME_STATUS.waiting_for_token) {
        const player = players.find(player => player.id === token.player_id);
        const tokenIndex = playerTokens.findIndex(pToken => pToken.id === token.id);
        const newToken = moveToken(game.diceVal, token, player);
        const newPlayerTokens = [
            ...playerTokens.slice(0, tokenIndex),
            newToken,
            ...playerTokens.slice(tokenIndex+1)
        ];
        updatePlayerTokens(newPlayerTokens);
        changeTurns(game, updateGame);
    }
}

export {
    startGame,
    getGameStatusLabel,
    rollDice,
    updateTokenPostion
}