// From https://github.com/wix/react-native-ui-lib/blob/master/src/style/colors.js
import _ from 'lodash';


class Colors {
    black = '#000000';
    gray = '#cccccc';
    gray10 = '#999999';
    gray20 = '#666666';
    link = '#0366d6';
    white = '#ffffff';

    transparent = this.rgba(255, 255, 255, 0.9);

    /**
    * Load custom set of colors
    * arguments:
    * colors - map of keys and colors values e.g {dark10: '#20303C', dark20: '#43515C'}
    */
    loadColors(colors) {
        _.forEach(colors, (value, key) => {
            this[key] = value;
        });
    }

    /**
    * Add alpha to hex or rgb color
    * arguments:
    * p1 - hex color / R part of RGB
    * p2 - opacity / G part of RGB
    * p3 - B part of RGB
    * p4 - opacity
    */
    rgba(p1, p2, p3, p4) {
        let hex;
        let opacity;
        let red;
        let green;
        let blue;

        if (arguments.length === 2) {
            hex = p1;
            opacity = p2;

            hex = validateHex(hex);
            red = parseInt(hex.substring(0, 2), 16);
            green = parseInt(hex.substring(2, 4), 16);
            blue = parseInt(hex.substring(4, 6), 16);
        } else if (arguments.length === 4) {
            red = validateRGB(p1);
            green = validateRGB(p2);
            blue = validateRGB(p3);
            opacity = p4;
        } else {
            throw new Error('rgba can work with either 2 or 4 arguments');
        }

        return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    }
}

function validateRGB(value) {
    if (isNaN(value) || value > 255 || value < 0) {
        throw new Error(`${value} is invalid rgb code, please use number between 0-255`);
    }

    return value;
}

function validateHex(value) {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
        throw new Error(`${value} is invalid hex color`);
    }
    return value.replace('#', '');
}

export default new Colors();
