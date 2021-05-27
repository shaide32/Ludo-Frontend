import { PLAYER_TYPE } from '../constants';

const getStartPostionStyles = (color) => {
    const styles = {};

    if(color === PLAYER_TYPE.red) {
        styles.left = '0px';
        styles.bottom = '0px';
        styles.backgroundColor = 'red';
    } else if(color === PLAYER_TYPE.green) {
        styles.left = '0px';
        styles.top = '0px';
        styles.backgroundColor = 'green';
    } else if(color === PLAYER_TYPE.yellow) {
        styles.right = '0px';
        styles.top = '0px';
        styles.backgroundColor = 'yellow';
    } else if(color === PLAYER_TYPE.blue) {
        styles.right = '0px';
        styles.bottom = '0px';
        styles.backgroundColor = 'blue';
    }
    return styles;

}

export default getStartPostionStyles;