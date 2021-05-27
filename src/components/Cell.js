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
    
    return (
        <span className={`cell ${className}`} style={styles}>
            {cell.id}
        </span>
    );
};


export {
    drawCells
};