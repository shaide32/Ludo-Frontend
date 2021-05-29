import Cell from '../actors/cell';
import { CELL_TYPE, PLAYER_TYPE } from '../constants';

let cellId = 0;

const createCellsUtil = (color1, color2) => {
    let i = 0;
    const cells = [];
    cells.push(new Cell(cellId++, CELL_TYPE.normal));
    cells.push(new Cell(cellId++, CELL_TYPE.safe, color1, null, true));
    for(i = 0; i< 7; i++) {
        cells.push(new Cell(cellId++, CELL_TYPE.normal));
    }
    cells.push(new Cell(cellId++, null, null, null, true))
    
    for(i = 0; i< 3; i++) {
        cells.push(new Cell(cellId++, CELL_TYPE.normal));
    }

    for(i = 0; i< 5; i++) {
        cells.push(new Cell(cellId++, CELL_TYPE.safe, color2));
    }
    cells.push(new Cell(cellId++, CELL_TYPE.home, color2, color2));
    return cells;
};

const createCells = () => {
    cellId = 0;
    const cells = [];
    cells.push(...createCellsUtil( PLAYER_TYPE.red,  PLAYER_TYPE.green));
    cells.push(...createCellsUtil( PLAYER_TYPE.green,  PLAYER_TYPE.yellow));
    cells.push(...createCellsUtil( PLAYER_TYPE.yellow,  PLAYER_TYPE.blue));
    cells.push(...createCellsUtil( PLAYER_TYPE.blue,  PLAYER_TYPE.red));

    return cells;
}

const getCellPostionStyles = (cell) => {
    const styles = {
        position: 'absolute',
    }
    // drawing bottom cells
    if(cell.id < 6) {
        styles.left = '300px'
        styles.bottom = cell.id * 50 + 'px'
    }
    else if(cell.id >= 69 && cell.id <= 75 ) {
        styles.bottom = (cell.id - 69) * 50 + 'px'
        if(cell.id === 75) {
            styles.left = '300px' // home cell
        } else {
            styles.left = '350px'
        }
    }
    else if(cell.id >= 63 && cell.id <= 68 ) {
        styles.left = '400px'
        styles.bottom = 250 - (cell.id - 63) * 50 + 'px'
    }
    // drawing left cells
    else if(cell.id >= 6 && cell.id <= 11) {
        styles.left = 250 - (cell.id - 6) * 50 + 'px'
        styles.top = '400px'
    }
    else if(cell.id >= 12 && cell.id <= 18 ) {
        styles.left = (cell.id - 12) * 50 + 'px'
        if(cell.id === 18) {
            styles.top = '300px' // home cell
        } else {
            styles.top = '350px'
        }
    }
    else if(cell.id >= 19 && cell.id <= 24 ) {
        styles.left = (cell.id - 19) * 50 + 'px'
        styles.top = '300px'
    }
    // drawing top cells
    else if(cell.id >= 25 && cell.id <= 30) {
        styles.left = '300px'
        styles.bottom = 450 + (cell.id - 25) * 50 + 'px'
    }
    else if(cell.id >= 31 && cell.id <= 37 ) {
        if(cell.id === 37) { // home cell
            styles.left = '300px'
            styles.bottom = 450 + 224 - (cell.id - 31) * 50 + 'px' 
        } else {
            styles.left = '350px'
            styles.bottom = 450 + 250 - (cell.id - 31) * 50 + 'px'
        }
    }
    else if(cell.id >= 38 && cell.id <= 43 ) {
        styles.left = '400px'
        styles.bottom = 450 + 250 - (cell.id - 38) * 50 + 'px'
    }
    // drawing right cells
    else if(cell.id >= 44 && cell.id <= 49) {
        styles.left = 450 + (cell.id - 44) * 50 + 'px'
        styles.top = '300px'
    }
    else if(cell.id >= 50 && cell.id <= 56 ) {
        if(cell.id === 56) { // home cell
            styles.left = 400 + 224 - (cell.id - 51) * 50 + 'px'
            styles.top = '300px' 
        } else {
            styles.left = 400 + 250 - (cell.id - 51) * 50 + 'px'
            styles.top = '350px'
        }
    }
    else if(cell.id >= 57 && cell.id <= 62 ) {
        styles.left = 450 + 250 - (cell.id - 57) * 50 + 'px'
        styles.top = '400px'
    }

    return styles;
}

export {
    createCells,
    getCellPostionStyles
};
