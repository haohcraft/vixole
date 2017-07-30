import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { iconsMap } from '../../theme/icons';
import { stylePropType } from '../../lib/utils';
import buttonStyles from './style';

const Button = ({
    label,
    icon,
    onPress,
    styles = {}
}) => {
    return (
        <TouchableOpacity onPress={ onPress } >
            <View style={ [buttonStyles.container, styles.container] }>
                    {
                        !!icon && <Image style={ [buttonStyles.icon, styles.icon] }
                            resizeMode={ Image.resizeMode.contain }
                            source={{ uri: iconsMap[icon].uri }} />
                    }
                    {
                        !!label && <Text style={ [buttonStyles.label, styles.label] } >{ label }</Text>
                    }
            </View>
        </TouchableOpacity>
    );
};
Button.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    styles: PropTypes.shape({
        container: stylePropType,
        icon: stylePropType,
        label: stylePropType
    }),
    icon: PropTypes.string
};

export default Button;

