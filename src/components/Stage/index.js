import React from 'react';

import { View, Text } from 'react-native';
import styles from './style';

function Stage({ title, children }) {
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>{ title }</Text>
            <View style={ styles.stage }>
                { children }
            </View>
        </View>
    );
}

Stage.propTypes = {
    title: React.PropTypes.string,
    children: React.PropTypes.node
};

export default Stage;
