import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import order from '../../assets/data/order-book.json';


const initialState = {
    order: [...order]
}

const validateOrder = (state, action) => {
    
}

const addOrder = (state, action) => {
    const newOrder = updateObject(action.order,{ id: `order-book-${state.order.length+1}`, user: action.user });
    const updatedState = {
        order: state.order.concat(newOrder)
    }
    return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VALIDATE_ORDER: return;
        case actionTypes.ADD_ORDER: return addOrder(state, action);
        case actionTypes.CLOSE_ORDER: return;
        case actionTypes.REMOVE_ORDER: return;
        default:
            return state;
    }
}

export default reducer;
