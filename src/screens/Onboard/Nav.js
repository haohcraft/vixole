import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Ionicons';
import { StyleProvider } from '@shoutem/theme';
import {
    View,
    TouchableOpacity
} from '@shoutem/ui';
import { themeVariables } from '../../theme';
import Colors from '../../theme/colors';

const theme = {
    'shoutem.ui.View': {
        '.nav': {
            height: 60,
            backgroundColor: Colors.white
        }
    }
};

const iconStyle = {
    margin: 15,
    color: themeVariables.navBarIconsColor
};

export default class Nav extends Component {
    static propTypes = {
        onPressClose: PropTypes.func.isRequired
    };
    render() {
        return (
            <StyleProvider style={theme}>
                <View styleName='nav horizontal space-between middleCenter md-gutter-top'>
                    <TouchableOpacity onPress={() => this.props.onPressClose()}>
                        <Icon name='ios-close' size={ 40 } style={iconStyle}/>
                    </TouchableOpacity>
                </View>
            </StyleProvider>
        );
    }
}
