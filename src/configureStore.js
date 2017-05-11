/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import bleMiddleware from './middlewares/ble';

let middleware = [thunk, bleMiddleware];

if (__DEV__) {
    const logger = createLogger({ collapsed: true });
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

export default function configureStore(initialState) {
    return createStore(
        reducers,
        initialState,
        applyMiddleware(...middleware)
    );
}
