import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import user from '../../assets/data/user.json';


const initialState = {
    ...user
}

const changeName = (state, action) => {
    return updateObject(state, {name: action.name})
}

const deductBalance = (state, action) => {
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

const returnBalance = (state, action) => {
    let updatedBalance = null;
    if(action.orderType === 'bid') {
        // You lose from 0 you gain from 1
        updatedBalance = [
            ...state.balances
        ]

        updatedBalance[1] = {
            ...updatedBalance[1],
            balance: updatedBalance[1].balance + (action.volumeSold)
        }

        // Return excess to 0
        updatedBalance[0] = {
            ...updatedBalance[0],
            balance: updatedBalance[0].balance + (action.priceDifference * action.volumeSold)
        }

    } else if (action.orderType === 'ask') {
        // You lose from 1 you gain from 0
        updatedBalance = [
            ...state.balances
        ]

        updatedBalance[0] = {
            ...updatedBalance[0],
            balance: (action.volumeSold * action.price) + (action.priceDifference * action.volumeSold)
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
        case actionTypes.DEDUCT_BALANCE: return deductBalance(state, action);
        case actionTypes.RETURN_BALANCE: return returnBalance(state, action);
        default:
            return state;
    }
}

export default reducer;
