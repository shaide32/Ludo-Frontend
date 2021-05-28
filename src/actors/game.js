import { GAME_STATUS } from "../constants";

class Game {
    constructor() {
        this.status = GAME_STATUS.not_started;
        this.turnCount = 0;
        this.playerTurn = null;
        this.diceVal = null;
    }
}

export default Game;