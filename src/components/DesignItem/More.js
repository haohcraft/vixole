import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { styleMore } from './style';

const More = ({ number, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={ 1 }
            onPress={ onPress }
        >
            <View style={ styleMore.container } >
                <View>
                    <Text style={ styleMore.text } >View all</Text>
                </View>
                <View style={ styleMore.divideContainer } >
                    <View style={ styleMore.divide } ></View>
                </View>
                <View>
                    <Text style={ styleMore.text } >{ `${number} items` }</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

More.propTypes = {
    number: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
};

export default More;
