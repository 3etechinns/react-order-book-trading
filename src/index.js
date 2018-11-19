import React from 'react';
import { render } from 'react-dom';
import App from './App';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './store/reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducer), composeEnhancers( 
    applyMiddleware(thunk) 
));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

render(app, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./store/reducers', () => {
        const nextRootReducer = combineReducers(require('./store/reducers/index'));
        store.replaceReducer(nextRootReducer);
    });
}