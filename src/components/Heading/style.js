import { StyleSheet } from 'react-native';
import { themeVariables } from '../../theme';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    text: {
        ...themeVariables.headTitle
    },
    icon: {
        width: 30,
        height: 30
    }
});
