class Cell {
    constructor(id, cellType, safeFor = null, homeFor = null, station = false) {
        this.id = id;
        this.cellType = cellType;
        this.safeFor = safeFor;
        this.homeFor = homeFor;
        this.station = station;
    }
}

export default Cell;