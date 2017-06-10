import { createActionTypes, createActionCreator } from '../../lib/utils';

// Will generate actionTypes, like `BLE_START_SCAN`.
export const ActionTypes = createActionTypes({
    namespace: 'DISCOVERY',
    types: [
    	'GET_COLLECTION',
        'LIKE',
        'REVOKE_LIKE'
    ]
});

export default {
    ...createActionCreator(ActionTypes)
};
