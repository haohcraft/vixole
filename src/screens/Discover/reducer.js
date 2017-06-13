import { getCollectionActionTypes } from './actions';
import { createAPIReducer } from '../../middlewares/api/util';
import itemReducer from '../../components/Item/reducer';
import { ActionTypes as ItemActionTypes } from '../../components/Item/actions';

/* eslint-disable */
const ITEMS = [
    { uuid: '0', url: require('../../assets/images/1_bird.jpg') },
    { uuid: '1', url: require('../../assets/images/2_circle.jpg') },
    { uuid: '2', url: require('../../assets/images/3_diamond.jpg') },
    { uuid: '3', url: require('../../assets/images/4_face.jpg') },
    { uuid: '4', url: require('../../assets/images/5_galaxy.jpg') },
    { uuid: '5', url: require('../../assets/images/6_grid.jpg') },
    { uuid: '6', url: require('../../assets/images/7_wave.jpg') },
    { uuid: '7', url: require('../../assets/images/8_snow.jpg') },
    { uuid: '8', url: require('../../assets/images/9_thumber.jpg') },
    { uuid: '9', url: require('../../assets/images/10_water.jpg') }
];
/* eslint-enable */

const initialState = {
    likes: {}
};

const collectionReducer = createAPIReducer({
    actionTypes: getCollectionActionTypes,
    initialState: {
        data: ITEMS
    }
});

const likesReducer = (state = initialState.likes, action) => {
    switch (action.type) {
        case ItemActionTypes.LIKE:
        case ItemActionTypes.REVOKE_LIKE: {
            const { itemId } = action.payload;
            return {
                ...state,
                [itemId]: itemReducer({ isLike: state[itemId] }, action).isLike
            };
        }
        default:
            return state;
    }
};

export default {
    collection: collectionReducer,
    likes: likesReducer
};
