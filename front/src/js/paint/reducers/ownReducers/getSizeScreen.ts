'use strict';

import { Vector2 } from "../../structDate/vector2";
import { SizeScreenActionType, CHANGE_SIZE_SCREEN } from "../../actions/sizeScreenActions";

let def: Vector2 = new Vector2(window.innerHeight, window.innerWidth);

export default () => (state: Vector2 = def, action: SizeScreenActionType) : Vector2 => {
    switch (action.type) {
        case CHANGE_SIZE_SCREEN:
            return action.size;
       
        default:
            return state;
    }
};
