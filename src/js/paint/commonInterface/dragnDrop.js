'use strict';

let defConfig = {
    ignoreNoDrugon: false
};

let id = 0;

module.exports = class DragnDrop {
    constructor(item, config = {}) {
        this._item = item;
        this._shiftX = 0;
        this._shiftY = 0;
        this._config = Object.assign({}, defConfig, config);

        this._shiftXAbsPar = 0;
        this._shiftYAbsPar = 0;

        this._moveAt = this._moveAt.bind(this);
        this._endMoving = this._endMoving.bind(this);

        this._id = id++;
    }

    startDragonDroping() {
        let item = this._item;
        item.addEventListener('dragstart', e => false);

        item.onmousedown = e => {
            if (!this._config.ignoreNoDrugon && this._issetNoDrop(e.path)) {
                return true;
            } else {
                this._findAbsPar(e.path);
                let coords = this._getCoords(item);

                this._shiftX = e.pageX - coords.left;
                this._shiftY = e.pageY - coords.top;

                this._moveAt(e);
                this._emptyPositions();
                this._item.parentElement.appendChild(item);

                document.addEventListener('mousemove', this._moveAt);
                document.addEventListener('mouseup', this._endMoving);
            }
        }

    }

    _getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top,
            left: box.left
        };
    }

    _moveAt(e) {
        this._item.style.left = e.pageX - this._shiftX - this._shiftXAbsPar + 'px';
        this._item.style.top = e.pageY - this._shiftY - this._shiftYAbsPar + 'px';
    }

    _endMoving() {
        document.removeEventListener('mousemove', this._moveAt);
        document.removeEventListener('mouseup', this._endMoving);
    }

    _emptyPositions() {
        this._item.style.bottom = 'auto';
        this._item.style.right = 'auto';
    }

    _findAbsPar(path) {
        let indexOwn = path.indexOf(this._item) + 1;
        path.slice(indexOwn, -6).reverse().forEach(el => {
            if (el.style.position === 'absolute' || el.style.position === 'relative' || el.style.position === 'fixed') {
                let coor = el.getBoundingClientRect();
                this._shiftXAbsPar = coor.left;
                this._shiftYAbsPar = coor.top;
            }
        });
    }

    _issetNoDrop(path) {
        let isset = false;
        path.slice(0, -6).forEach(el => {
            if (el.dataset.drugon === 'noDrugon') {
                isset = true;
            }
        });
        return isset;
    }
}
