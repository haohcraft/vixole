import React, { Component } from 'react';

import { View, TextInput, Text, Button, Colors } from 'react-native-ui-lib';

export default class vixole extends Component {
    componentWillMount() {
        Colors.loadColors({
            grey: Colors.rgba('#ff2442', 0.15)
        });
    }
    render() {
        return (
            <View flex paddingH-25 paddingT-120>
                <Text grey text20>Welcome</Text>
                <TextInput text50 placeholder="username" dark10/>
                <TextInput text50 placeholder="password" secureTextEntry dark10/>
                <View marginT-100 center>
                    <Button text70 white background-orange30 label="Login"/>
                    <Button link text70 orange30 label="Sign Up" marginT-20/>
                </View>
            </View>
        );
    }
}
