import { combineReducers } from 'redux';
import bleReducer from './middlewares/ble/reducer';

export default combineReducers({
    ble: bleReducer
});
