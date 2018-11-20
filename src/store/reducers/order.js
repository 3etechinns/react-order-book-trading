import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import order from '../../assets/data/order-book.json';


const initialState = {
    order: [...order],
    hasOrdered: false
}

const executeOrder = (state, action) => {
    const updatedState = action.state;
    return updateObject(state, updatedState);
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXECUTE_ORDER: return executeOrder(state, action);
        default:
            return state;
    }
}

export default reducer;
