import PropTypes from 'prop-types';
import { reduce, camelCase } from 'lodash';
import { Platform, NativeModules, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
const actionTypesMap = {};

export function createActionTypes({ types = [], namespace = '' }) {
    return types.reduce((result, type) => {
        if (!actionTypesMap[type]) {
            actionTypesMap[type] = `${namespace}_${type}`;
            result[type] = `${namespace}_${type}`; // eslint-disable-line no-param-reassign
            return result;
        }
        throw new Error(`This actionType ${type} already exits.`);
    }, {});
}

export function createActionCreator(actionTypes) {
    return reduce(actionTypes, (result, value, actionType) => ({
        ...result,
        [`${camelCase(actionType)}`]: payload => ({
            type: value,
            payload
        })
    }), {});
}

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export const widthPercentage = (percentage) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
};

export const heightPercentage = (percentage) => {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
};


export const stylePropType = PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]);
