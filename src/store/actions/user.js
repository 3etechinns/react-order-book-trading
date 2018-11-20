import * as actionTypes from '../actions/actionTypes';

export const userInit = () => {
    return {
        type: actionTypes.USER_INIT,
    }
}

export const changeName = (name) => {
    return {
        type: actionTypes.CHANGE_NAME,
        name: name
    }
}

export const deductBalance = (order) => {
    return {
        type: actionTypes.DEDUCT_BALANCE,
        order: order
    }
}

export const returnBalance = (order, priceDifference, volumeSold) => {
    console.log(order)
    return {
        type: actionTypes.RETURN_BALANCE,
        orderType: order.type,
        price: order.price,
        priceDifference: priceDifference,
        volumeSold: volumeSold
    }
}
