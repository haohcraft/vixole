import { LoginManager } from 'react-native-fbsdk';
import { startsWith } from 'lodash';
import actions, { AUTH, ActionTypes } from './actions';


const authMiddleware = ({ dispatch }) => next => (action) => {
    if (startsWith(action.type, AUTH)) {
        switch (action.type) {
            case ActionTypes.LOGIN_WITH_FB: {
                LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_about_me']).then(
                    (result) => {
                        if (result.isCancelled) {
                            dispatch(actions.loginWithFbFailed());
                        } else {
                            dispatch(actions.loginWithFbSuccess());
                        }
                    },
                    (/*error*/) => {
                        dispatch(actions.loginWithFbSuccess());
                    }
                );
                break;
            }
            default:
                break;
        }
    }
    return next(action);
};

export default authMiddleware;

