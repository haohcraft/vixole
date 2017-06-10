import { ActionTypes } from './actions';

const initialState = {
    isLike: false,
};
const itemReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.LIKE: {
            return {
                ...state,
                isLike: true
            };
        }
        case ActionTypes.REVOKE_LIKE: {
            return {
                ...state,
                isLike: false
            };
        }
        default:
            return state;
    }
};

export default itemReducer;
