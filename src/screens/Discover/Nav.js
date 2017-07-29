import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
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

const Nav = () => {
    return (
        <View style={ styles.container } >
            <Text style={ styles.navTitle } >DISCOVER</Text>
        </View>
    );
};

export default Nav;
