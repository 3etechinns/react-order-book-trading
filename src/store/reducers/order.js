import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import order from '../../assets/data/order-book.json';


const initialState = {
    ...order
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        default:
            return state;
    }
}

export default reducer;
