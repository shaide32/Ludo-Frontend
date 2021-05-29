import getStartPostionStyles from '../utils/start';
import { PLAYER_TYPE } from '../constants';

const drawStartRect = (color) => {
    const styles = getStartPostionStyles(color);
    return (
        <div key={color} className="start" style={styles}>
            <div className="start-circle start-circle--top"></div>
            <div className="start-circle start-circle--top"></div>
            <div className="start-circle start-circle--bottom"></div>
            <div className="start-circle start-circle--bottom"></div>
        </div>
    );
}

const drawStartRects = () => {
    // drawing red
    return (
       <div>
           {
                drawStartRect(PLAYER_TYPE.red)
           }{
                drawStartRect(PLAYER_TYPE.green)
           }{
                drawStartRect(PLAYER_TYPE.yellow)
           } {
                drawStartRect(PLAYER_TYPE.blue)
           }
       </div>
    );
    
}

export {
    drawStartRects
};