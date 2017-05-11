import { pick } from 'lodash';
import { ActionTypes } from './actions';

const initialState = {
    devicesMap: {},
    isScanning: false,
    bleState: ''
};

const bleReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ActionTypes.UPDATE_STATE: {
            const { s } = action.payload;
            return {
                ...state,
                bleState: s
            };
        }
        case ActionTypes.START_SCAN: {
            return {
                ...state,
                isScanning: true
            };
        }
        case ActionTypes.STOP_SCAN: {
            return {
                ...state,
                isScanning: false
            };

        }
        case ActionTypes.DEVICE_FOUND: {
            const { device } = action.payload;
            return {
                ...state,
                devicesMap: {
                    ...state.devicesMap,
                    [device.id]: pick(device, ['id', 'name', 'serviceUUIDs'])
                }
            };
        }
        case ActionTypes.UPDATE_SERVICES: {
            const { deviceId, services } = action.payload;
            return {
                ...state,
                devicesMap: {
                    ...state.devicesMap,
                    [deviceId]: {
                        ...state.devicesMap[deviceId],
                        services
                    }
                }
            };
        }
        default:
            return state;
    }
};

export default bleReducer;
