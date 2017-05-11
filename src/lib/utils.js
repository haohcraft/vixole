import { reduce, camelCase } from 'lodash';

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
