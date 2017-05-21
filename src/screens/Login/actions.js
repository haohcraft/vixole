import { createActionTypes, createActionCreator } from '../../lib/utils';

export const ActionTypes = createActionTypes({
    namespace: 'user',
    types: [
        'LOGIN_WITH_FB'
    ]
});

export default {
    ...createActionCreator(ActionTypes)
};
