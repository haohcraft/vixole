import { ActionTypes } from './actions';

const initialState = {
    isLogin: false,
    fb: {}
};
const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.LOGIN_WITH_EMAIL_SUCCESS:
        case ActionTypes.LOGIN_WITH_FB_SUCCESS: {
            return {
                ...state,
                isLogin: true
            };
        }
        case ActionTypes.LOGIN_WITH_FB_FAILED:
        case ActionTypes.LOGIN_WITH_EMAIL_FAILED: {
            return {
                ...state,
                isLogin: false
            };
        }
        default:
            return state;
    }
};

export default authReducer;
