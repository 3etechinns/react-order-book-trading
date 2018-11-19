import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import user from '../../data/user.json';


const initialState = {
    ...user
}

const changeName = (state, action) => {
    return updateObject(state, {name: action.name})
}

const updateBalance = (state, action) => {
    return updateObject(state, {balance: action.balance})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_NAME: return changeName(state, action);
        case actionTypes.UPDATE_BALANCE: return updateBalance(state, action);
        default:
            return state;
    }
}

export default reducer;
