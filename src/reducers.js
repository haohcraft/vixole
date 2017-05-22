import { combineReducers } from 'redux';
import bleReducer from './middlewares/ble/reducer';
import authReducer from './middlewares/auth/reducer';

export default combineReducers({
    ble: bleReducer,
    auth: authReducer
});
