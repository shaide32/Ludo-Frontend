import { PLAYER_TYPE } from '../constants';
import { getTokenPostionStyles } from '../utils/playerTokens';

const drawToken = (token) => {
    const styles = getTokenPostionStyles(token);
    let className = '';
    if(token.player_id === PLAYER_TYPE.red) {
        className = 'red-token';
    } else if(token.player_id === PLAYER_TYPE.green) {
        className = 'green-token';
    } else if(token.player_id === PLAYER_TYPE.yellow) {
        className = 'yellow-token';
    } else if(token.player_id === PLAYER_TYPE.blue) {
        className = 'blue-token';
    }
    return (
        <div className={`token ${className}`} style={styles}>
            
        </div>
    );
};

export {
    drawToken
};