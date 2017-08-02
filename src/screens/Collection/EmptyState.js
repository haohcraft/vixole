import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { styleEmptyState } from './style';

const EmptyState = ({ onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={ 1 }
            onPress={ onPress }
        >
            <View style={ styleEmptyState.container } >
                <View>
                    <Text style={ styleEmptyState.text } >Save Designs You Love</Text>
                </View>
                <View style={ styleEmptyState.divideContainer } >
                    <View style={ styleEmptyState.divide } ></View>
                </View>
                <View>
                    <Text style={ styleEmptyState.text } >From DISCOVER</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

EmptyState.propTypes = {
    onPress: PropTypes.func.isRequired
};

export default EmptyState;
