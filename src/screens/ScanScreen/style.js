import { Platform, StyleSheet } from 'react-native';
import {
    Colors
} from 'react-native-ui-lib';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.red,
        ...Platform.select({
            ios: {
                paddingTop: 83
            }
        })
    },
    progressBar: {
        backgroundColor: Colors.white,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;
