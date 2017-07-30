import {
    StyleSheet
} from 'react-native';
import { STATUSBAR_HEIGHT, widthPercentage, heightPercentage } from '../../lib/utils';
import { themeVariables } from '../../theme';

const CONTENT_HORIZONTAL_PADDING = 30;
const styleNav = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: STATUSBAR_HEIGHT,
        paddingVertical: 10,
        alignItems: 'center'
    },
    navTitle: themeVariables.title,
    buttons: {
        flexDirection: 'row'
    },
    button: {
        width: 30,
        height: 30,
    },
    buttonDisabled: {
        opacity: themeVariables.disabledOpacity
    },
    buttonRight: {
        marginLeft: 5
    }
});

const styleButton = StyleSheet.create({
    container: {
        borderWidth: 3
    },
    label: themeVariables.buttonText
});

const styleDesighDetail = StyleSheet.create({
    screen: {
        backgroundColor: themeVariables.bgTransparent,
    },
    container: {
        height: heightPercentage(90) - 20,
        marginHorizontal: widthPercentage(5) - 8, // 8 is Screen's margin
        backgroundColor: themeVariables.bgRegular
    },
    image: {
        opacity: 1,
        width: widthPercentage(90),
        height: widthPercentage(50),
        marginBottom: 30
    },
    content: {
        paddingHorizontal: CONTENT_HORIZONTAL_PADDING,
        paddingBottom: 50
    },
    contentTitleContainer: {
        marginBottom: CONTENT_HORIZONTAL_PADDING
    },
    contentTitle: themeVariables.headTitle,
    contentRight: {
        flex: 2,
        paddingLeft: 5
    },
    buttons: {
        position: 'absolute',
        width: widthPercentage(90),
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 50,
        paddingHorizontal: CONTENT_HORIZONTAL_PADDING,
    }
});

export {
    styleNav,
    styleDesighDetail,
    styleButton
};
