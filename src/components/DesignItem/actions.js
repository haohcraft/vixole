import { createActionTypes, createActionCreator } from '../../lib/utils';

export const ActionTypes = createActionTypes({
    namespace: 'ITEM',
    types: [
        'TOGGLE_SAVE'
    ]
});

export default createActionCreator(ActionTypes);
