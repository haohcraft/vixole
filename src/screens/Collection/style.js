import {
    StyleSheet
} from 'react-native';
import { themeVariables } from '../../theme';
import colors from '../../theme/colors';
import { widthPercentage } from '../../lib/utils';

const designWidth = widthPercentage(35);
const styleEmptyState = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: designWidth,
        height: designWidth,
        backgroundColor: colors.gray
    },
    divideContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: designWidth,
    },
    divide: {
        width: designWidth / 2,
        height: 2,
        backgroundColor: colors.black,
        marginVertical: 3
    },
    text: themeVariables.subTitle
});

export {
    styleEmptyState
};
