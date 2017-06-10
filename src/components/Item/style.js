import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = {
    footer: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        bottom: 0,
        left: 0
    },
    iconHeart: {
        color: 'white',
        padding: 10,
        paddingBottom: 5
    }
};

export default styles;