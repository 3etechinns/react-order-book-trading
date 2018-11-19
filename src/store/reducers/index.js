import userReducer from './user';
import orderBookReducer from './order';

const reducer = {
    user: userReducer,
    order: orderBookReducer
};

export default reducer;
