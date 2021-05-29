import getStartPostionStyles from '../utils/start';
import { GAME_STATUS, PLAYER_TYPE } from '../constants';

const drawStartRect = (game, color) => {
    const styles = getStartPostionStyles(color);
    let className = "";
    if(color === PLAYER_TYPE.red) {
        className += "red-safe";
    } else if(color === PLAYER_TYPE.green) {
        className += "green-safe";
    } else if(color === PLAYER_TYPE.yellow) {
        className += "yellow-safe";
    } else if(color === PLAYER_TYPE.blue) {
        className += "blue-safe";
    }
    if(game.status === GAME_STATUS.waiting_for_dice && game.playerTurn === color) {
        className += " blink ";
    }
    return (
        <div key={color} className={`start ${className}`} style={styles}>
            <div className="start-circle start-circle--top"></div>
            <div className="start-circle start-circle--top"></div>
            <div className="start-circle start-circle--bottom"></div>
            <div className="start-circle start-circle--bottom"></div>
        </div>
    );
}

const drawStartRects = (game) => {
    // drawing red
    return (
       <div>
           {
                drawStartRect(game, PLAYER_TYPE.red)
           }{
                drawStartRect(game, PLAYER_TYPE.green)
           }{
                drawStartRect(game, PLAYER_TYPE.yellow)
           } {
                drawStartRect(game, PLAYER_TYPE.blue)
           }
       </div>
    );
    
}

export {
    drawStartRects
};