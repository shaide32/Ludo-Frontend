import { GAME_STATUS, PLAYER_TYPE, TOKEN_STATUS } from "../constants"

const startGame = (game, updateGame) => {
    updateGame({
        ...game,
        status: GAME_STATUS.waiting_for_dice,
        turnCount: 0,
        playerTurn: PLAYER_TYPE.red
    });
};


const getGameStatusLabel = (game, players) => {
    let label = "";
    if(game.status === GAME_STATUS.finished) {
        const winningPlayer = players.find(player => player.tokenRemaining === 0);
        label += `Game finished: ${winningPlayer.label} Wins.`;
    } else if(game.status === GAME_STATUS.not_started ) {
        label += "Game is not started - Click on the Start Game button";
    } else {
        const activePlayer = players.find(player => player.id === game.playerTurn);
        label += `Wating for ${activePlayer.label}`;
        if(game.status === GAME_STATUS.waiting_for_dice) {
            label += "- Click on the box to roll the dice";
        } else if(game.status === GAME_STATUS.waiting_for_token) {
            label += "- Select one of the tokens for the move";
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
        const diceVal = 1 + Math.floor(Math.random() * 6);
        
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
    // token has reached home
    if(cellIndex === player.endCell) {
        status = TOKEN_STATUS.finished;
    }
    return {
        ...token,
        position: cellIndex,
        status
    }
};

const updateTokenPostion = ({ token, game, players, updatePlayers, playerTokens, updatePlayerTokens, updateGame, cells }) => {
    if(game.status === GAME_STATUS.waiting_for_token && token.focussed) {
        const player = players.find(player => player.id === token.player_id);
        const tokenIndex = playerTokens.findIndex(pToken => pToken.id === token.id);
        const newToken = moveToken(game.diceVal, token, player);
        // finding out if another token was already at that cell
        let existingTokenIndex = playerTokens.findIndex(ptoken => ptoken.position === newToken.position);
        if(existingTokenIndex !== -1 && !cells[newToken.position].station) {
            playerTokens[existingTokenIndex].position = -1;
            playerTokens[existingTokenIndex].status = TOKEN_STATUS.not_started;
        }
        playerTokens[tokenIndex] = newToken;
        // after the move all tokens are un-focussed
        const newPlayerTokens = playerTokens.map((playerToken) => {
            return {
                ...playerToken,
                focussed: false
            }
        });
        updatePlayerTokens(newPlayerTokens);
        changeTurns(game, updateGame);

        // updating player if token has reached home
        if(newToken.status === TOKEN_STATUS.finished) {
            const playerIndex = players.findIndex(player => player.id === newToken.player_id);
            players[playerIndex].tokenRemaining--;
            if(players[playerIndex].tokenRemaining === 0) {
                finishGame(game, updateGame, players[playerIndex]);
            }
            updatePlayers([...players]);
        }
        
    }
}

const finishGame = (game, updateGame, player) => {
    updateGame({
        ...game,
        status: GAME_STATUS.finished,
        winner: player.id
    });
};

export {
    startGame,
    getGameStatusLabel,
    rollDice,
    updateTokenPostion,
    changeTurns
}