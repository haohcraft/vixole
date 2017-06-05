import React from 'react';
import {
    View,
    Text,
    Button
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
    onPressSignIn
}) => (
    <View>
        <TextInput
            placeholder="Username or Email" />
        <TextInput
            placeholder="Password"
            secureTextEntry
        />
        <Button onPress={onPressSignIn} >
            <Text style={ styles.text }>Sign in</Text>
        </Button>
    </View>
);

Signin.propTypes = {
    onPressSignIn: PropTypes.func.isRequired
};

export default Signin;
