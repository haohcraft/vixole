import { combineReducers } from 'redux';
import { getCollectionActionTypes } from './actions';
import { createAPIReducer } from '../../middlewares/api/util';
import itemReducer from '../../components/Item/reducer';

const initialState = {
    likes: {}
};

const collectionReducer = createAPIReducer({
    actionTypes: getCollectionActionTypes
});

const likesReducer = (state = initialState.likes, action) => {
    const { itemId } = action.payload;
    return {
        ...state,
        [itemId]: itemReducer(state[itemId], action).isLiked
    };
};

export default combineReducers({
    collection: collectionReducer,
    likes: likesReducer
});
