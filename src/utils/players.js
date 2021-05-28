import Player from "../actors/player";
import { PLAYER_TYPE } from "../constants";

const createPlayers = () => {
    const players = [];
    players.push(new Player(PLAYER_TYPE.red, 'Player 1', 1, 75, 69,
    [0, 13, 14, 15, 16, 17, 18, 32, 33, 34, 35, 36, 37, 51, 52, 53, 54, 55, 56]));
    players.push(new Player(PLAYER_TYPE.green, 'Player 2', 20, 18, 12,
    [19, 32, 33, 34, 35, 36, 37, 51, 52, 53, 54, 55, 56, 70, 71, 72, 73, 74, 75]));
    players.push(new Player(PLAYER_TYPE.yellow, 'Player 3', 39, 37, 31,
    [38, 13, 14, 15, 16, 17, 18, 51, 52, 53, 54, 55, 56, 70, 71, 72, 73, 74, 75]));
    players.push(new Player(PLAYER_TYPE.blue, 'Player 4', 58, 56, 50,
    [57, 13, 14, 15, 16, 17, 18, 32, 33, 34, 35, 36, 37, 70, 71, 72, 73, 74, 75]));
    return players;
}

export {
    createPlayers
};