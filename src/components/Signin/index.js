import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from '@shoutem/ui';
import PropTypes from 'prop-types';
import Colors from '../../theme/colors';

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
            styleName='xl-gutter-top sm-gutter-bottom'
            placeholder="Username or Email" />
        <TextInput
            styleName='sm-gutter-top md-gutter-bottom'
            style={ styles.textInput }
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
