import { ActionTypes } from './actions';

const initialState = {
    isAuthenticated: false,
    fb: {}
};
const authReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.LOGIN_WITH_FB_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                fb: { ...action.payload }
            };
        }
        case ActionTypes.LOGIN_WITH_FB_FAILED:
        case ActionTypes.LOGIN_WITH_EMAIL_FAILED: {
            return {
                ...state,
                isAuthenticated: false
            };
        }
        case ActionTypes.LOGOUT: {
            return initialState;
        }
        default:
            return state;
    }
};

export default authReducer;
