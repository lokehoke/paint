const Coor = require('./../../structDate/coor.js');

module.exports =  class DefConfig {
    constructor() {
        this.startAsync = true;
        this.ignoreNoDrugon = false;
        this.showAfterMount = {
            isset: false,
            type: 'flex',
            sizeItem: new Coor()
        };
        this.onlyX = false;
        this.onlyY = false;
        this.piece = {
            exist: false,
            min: new Coor(),
            max: new Coor(),
            step: new Coor(),
            exitFromContur: false,
            cur: new Coor()
        };
        this.transferDate = () => {};
    }
};
