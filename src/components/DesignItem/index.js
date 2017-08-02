import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from '../Icon';
import actions from './actions';
import {
    styleDesignItem,
    designWidth as baseDesignWidth,
    itemWidth as baseItemWidth
} from './style';
import More from './More';

const DesignItem = ({
    source,
    name,
    onItemPress,
    itemWidth = baseItemWidth,
    designWidth = baseDesignWidth,
    toggleSave,
    isSaved
}) => {
    const styleContainer = {
        width: itemWidth,
        height: designWidth + 35,
    };
    const styleImage = {
        width: designWidth,
        height: designWidth,
    };
    return (
        <TouchableOpacity
            activeOpacity={ 1 }
            style={ [styleDesignItem.container, styleContainer] }
            onPress={ onItemPress }
        >
            <View style={ styleDesignItem.imageContainer }>
                <Image
                    source={ source }
                    style={ [styleDesignItem.image, styleImage] }
                />
            </View>
            <View style={ styleDesignItem.textContainer }>
                <Text style={ styleDesignItem.text } >{ name.toUpperCase() }</Text>
                <TouchableOpacity activeOpacity={ 1 } onPress={ toggleSave } >
                    <Icon name={ isSaved ? 'ios-star' : 'ios-star-outline'} style={ styleDesignItem.save } />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

DesignItem.propTypes = {
    source: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onItemPress: PropTypes.func.isRequired,
    toggleSave: PropTypes.func.isRequired,
    isSaved: PropTypes.bool.isRequired,
    itemWidth: PropTypes.number,
    designWidth: PropTypes.number
};

export {
    More,
    baseItemWidth
};
export const DesignItemActions = actions;
export default DesignItem;
