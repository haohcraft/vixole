import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View
} from 'react-native';

export default class vixole extends Component {
    render() {
        return (
            <View>
                <Text>
                    Welcome to React Native!
                </Text>
                <Text>
                    To get started, edit index.ios.js
                </Text>
                <Text>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }
}

AppRegistry.registerComponent('vixole', () => vixole);
