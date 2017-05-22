import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Screen,
    View,
    Text,
    TouchableOpacity
} from '@shoutem/ui';
import Colors from '../../theme/colors';

import authActions from '../../middlewares/auth/actions';

export const navObj = {
    screen: 'v.LoginScreen'
};

const styles = {
    container: {
        padding: 20
    },
    link: {
        color: Colors.link,
        marginLeft: 5,
        lineHeight: 25
    },
    icon: {
        color: Colors.link
    }
};

class LoginScreen extends Component {
    static propTypes = {
        navigator: PropTypes.object,
        loginWithFb: PropTypes.func.isRequired
    };
    static navigatorStyle = {
        navBarHidden: true
    };
    render() {
        return (
             <Screen>
                <View styleName='flexible center vertical space-around xl-gutter-left xl-gutter-right'>
                    <TouchableOpacity onPress={() => this.onPressFbLogin()}>
                        <View styleName='horizontal space-around' style={ styles.container }>
                        <Icon name='logo-facebook' size={ 20 } style={ styles.icon }/>
                        <Text style={ styles.link }>Log In With Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Screen>
        );
    }
    onPressFbLogin() {
        this.props.loginWithFb();
    }
}

export default connect(
    null,
    {
        loginWithFb: authActions.loginWithFb
    }
)(LoginScreen);
