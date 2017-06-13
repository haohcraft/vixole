import { createActionTypes } from '../../lib/utils';

export const API_REQUEST = '@API_REQUEST';

//
export const createAPIReducer = ({
    initialState = {},
    actionTypes
}) => {
    return (state = initialState, action = {}) => {
        switch (action.type) {
            case actionTypes.LOADING: {
                return {
                    ...state,
                    loaded: false,
                    loading: true,
                    error: null
                };
            }
            case actionTypes.LOADED: {
                const { apiResponse } = action.payload;
                return {
                    ...state,
                    data: apiResponse,
                    loaded: true,
                    loading: false,
                    error: null
                };
            }
            case actionTypes.ERROR: {
                const { apiResponse } = action.payload;
                return {
                    ...state,
                    data: null,
                    loaded: true,
                    loading: false,
                    error: apiResponse
                };
            }
            default:
                return state;
        }
    };
};

export const createAPIActionCreator = ({
    method,
    actionTypes,
    apiURL,
    apiData,
    postProcessor
}) => {
    return {
        type: API_REQUEST,
        payload: {
            method,
            steps: {
                loading: actionTypes.LOADING,
                success: actionTypes.LOADED,
                fail: actionTypes.ERROR
            },
            apiURL,
            apiData,
            postProcessor
        }
    };
};

//  To create an a hash map of API action types AKA LOADING, LOADED and ERROR
export const createAPIActionTypes = ({ namespace }) => {
    return createActionTypes({
        namespace,
        types: ['LOADING', 'LOADED', 'ERROR']
    });
};

// To make a fetch request
export const makeFetchRequest = ({
    url,
    method = 'GET',
    parameters = {}
}) => {
    return fetch(url, {
        method,
        ...parameters
    });
};

