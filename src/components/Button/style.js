import { StyleSheet } from 'react-native';
import { themeVariables } from '../../theme';
import colors from '../../theme/colors';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: colors.black
    },
    label: {
        ...themeVariables.title
    },
    icon: {
        width: 30,
        height: 30
    }
});
