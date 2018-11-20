import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import order from '../../assets/data/order-book.json';


const initialState = {
    order: [...order]
}

const executeOrder = (state, action) => {
    const arr = [];
    const store = [];
    const order = {
        ...action.order,
        id: `order-book-${state.order.length+1}`,
        user: action.user
    }
    console.log(123,order)
    const type = order.type === 'ask' ? 'bid' : 'ask';
    for(let key in state.order){
        if(state.order[key].type === type){
            arr.push({
                ...state.order[key]
            })
        } else {
            store.push({
                ...state.order[key]
            })
        }
    }

    order.type === 'ask' ? arr.sort((a, b) => b.price - a.price) : arr.sort((a, b) => a.price - b.price);

    for(let key in arr){
        const isAsk = type === 'ask' ? order.price >= arr[key].price : order.price <= arr[key].price;
        if(isAsk && !arr[key].closed && !order.closed) {
            if(order.volume > arr[key].volume) {
                console.log("More volume on order")
                // We can close arr[key]
                arr[key].closed = true;
                // Reduce volume for both order
                let volume = arr[key].volume;
                arr[key].volume = 0;
                order.volume = order.volume - volume;
                // 

            } else if(order.volume < arr[key].volume) {
                console.log("Less volume on order")
                // We can close order.
                order.closed = true;
                // Reduce volume for both order
                let volume = order.volume;
                order.volume = 0;
                arr[key].volume = arr[key].volume - volume;


            } else {
                console.log("Equal volume on order")
                // We close both order and arr[key]
                order.closed = true;
                arr[key].closed = true;
                // Reduce volume for both order
                order.volume = 0;
                arr[key].volume = 0;

            }
        }
    }

    const updatedState = {
        order: [...arr.concat(order).concat(store)]
    }
    return updateObject(state, updatedState);
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXECUTE_ORDER: return executeOrder(state, action);
        default:
            return state;
    }
}

export default reducer;
