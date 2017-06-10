import { createAPIActionTypes, createAPIActionCreator } from '../../middlewares/api/util';

export const getCollectionActionTypes = createAPIActionTypes({ namespace: 'COLLECTION.GET' });

export default {
    getCollection: createAPIActionCreator({
        actionTypes: getCollectionActionTypes
    })
};

