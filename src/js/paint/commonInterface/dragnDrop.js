module.exports = class DragnDrop {
    constructor(item) {
        this._item = item;
        this._shiftX = 0;
        this._shiftY = 0;

        this._moveAt = this._moveAt.bind(this);
        this._endMoving = this._endMoving.bind(this);
    }

    startDragonDroping() {
        let item = this._item;
        item.addEventListener('dragstart', e => false);

        item.onmousedown = e => {
            if (this._issetNoDrop(e.path)) {
                return false;
            } else {
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
        this._item.style.left = e.pageX - this._shiftX + 'px';
        this._item.style.top = e.pageY - this._shiftY + 'px';
    }

    _endMoving() {
        document.removeEventListener('mousemove', this._moveAt);
        document.removeEventListener('mouseup', this._endMoving);
    }

    _emptyPositions() {
        this._item.style.bottom = 'auto';
        this._item.style.right = 'auto';
    }

    _issetNoDrop(path) {
        let isset = false;
        path.slice(0, -6).forEach(el => {
            if (el.dataset.toogle === 'noToogle') {
                isset = true;
            }
        });
        return isset;
    }
}
