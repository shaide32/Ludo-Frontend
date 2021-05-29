import { PLAYER_TYPE } from '../constants';
import { getCellPostionStyles } from '../utils/cells';

const drawCells = (cell) => {
    let className = '';
    const styles = getCellPostionStyles(cell);
    if(cell.safeFor === PLAYER_TYPE.red) {
        className = 'red-safe'
    } else if(cell.safeFor === PLAYER_TYPE.green) {
        className = 'green-safe'
    } else if(cell.safeFor === PLAYER_TYPE.yellow) {
        className = 'yellow-safe'
    } else if(cell.safeFor === PLAYER_TYPE.blue) {
        className = 'blue-safe'
    }
    if(cell.homeFor) {
        if(cell.safeFor === PLAYER_TYPE.red) {
            className += ' arrow-up'
        }
        else if(cell.safeFor === PLAYER_TYPE.green) {
            className += ' arrow-right'
        } else if(cell.safeFor === PLAYER_TYPE.yellow) {
            className += ' arrow-down'
        } else if(cell.safeFor === PLAYER_TYPE.blue) {
            className += ' arrow-left'
        }
    }
    
    return (
        <span key={cell.id} className={`cell ${className}`} style={styles}>
            {cell.station? <span className="cell--station">★</span>: null}
        </span>
    );
};


export {
    drawCells
};