import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { startsWith, pick } from 'lodash';
import actions, { AUTH, ActionTypes } from './actions';

const authMiddleware = ({ dispatch }) => next => (action) => {
    if (startsWith(action.type, AUTH)) {
        switch (action.type) {
            case ActionTypes.LOGIN_WITH_FB: {
                let accessToken;
                const responseInfoCallback = (error, result) => {
                    if (error) {
                        dispatch(actions.loginWithFbFailed);
                    } else {
                        dispatch(actions.loginWithFbSuccess({
                            ...accessToken,
                            ...result
                        }));
                    }
                };

                LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_about_me']).then(
                    (result) => {
                        if (result.isCancelled) {
                            dispatch(actions.loginWithFbFailed());
                        } else {
                            AccessToken.getCurrentAccessToken().then((data) => {
                                accessToken = pick(data, [
                                    'accessToken', 'userID',
                                    'expirationTime'
                                ]);
                                const infoRequest = new GraphRequest(
                                    '/me',
                                    {
                                        accessToken: accessToken.accessToken,
                                        parameters: {
                                            fields: {
                                                string: 'email,name,first_name,middle_name,last_name,picture'
                                            }
                                        }
                                    },
                                    responseInfoCallback
                                );
                                // Start the graph request.
                                new GraphRequestManager().addRequest(infoRequest).start();
                            });


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

// To Check if the BaseScreen is authenticated or not
export const checkAuth = BaseScreen => (loginNavObj) => {
    // To prevent dismissing the non-login modal
    let isLoginModal = false;
    class CheckedComponent extends Component {
        static propTypes = {
            navigator: PropTypes.object.isRequired,
            isAuthenticated: PropTypes.bool.isRequired
        };
        componentDidMount() {
            if (!this.props.isAuthenticated) {
                isLoginModal = true;
                this.props.navigator.showModal(loginNavObj);
            }
        }
        componentWillReceiveProps(nextProps) {
            if (!nextProps.isAuthenticated) {
                isLoginModal = true;
                nextProps.navigator.showModal(loginNavObj);
            } else if (isLoginModal) {
                isLoginModal = false;
                nextProps.navigator.dismissModal();
            }
        }
        render() {
            return (
                this.props.isAuthenticated ? <BaseScreen {...this.props} /> : null
            );
        }
    }

    const ConnectedCheckedComponent = connect(
        state => ({ isAuthenticated: state.auth.isAuthenticated }),
        null
    )(CheckedComponent);

    return ConnectedCheckedComponent;
    // TODO: need to hoist the BaseScreenComponent's props
    //hoistPropTypes(BaseComponent, ConnectedCheckedComponent);
};

export default authMiddleware;

