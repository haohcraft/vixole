import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Screen,
    View,
    Text,
    TouchableOpacity,
    Heading
} from '@shoutem/ui';

import authActions from '../../middlewares/auth/actions';
import Signin from '../../components/Signin';
import FbSignin from '../../components/FbSignin';

export const navObj = {
    screen: 'v.LoginScreen'
};

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
        this.onPressFbLogin = this._onPressFbLogin.bind(this);
        this.onPressForgotPw = this._onPressForgotPw.bind(this);
        this.onPressSignUp = this._onPressSignUp.bind(this);
    }
    render() {
        return (
             <Screen>
                <View styleName='flexible center vertical space-around xl-gutter-left xl-gutter-right'>
                    <Heading styleName=''>VIXOLE.</Heading>
                    <View>
                        <Signin onPressSignIn={this.onPressSignIn}/>
                        <TouchableOpacity onPress={this.onPressForgotPw}>
                            <Text styleName='h-right sm-gutter-top sm-gutter-bottom'>Forgot Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.onPressSignUp}>
                            <Text styleName='h-right'>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <FbSignin onPressFbSignIn={ this.onPressFbLogin } />
                </View>
            </Screen>
        );
    }
    _onPressSignIn() {
        //
    }
    _onPressSignUp() {
        //
    }
    _onPressForgotPw() {
        //
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
