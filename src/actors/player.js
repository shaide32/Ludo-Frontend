class Player {
    constructor(id, label, startCell, endCell, skippedCells) {
        this.id = id;
        this.label = label;
        this.tokenRemaining = 4;
        this.startCell = startCell;
        this.endCell = endCell;
        this.skippedCells = skippedCells;
    }
}

export default Player;