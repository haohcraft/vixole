import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    View
} from '@shoutem/ui';

import Icon from 'react-native-vector-icons/Ionicons';

import styles from './style';

const ImageItem = ({
    source,
    styleName
}) => {
    return (
        <Image
            styleName={ styleName }
            source={ source }
        >
            <View styleName='horizontal ' style={styles.footer}>
                <Icon style={ styles.iconHeart } size={25} name='md-heart-outline' />
            </View>
        </Image>
    );
};

ImageItem.propTypes = {
    source: PropTypes.number.isRequired,
    styleName: Image.propTypes.styleName
};

export default ImageItem;
