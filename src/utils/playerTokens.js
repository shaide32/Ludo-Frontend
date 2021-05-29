
import PlayerToken from "../actors/playerToken";
import { getCellPostionStyles } from "./cells";
import { PLAYER_TYPE, TOKEN_STATUS } from "../constants";

const createPlayerTokens = () => {
    const playerTokens = [];
    playerTokens.push(new PlayerToken(1, PLAYER_TYPE.red, -1));
    playerTokens.push(new PlayerToken(2, PLAYER_TYPE.red, -1, TOKEN_STATUS.not_started));
    playerTokens.push(new PlayerToken(3, PLAYER_TYPE.red, -1, TOKEN_STATUS.not_started));
    playerTokens.push(new PlayerToken(4, PLAYER_TYPE.red, -1, TOKEN_STATUS.not_started));
    playerTokens.push(new PlayerToken(5, PLAYER_TYPE.green, -1));
    playerTokens.push(new PlayerToken(6, PLAYER_TYPE.green, -1));
    playerTokens.push(new PlayerToken(7, PLAYER_TYPE.green, -1));
    playerTokens.push(new PlayerToken(8, PLAYER_TYPE.green, -1));
    playerTokens.push(new PlayerToken(9, PLAYER_TYPE.yellow, -1));
    playerTokens.push(new PlayerToken(10, PLAYER_TYPE.yellow, -1, TOKEN_STATUS.not_started));
    playerTokens.push(new PlayerToken(11, PLAYER_TYPE.yellow, -1));
    playerTokens.push(new PlayerToken(12, PLAYER_TYPE.yellow, -1));
    playerTokens.push(new PlayerToken(13, PLAYER_TYPE.blue, -1));
    playerTokens.push(new PlayerToken(14, PLAYER_TYPE.blue, -1, TOKEN_STATUS.not_started));
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
            if(token.id === 1) {
                styles.left = '65px';
                styles.bottom = '185px';
            } else if(token.id === 2){
                styles.left = '180px';
                styles.bottom = '185px';
            } else if(token.id === 3){
                styles.left = '65px';
                styles.bottom = '55px';
            } else if(token.id === 4){
                styles.left = '180px';
                styles.bottom = '55px';
            }  
        } else if(token.player_id === PLAYER_TYPE.green) {
            if(token.id === 5) {
                styles.left = '65px';
                styles.top = '200px';
            } else if(token.id === 6){
                styles.left = '180px';
                styles.top = '200px';
            } else if(token.id === 7){
                styles.left = '65px';
                styles.top = '55px';
            } else if(token.id === 8){
                styles.left = '180px';
                styles.top = '55px';
            }
        } else if(token.player_id === PLAYER_TYPE.yellow) {
            if(token.id === 9) {
                styles.right = '65px';
                styles.top = '200px';
            } else if(token.id === 10){
                styles.right = '180px';
                styles.top = '200px';
            } else if(token.id === 11){
                styles.right = '65px';
                styles.top = '55px';
            } else if(token.id === 12){
                styles.right = '180px';
                styles.top = '55px';
            }
        } else if(token.player_id === PLAYER_TYPE.blue) {
            if(token.id === 13) {
                styles.right = '65px';
                styles.bottom = '185px';
            } else if(token.id === 14){
                styles.right = '180px';
                styles.bottom = '185px';
            } else if(token.id === 15){
                styles.right = '65px';
                styles.bottom = '55px';
            } else if(token.id === 16){
                styles.right = '180px';
                styles.bottom = '55px';
            }
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