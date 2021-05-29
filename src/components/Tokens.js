import { GAME_STATUS, PLAYER_TYPE } from '../constants';
import { updateTokenPostion } from '../utils/game';
import { getTokenPostionStyles } from '../utils/playerTokens';

const drawToken = ({token, game, players, updatePlayers, playerTokens, updatePlayerTokens, updateGame, cells }) => {
    const styles = getTokenPostionStyles(token);
    let className = '';
    if(token.player_id === PLAYER_TYPE.red) {
        className += 'red-token';
    } else if(token.player_id === PLAYER_TYPE.green) {
        className += 'green-token';
    } else if(token.player_id === PLAYER_TYPE.yellow) {
        className += 'yellow-token';
    } else if(token.player_id === PLAYER_TYPE.blue) {
        className += 'blue-token';
    }
    if(game.status === GAME_STATUS.waiting_for_token) {
        if(game.playerTurn === PLAYER_TYPE.red && token.focussed) {
            className += ' red-token--active blink';
        } else if(game.playerTurn === PLAYER_TYPE.green && token.focussed) {
            className += ' green-token--active blink';
        } else if(game.playerTurn === PLAYER_TYPE.yellow && token.focussed) {
            className += ' yellow-token--active blink';
        } else if(game.playerTurn === PLAYER_TYPE.blue && token.focussed) {
            className += ' blue-token--active blink';
        }
    }
    return (
        <div
            key={token.id}
            className={`token ${className}`}
            style={styles}
            onClick={() => updateTokenPostion({ token, game, players, updatePlayers, playerTokens, updatePlayerTokens, updateGame, cells })}
        >
            
        </div>
    );
};

export {
    drawToken
};