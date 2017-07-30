import { defaultThemeVariables } from '@shoutem/ui';
import Colors from './colors';

const textStyle = {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.black,
};
export const themeVariables = {
    ...defaultThemeVariables,

    // For non-shoutem part
    navTitle: {
        ...textStyle,
        fontWeight: 'bold',
        fontSize: 36,

    },
    buttonText: {
        ...textStyle,
        fontSize: 26
    },
    headTitle: {
        ...textStyle,
        fontSize: 24
    },
    title: {
        ...textStyle,
        fontSize: 12,
    },

    subTitle: {
        ...textStyle,
        fontSize: 10,
    },
    bgRegular: Colors.white,
    bgTransparent: Colors.transparent,
    disabledColor: Colors.gray,
    disabledOpacity: 0.2,


    featuredColor: Colors.dark10,
    backgroundColor: Colors.dark80,
    paperColor: Colors.white,
    shadowColor: Colors.dark10,

    heading: {
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: Colors.black,
        fontSize: 25,
    },
    subtitle: {
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: '#222222',
        fontSize: 15,
    },
    caption: {
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12,
        color: '#666666',
    },
    text: {
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        color: '#666666',
    },

    imageOverlayColor: Colors.rgba(0, 0, 0, 0.2),
    imageOverlayTextColor: Colors.white,
    tagOverlayColor: Colors.black,
    tagOverlayTextColor: Colors.white,

    navBarBackground: Colors.dark20,
    navBarBorderColor: Colors.dark50,
    navBarText: {
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: 'normal',
        color: Colors.white,
        fontSize: 15,
    },
    navBarIconsColor: Colors.dark10,
    featuredNavBarTitleColor: Colors.white,
    featuredNavBarIconsColor: Colors.rgba(255, 255, 255, 0.5),

    mainNavBackground: Colors.dark20,
    mainNavItemColor: Colors.rgba(50, 50, 50, 0.4),
    mainNavItemBackground: Colors.black,
    mainNavSelectedItemBackground: Colors.dark20,
    mainNavSelectedItemColor: Colors.white,
    mainNavSelectedItemBorderColor: Colors.dark40,
    mainNavBorderColor: Colors.dark10,

    subNavItemColor: Colors.dark50,
    subNavItemBackground: 'rgba(0, 0, 0, 0)',
    subNavListBorderColor: Colors.dark30,

    primaryButtonText: {
        fontFamily: 'Rubik-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        color: '#666666',
    },
    primaryButtonBackgroundColor: Colors.dark10,
    primaryButtonBorderColor: Colors.dark70,
    secondaryButtonTextColor: Colors.dark10,
    secondaryButtonBackgroundColor: Colors.rgba(255, 255, 255, 0.6),
    secondaryButtonBorderColor: Colors.rgba(255, 255, 255, 0.6),

    lineColor: Colors.dark30,
    sectionHeaderBackgroundColor: Colors.dark70,
};
