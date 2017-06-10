import { combineReducers } from 'redux';
import collectionReducer from './screens/Discover/reducer';
import bleReducer from './middlewares/ble/reducer';
import authReducer from './middlewares/auth/reducer';

export default combineReducers({
    ble: bleReducer,
    auth: authReducer,
    ...collectionReducer
});
