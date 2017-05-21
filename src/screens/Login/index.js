import React, { Component } from 'react';
import { LoginManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Screen,
    View,
    Text,
    TouchableOpacity
} from '@shoutem/ui';
import Colors from '../../theme/colors';

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

export default class LoginScreen extends Component {
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
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            (result) => {
                if (result.isCancelled) {
                    // alert('Login cancelled');
                } else {
                    // alert('Login success with permissions: '
                    //     + result.grantedPermissions.toString());
                }
            },
            (/*error*/) => {
                // alert('Login fail with error: ' + error);
            }
        );
    }
}
