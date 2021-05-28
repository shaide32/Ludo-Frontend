const CELL_TYPE = {
    normal: "NORMAL",
    safe: "SAFE",
    home: "HOME"
};

const PLAYER_TYPE = {
    red: "RED",
    blue: "BLUE",
    green: "GREEN",
    yellow: "YELLOW"
};

const TOKEN_STATUS = {
    not_started: "Not Started",
    active: "active",
    finished: "finished"
};

const GAME_STATUS = {
    not_started: "Not Started",
    animatig: "animating",
    finished: "finished",
    waiting_for_dice: "Waiting for dice",
    waiting_for_token: "Waiting for token"
};

export {
    CELL_TYPE,
    PLAYER_TYPE,
    TOKEN_STATUS,
    GAME_STATUS
};