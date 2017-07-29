import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { STATUSBAR_HEIGHT } from '../../lib/utils';
import { themeVariables } from '../../theme';
import { iconsMap } from '../../theme/icons';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: STATUSBAR_HEIGHT,
        paddingVertical: 10
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10
    },
    navTitle: themeVariables.headTitle
});


const Nav = ({ name, navigator }) => {
    const goBack = () => { navigator.pop(); };
    return (
        <TouchableOpacity onPress={ goBack }>
            <View style={ styles.container } >
                <Image style={ styles.icon }
                    resizeMode={ Image.resizeMode.contain }
                    source={{ uri: iconsMap['ios-arrow-back'].uri }} />
                <Text style={ styles.navTitle } >{ name }</Text>
            </View>
        </TouchableOpacity>
    );
};

Nav.propTypes = {
    name: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired
};

export default Nav;
