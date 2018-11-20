import * as actionTypes from '../actions/actionTypes';

export const validateOrder = () => {
    return {
        type: actionTypes.VALIDATE_ORDER,
    }
}

export const addOrder = () => {
    return {
        type: actionTypes.ADD_ORDER
    }
}

export const closeOrder = (balance) => {
    return {
        type: actionTypes.CLOSE_ORDER,
        balance: balance
    }
}
