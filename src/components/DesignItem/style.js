import { StyleSheet } from 'react-native';
import { themeVariables } from '../../theme';
import colors from '../../theme/colors';
import { widthPercentage } from '../../lib/utils';

const designWidth = widthPercentage(35);
/* eslint-disable no-mixed-operators */
const itemHorizontalMargin = widthPercentage(1);
const itemWidth = designWidth + itemHorizontalMargin * 2;
const styleDesignItem = StyleSheet.create({
    container: {
        paddingHorizontal: itemHorizontalMargin
    },
    imageContainer: {
        backgroundColor: colors.white
    },
    image: {
        resizeMode: 'cover',
        backgroundColor: colors.gray
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6,
        paddingBottom: 0,
        backgroundColor: colors.white
    },
    text: themeVariables.title,
    save: {
        width: 20,
        height: 20
    }
});

const styleMore = StyleSheet.create({
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
        width: designWidth / 3,
        height: 2,
        backgroundColor: colors.black,
        marginVertical: 3
    },
    text: themeVariables.subTitle
});

export {
    styleDesignItem,
    styleMore,
    designWidth,
    itemWidth
};
