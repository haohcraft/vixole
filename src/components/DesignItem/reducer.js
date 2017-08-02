import { ActionTypes } from './actions';

const initialState = {
    isSaved: false,
};
const itemReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_SAVE: {
            return {
                ...state,
                isSaved: !state.isSaved
            };
        }
        default:
            return state;
    }
};

export default itemReducer;
