import * as actionTypes from '../actions/actionTypes';

export const executeOrder = (order) => {
    return {
        type: actionTypes.EXECUTE_ORDER,
        state: order
    }
}