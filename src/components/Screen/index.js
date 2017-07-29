import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8
    }
});

const Screen = props => (
    <View style={ styles.container } >
        { props.children }
    </View>
);

export default Screen;
