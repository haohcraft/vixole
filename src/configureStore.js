/* eslint-disable no-undef */
// import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import { autoRehydrate, persistStore } from 'redux-persist';
import reducers from './reducers';
import bleMiddleware from './middlewares/ble';
import authMiddleware from './middlewares/auth';
import APIMiddleware from './middlewares/api';

let middleware = [thunk, APIMiddleware, bleMiddleware, authMiddleware];

if (__DEV__) {
    const logger = createLogger({ collapsed: true });
    middleware = [...middleware, logger];
} else {
    middleware = [...middleware];
}

export default function configureStore(initialState) {
    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(...middleware),
            // autoRehydrate()
        )
    );
    // persistStore(store, { storage: AsyncStorage });
    return store;
}
