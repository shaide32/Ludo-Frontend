class Player {
    constructor(id, label, startCell, endCell, homeStartCell, skippedCells) {
        this.id = id;
        this.label = label;
        this.tokenRemaining = 1; // TODO: revert it back to 4
        this.startCell = startCell;
        this.endCell = endCell;
        this.homeStartCell = homeStartCell;
        this.skippedCells = skippedCells;
    }
}

export default Player;