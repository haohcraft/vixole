import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet
} from 'react-native';
import colors from '../../theme/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 8,
        backgroundColor: colors.white
    }
});

const Screen = props => (
    <View style={ [styles.container, props.style] } >
        { props.children }
    </View>
);

Screen.propTypes = {
    style: PropTypes.number
};

export default Screen;
