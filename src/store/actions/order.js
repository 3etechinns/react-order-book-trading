import * as actionTypes from '../actions/actionTypes';

export const validateOrder = () => {
    return {
        type: actionTypes.VALIDATE_ORDER,
    }
}

export const executeOrder = (order) => {
    
}

export const addOrder = (order, user) => {
    return {
        type: actionTypes.ADD_ORDER,
        order: order,
        user: user
    }
}

export const closeOrder = (balance) => {
    return {
        type: actionTypes.CLOSE_ORDER,
        balance: balance
    }
}

export const removeOrder = () => {
    return {
        type: actionTypes.REMOVE_ORDER,
    }
}