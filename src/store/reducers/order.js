import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import order from '../../assets/data/order-book.json';


const initialState = {
    ...order
}

const validateOrder = (state, action) => {
    
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VALIDATE_ORDER: return;
        case actionTypes.ADD_ORDER: return;
        case actionTypes.CLOSE_ORDER: return;
        case actionTypes.REMOVE_ORDER: return;
        default:
            return state;
    }
}

export default reducer;
