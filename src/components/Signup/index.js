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


const Signup = ({
    onPressSignUp,
    gotoSignIn
}) => (
    <View>
        <Title styleName='h-center'>Create account</Title>
        <TextInput
            placeholder='Email address'
            autoCapitalize='none' />
        <TextInput
            placeholder="Password"
            secureTextEntry
        />
        <TextInput
            placeholder="Re-enter Password"
            secureTextEntry
        />
        <Button onPress={onPressSignUp} styleName='md-gutter-top'>
            <Text style={ styles.text }>Sign up</Text>
        </Button>
        <TouchableOpacity onPress={gotoSignIn}>
            <Text styleName='h-left sm-gutter-top sm-gutter-bottom'>Sign in</Text>
        </TouchableOpacity>

    </View>
);

Signup.propTypes = {
    onPressSignUp: PropTypes.func.isRequired,
    gotoSignIn: PropTypes.func.isRequired
};

export default Signup;
