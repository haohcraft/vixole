import {
    StyleSheet,
    Dimensions
} from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');
export const sliderWidth = viewportWidth;
export default StyleSheet.create({
    container: {
        marginBottom: 30
    },
    slider: {
    },
    slideGroup: {
        flexDirection: 'column'
    },
    sliderContainer: {}
});
