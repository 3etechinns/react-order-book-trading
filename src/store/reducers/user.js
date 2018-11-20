import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import user from '../../assets/data/user.json';


const initialState = {
    ...user
}

const changeName = (state, action) => {
    return updateObject(state, {name: action.name})
}

const updateBalance = (state, action) => {
    let updatedBalance = null;
    if(action.order.type === 'bid') {
        updatedBalance = [
            ...state.balances
        ]

        updatedBalance[0] = {
            ...updatedBalance[0],
            balance: updatedBalance[0].balance - action.order.total
        }

    } else if(action.order.type === 'ask') {
        updatedBalance = [
            ...state.balances
        ]

        updatedBalance[1] = {
            ...updatedBalance[1],
            balance: updatedBalance[1].balance - action.order.volume
        }
    }

    const updatedState = {
        balances: [...updatedBalance]
    }
    return updateObject(state, updatedState)
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
