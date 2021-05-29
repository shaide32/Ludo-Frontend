import { GAME_STATUS } from "../constants";

class Game {
    constructor() {
        this.status = GAME_STATUS.not_started;
        this.turnCount = 0; // not used
        this.playerTurn = null;
        this.diceVal = null;
        this.winner = null;
    }
}

export default Game;