import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { STATUSBAR_HEIGHT } from '../../lib/utils';
import { themeVariables } from '../../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: STATUSBAR_HEIGHT,
        paddingVertical: 20
    },
    navTitle: themeVariables.navTitle
});

const StaticNav = ({ title }) => {
    return (
        <View style={ styles.container } >
            <Text style={ styles.navTitle } >{ title.toUpperCase() }</Text>
        </View>
    );
};

StaticNav.propTypes = {
    title: PropTypes.string.isRequired
};

export default StaticNav;
