import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from '../Icon';
import styles from './style';

const Heading = ({ label, onPress }) => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.text } >{ label }</Text>
            <TouchableOpacity onPress={ onPress } >
                <Icon name='ios-arrow-forward' />
            </TouchableOpacity>
        </View>
    );
};

Heading.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

export default Heading;
