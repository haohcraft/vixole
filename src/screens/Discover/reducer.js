import { getCollectionActionTypes } from './actions';
import { createAPIReducer } from '../../middlewares/api/util';
import itemReducer from '../../components/DesignItem/reducer';
import { ActionTypes as ItemActionTypes } from '../../components/DesignItem/actions';

/* eslint-disable */
const ITEMS = [
    { uuid: '0', name: 'bird', url: require('../../assets/images/1_bird.jpg') },
    { uuid: '1', name: 'circle', url: require('../../assets/images/2_circle.jpg') },
    { uuid: '2', name: 'diamond', url: require('../../assets/images/3_diamond.jpg') },
    { uuid: '3', name: 'face', url: require('../../assets/images/4_face.jpg') },
    { uuid: '4', name: 'galaxy', url: require('../../assets/images/5_galaxy.jpg') },
    { uuid: '5', name: 'gird', url: require('../../assets/images/6_grid.jpg') },
    { uuid: '6', name: 'wave', url: require('../../assets/images/7_wave.jpg') },
    { uuid: '7', name: 'snow', url: require('../../assets/images/8_snow.jpg') },
    { uuid: '8', name: 'thumber', url: require('../../assets/images/9_thumber.jpg') },
    { uuid: '9', name: 'water', url: require('../../assets/images/10_water.jpg') }
];
/* eslint-enable */

const initialState = {
    saved: {}
};

const collectionReducer = createAPIReducer({
    actionTypes: getCollectionActionTypes,
    initialState: {
        data: ITEMS
    }
});

const savedReducer = (state = initialState.saved, action) => {
    switch (action.type) {
        case ItemActionTypes.TOGGLE_SAVE: {
            const { uuid } = action.payload;
            return {
                ...state,
                [uuid]: itemReducer({ isSaved: state[uuid] }, action).isSaved
            };
        }
        default:
            return state;
    }
};

export default {
    collection: collectionReducer,
    saved: savedReducer
};
