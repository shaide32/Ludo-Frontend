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
        label = "Game has been finished - Reload the page";
    } else if(game.status === GAME_STATUS.not_started ) {
        label = "Game is not started - Click on the Start Game button";
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
        if(game.status === GAME_STATUS.waiting_for_dice) {
            label += "- Click on box on roll the dice";
        } else if(game.status === GAME_STATUS.waiting_for_token) {
            label += "- Select on of the tokens for the move";
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

const rollDice = (game, updateGame, playerTokens, updatePlayerTokens, players) => {
    if(game.status ===  GAME_STATUS.waiting_for_dice) {
        const diceVal = 5 // 1 + Math.floor(Math.random() * 6);
        
        updateGame({
            ...game,
            diceVal,
            status: GAME_STATUS.waiting_for_token
        });
        const newPlayerTokens = playerTokens.map(token => {
            const player = players.find(player => player.id === token.player_id);
            if(token.player_id === game.playerTurn &&
                (token.position !== -1 || (token.position === -1 && diceVal === 6)) &&
                token.status !== TOKEN_STATUS.finished   
            ) {
                if((token.position >= player.homeStartCell && token.position < player.endCell) &&
                token.position + diceVal > player.endCell) {
                    return token;
                } else {
                    return {
                        ...token,
                        focussed: true
                    }
                }   
            } else {
                return token;
            }
        });
        updatePlayerTokens(newPlayerTokens);
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
    if(cellIndex === player.endCell) {
        status = TOKEN_STATUS.finished;
    }
    return {
        ...token,
        position: cellIndex,
        status
    }
};

const updateTokenPostion = (token, game, players, playerTokens, updatePlayerTokens, updateGame) => {
    if(game.status === GAME_STATUS.waiting_for_token && token.focussed) {
        const player = players.find(player => player.id === token.player_id);
        const tokenIndex = playerTokens.findIndex(pToken => pToken.id === token.id);
        const newToken = moveToken(game.diceVal, token, player);
        let newPlayerTokens = [
            ...playerTokens.slice(0, tokenIndex),
            newToken,
            ...playerTokens.slice(tokenIndex+1)
        ];
        // after the move all tokens are un focussed
        newPlayerTokens = newPlayerTokens.map((playerToken) => {
            return {
                ...playerToken,
                focussed: false
            }
        });
        updatePlayerTokens(newPlayerTokens);
        changeTurns(game, updateGame);
    }
}

export {
    startGame,
    getGameStatusLabel,
    rollDice,
    updateTokenPostion,
    changeTurns
}