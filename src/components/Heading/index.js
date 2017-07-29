import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { iconsMap } from '../../theme/icons';
import styles from './style';

const Heading = ({ label, onPress }) => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.text } >{ label }</Text>
            <TouchableOpacity onPress={ onPress } >
                <Image style={ styles.icon }
                    resizeMode={ Image.resizeMode.contain }
                    source={{ uri: iconsMap['ios-arrow-forward'].uri }} />
            </TouchableOpacity>
        </View>
    );
};

Heading.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default Heading;
