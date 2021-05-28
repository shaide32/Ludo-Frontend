import { TOKEN_STATUS } from "../constants";

class PlayerToken {
    constructor(id, player_id, position, status = TOKEN_STATUS.not_started) {
        this.id = id;
        this.player_id = player_id;
        this.position = position;
        this.status = status;
        this.focussed = false;
    }
}

export default PlayerToken;