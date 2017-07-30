import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image
} from 'react-native';
import { stylePropType } from '../../lib/utils';
import { iconsMap } from '../../theme/icons';

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
});
const Icon = ({ name, style }) => {
    return (
        <Image style={ [styles.icon, style] }
            resizeMode={ Image.resizeMode.contain }
            source={{ uri: iconsMap[name].uri }} />
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    style: stylePropType
};

export default Icon;
