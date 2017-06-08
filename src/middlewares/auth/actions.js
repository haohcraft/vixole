import { createActionTypes, createActionCreator } from '../../lib/utils';

export const AUTH = 'AUTH';

export const ActionTypes = createActionTypes({
    namespace: AUTH,
    types: [
        'LOGIN_WITH_FB',
        'LOGIN_WITH_FB_SUCCESS',
        'LOGIN_WITH_FB_FAILED',
        'LOGIN_WITH_EMAIL',
        'LOGIN_WITH_EMAIL_SUCCESS',
        'LOGIN_WITH_EMAIL_FAILED',
        'LOGOUT'
    ]
});

export default {
    ...createActionCreator(ActionTypes)
};
