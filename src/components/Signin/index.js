import React from 'react';
import {
    View,
    Text,
    Button,
    Title,
    TouchableOpacity
} from '@shoutem/ui';
import PropTypes from 'prop-types';
import Colors from '../../theme/colors';
import TextInput from '../TextInput';

const styles = {
    text: {
        color: Colors.white
    }
};


const Signin = ({
    onPressSignIn,
    gotoSignUp
}) => (
    <View>
        <Title styleName='h-center'>Welcome</Title>
        <TextInput
            placeholder='Username or Email'
            autoCapitalize='none' />
        <TextInput
            placeholder="Password"
            secureTextEntry
        />
        <Button onPress={onPressSignIn} styleName='md-gutter-top'>
            <Text style={ styles.text }>Sign in</Text>
        </Button>
        <TouchableOpacity onPress={gotoSignUp}>
            <Text styleName='h-right'>Sign up</Text>
        </TouchableOpacity>

    </View>
);

Signin.propTypes = {
    onPressSignIn: PropTypes.func.isRequired,
    gotoSignUp: PropTypes.func.isRequired
};

export default Signin;
