import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { iconsMap } from '../../theme/icons';
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

export default Button;

