import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    View,
    TouchableOpacity
} from '@shoutem/ui';

import Icon from 'react-native-vector-icons/Ionicons';
import actions from './actions';
import styles from './style';

const Item = ({
    id,
    isLike,
    source,
    styleName,
    onPressLike,
    onPressRevokeLike
}) => {
    const pressLike = () => {
        if (isLike) {
            onPressRevokeLike({ itemId: id });
        } else {
            onPressLike({ itemId: id });
        }
    };
    const iconColor = {
        color: isLike ? 'red' : 'white'
    };

    return (
        <Image
            styleName={ styleName }
            source={ source }
        >
            <View styleName='horizontal ' style={styles.footer}>
                <TouchableOpacity onPress={pressLike}>
                    <Icon style={[styles.iconHeart, iconColor]} size={25} name='md-heart-outline' />
                </TouchableOpacity>
            </View>
        </Image>
    );
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    source: PropTypes.number.isRequired,
    styleName: Image.propTypes.styleName,
    onPressLike: PropTypes.func.isRequired,
    onPressRevokeLike: PropTypes.func.isRequired,
    isLike: PropTypes.bool.isRequired
};

export const ItemActions = actions;
export default Item;
