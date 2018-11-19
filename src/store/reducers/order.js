import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import order from '../../assets/data/order-book.json';


const initialState = {
    ...order
}

const changeName = (state, action) => {
    return updateObject(state, {name: action.name})
}

const updateBalance = (state, action) => {
    return updateObject(state, {balance: action.balance})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        default:
            return state;
    }
}

export default reducer;
