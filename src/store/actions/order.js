import * as actionTypes from '../actions/actionTypes';

export const executeOrder = (order, user) => {
    return {
        type: actionTypes.EXECUTE_ORDER,
        order: order,
        user: user
    }
}