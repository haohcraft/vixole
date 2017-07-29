import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity
} from 'react-native';
import Icon from '../../components/Icon';
import { styleNav } from './style';

const styleButtonRight = {
    container: {
        marginLeft: 5
    }
};

const iconStyle = { width: 30, height: 30 };

const Nav = ({ navigator }) => {
    const onPress = () => {
        navigator.dismissModal();
    };
    return (
        <View style={ styleNav.container } >
            <View style={ styleNav.buttons } >
                <Icon name='ios-arrow-back' style={ iconStyle } />
                <Icon name='ios-arrow-forward' style={ [iconStyle, styleButtonRight.container] } />
            </View>
            <TouchableOpacity
                onPress={ onPress }
            >
                <Icon name='ios-close' style={ iconStyle } />
            </TouchableOpacity>
        </View>
    );
};

Nav.propTypes = {
    navigator: PropTypes.object.isRequired
};

export default Nav;
