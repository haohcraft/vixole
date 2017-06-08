import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Dimensions,
    Keyboard
} from 'react-native';
import {
    Screen,
    View,
    Heading
} from '@shoutem/ui';

import authActions from '../../middlewares/auth/actions';
import Signin from '../../components/Signin';
import Signup from '../../components/Signup';
import FbSignin from '../../components/FbSignin';

export const navObj = {
    screen: 'v.LoginScreen'
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

class LoginScreen extends Component {
    static propTypes = {
        navigator: PropTypes.object,
        loginWithFb: PropTypes.func.isRequired
    };
    static navigatorStyle = {
        navBarHidden: true
    };
    constructor(props) {
        super(props);
        this.onPressSignIn = this._onPressSignIn.bind(this);
        this.onPressSignUp = this._onPressSignUp.bind(this);
        this.onPressFbLogin = this._onPressFbLogin.bind(this);
        this.gotoSignUp = this._gotoSignUp.bind(this);
        this.gotoSignIn = this._gotoSignIn.bind(this);
        this.keyboardWillShow = this._keyboardWillShow.bind(this);
        this.keyboardWillHide = this._keyboardWillHide.bind(this);

        this.state = {
            formType: '',
            containerHeight: SCREEN_HEIGHT
        };
    }
    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }
    render() {
        return (
            <Screen>
                <View style={{ maxHeight: this.state.containerHeight }}
                    styleName='flexible center vertical space-around xl-gutter-left xl-gutter-right'>
                    <Heading styleName='h-center md-gutter-top'>VIXOLE.</Heading>
                    <View>
                        { this.renderForm(this.state.formType) }
                    </View>
                    <FbSignin onPressFbSignIn={ this.onPressFbLogin } />
                </View>
            </Screen>
        );
    }
    _keyboardWillShow(event) {
        this.setState({
            containerHeight: SCREEN_HEIGHT - event.endCoordinates.height
        });
    }

    _keyboardWillHide() {
        this.setState({
            containerHeight: SCREEN_HEIGHT
        });
    }
    renderForm(type) {
        switch (type) {
            case 'signup': {
                return (
                    <Signup
                        onPressSignUp={this.onPressSignUp}
                        gotoSignIn={this.gotoSignIn} />
                );
            }
            default:
                return (
                    <Signin
                        onPressSignIn={this.onPressSignIn}
                        gotoSignUp={this.gotoSignUp} />
                );
        }
    }
    _onPressSignIn() {
        //
    }
    _onPressSignUp() {
        //
    }
    _gotoSignUp() {
        this.setState({
            formType: 'signup'
        });
    }
    _gotoSignIn() {
        this.setState({
            formType: 'signin'
        });

    }
    _onPressFbLogin() {
        this.props.loginWithFb();
    }
}

export default connect(
    null,
    {
        loginWithFb: authActions.loginWithFb
    }
)(LoginScreen);
