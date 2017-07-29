import { createActionTypes, createActionCreator } from '../../lib/utils';

export const ActionTypes = createActionTypes({
    namespace: 'ITEM',
    types: [
        'LIKE',
        'REVOKE_LIKE'
    ]
});

export default createActionCreator(ActionTypes);
