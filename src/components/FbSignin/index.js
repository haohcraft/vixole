import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    TouchableOpacity,
} from '@shoutem/ui';

import Colors from '../../theme/colors';

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

const FbSignin = ({
    onPressFbSignIn
}) => (
    <View>
        <TouchableOpacity onPress={ onPressFbSignIn }>
            <View styleName='horizontal space-around' style={ styles.container }>
                <Icon name='logo-facebook' size={ 20 } style={ styles.icon }/>
                <Text style={ styles.link }>Log In With Facebook</Text>
            </View>
        </TouchableOpacity>
    </View>
);

FbSignin.propTypes = {
    onPressFbSignIn: PropTypes.func.isRequired
};


export default FbSignin;
