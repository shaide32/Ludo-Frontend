import Player from "../actors/player";
import { PLAYER_TYPE } from "../constants";

const createPlayers = () => {
    const players = [];
    players.push(new Player(PLAYER_TYPE.red, 'Player 1'));
    players.push(new Player(PLAYER_TYPE.green, 'Player 2'));
    players.push(new Player(PLAYER_TYPE.yellow, 'Player 3'));
    players.push(new Player(PLAYER_TYPE.blue, 'Player 4'));
    return players;
}

export {
    createPlayers
};