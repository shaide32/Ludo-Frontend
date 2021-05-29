
import PlayerToken from "../actors/playerToken";
import { getCellPostionStyles } from "./cells";
import { PLAYER_TYPE, TOKEN_STATUS } from "../constants";

const createPlayerTokens = () => {
    const playerTokens = [];
    playerTokens.push(new PlayerToken(1, PLAYER_TYPE.red, -1));
    playerTokens.push(new PlayerToken(2, PLAYER_TYPE.red, 1, TOKEN_STATUS.active));
    playerTokens.push(new PlayerToken(3, PLAYER_TYPE.red, -1));
    playerTokens.push(new PlayerToken(4, PLAYER_TYPE.red, -1));
    playerTokens.push(new PlayerToken(5, PLAYER_TYPE.green, -1));
    playerTokens.push(new PlayerToken(6, PLAYER_TYPE.green, -1));
    playerTokens.push(new PlayerToken(7, PLAYER_TYPE.green, 2, TOKEN_STATUS.active));
    playerTokens.push(new PlayerToken(8, PLAYER_TYPE.green, -1));
    playerTokens.push(new PlayerToken(9, PLAYER_TYPE.yellow, -1));
    playerTokens.push(new PlayerToken(10, PLAYER_TYPE.yellow, 42, TOKEN_STATUS.active));
    playerTokens.push(new PlayerToken(11, PLAYER_TYPE.yellow, -1));
    playerTokens.push(new PlayerToken(12, PLAYER_TYPE.yellow, -1));
    playerTokens.push(new PlayerToken(13, PLAYER_TYPE.blue, -1));
    playerTokens.push(new PlayerToken(14, PLAYER_TYPE.blue, 6, TOKEN_STATUS.active));
    playerTokens.push(new PlayerToken(15, PLAYER_TYPE.blue, -1));
    playerTokens.push(new PlayerToken(16, PLAYER_TYPE.blue, -1));
    return playerTokens;
}

const getTokenPostionStyles = (token) => {
    let styles = {};
    if(token.status === TOKEN_STATUS.not_started) {
        // TODO: separate the tokens
        if(token.player_id === PLAYER_TYPE.red) {
            styles.left = '150px';
            styles.bottom = '150px';
        } else if(token.player_id === PLAYER_TYPE.green) {
            styles.left = '150px';
            styles.top = '150px';
        } else if(token.player_id === PLAYER_TYPE.yellow) {
            styles.right = '150px';
            styles.top = '150px';
        } else if(token.player_id === PLAYER_TYPE.blue) {
            styles.right = '150px';
            styles.bottom = '150px';
        }
    } else if(token.status === TOKEN_STATUS.finished) {
        if(token.player_id === PLAYER_TYPE.red) {
            styles.left = '350px';
            styles.bottom = '300px'
        } else if(token.player_id === PLAYER_TYPE.green) {
            styles.left = '300px';
            styles.top = '350px';
        } else if(token.player_id === PLAYER_TYPE.yellow) {
            styles.left = '350px';
            styles.bottom = '400px';
        } else if(token.player_id === PLAYER_TYPE.blue) {
            styles.left = '400px';
            styles.top = '350px';
        }
    } else if(token.status === TOKEN_STATUS.active && token.position !== -1) {
        styles = getCellPostionStyles({id: token.position});
    }
    return styles;
};

export {
    createPlayerTokens,
    getTokenPostionStyles
};