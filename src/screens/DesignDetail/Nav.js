import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity
} from 'react-native';
import Icon from '../../components/Icon';
import { styleNav } from './style';

const Nav = ({
    navigator,
    hasPreNext = false,
    onPrevPress,
    onNextPress,
    isPrevDisabled,
    isNextDisabled
}) => {
    const onPress = () => {
        navigator.dismissModal();
    };
    return (
        <View style={ styleNav.container } >
            <View>
                {
                    hasPreNext ? (
                        <View style={ styleNav.buttons } >
                            <TouchableOpacity onPress={ onPrevPress } disabled={ isPrevDisabled } >
                                <Icon
                                    name='ios-arrow-back'
                                    style={ [styleNav.button, isPrevDisabled ? styleNav.buttonDisabled : null] } />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ onNextPress } disabled={ isNextDisabled } >
                                <Icon
                                    name='ios-arrow-forward'
                                    style={[
                                        styleNav.button,
                                        styleNav.buttonRight,
                                        isNextDisabled ? styleNav.buttonDisabled : null
                                    ]} />
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
            </View>
            <TouchableOpacity
                onPress={ onPress }
            >
                <Icon name='ios-close' style={ styleNav.button } />
            </TouchableOpacity>
        </View>
    );
};

Nav.propTypes = {
    navigator: PropTypes.object.isRequired,
    onPrevPress: PropTypes.func,
    onNextPress: PropTypes.func,
    hasPreNext: PropTypes.bool,
    isPrevDisabled: PropTypes.bool,
    isNextDisabled: PropTypes.bool,
};

export default Nav;
