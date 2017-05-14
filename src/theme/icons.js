/* eslint-disable new-cap */
// From https://gist.github.com/dropfen/4a2209d7274788027f782e8655be198f
import { PixelRatio } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const navIconSize = (__DEV__ === false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    'ios-person': [30],
    'ios-image': [30],
    'ios-search': [30],
    'ios-arrow-round-down': [navIconSize],
    'ios-close': [40]
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
    new Promise.all(
        Object.keys(icons).map(iconName =>
        // IconName--suffix--other-suffix is just the mapping name in iconsMap
        Ionicons.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1]
        ))
    ).then((sources) => {
        Object.keys(icons)
        .forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));

        // Call resolve (and we are done)
        resolve(true);
    });
});

export {
    iconsMap,
    iconsLoaded
};
