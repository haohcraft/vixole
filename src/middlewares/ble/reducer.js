import { pick } from 'lodash';
import { ActionTypes } from './actions';
import { BleStateMap } from './utils';

const initialState = {
    devicesMap: {},
    isScanning: false,
    bleState: BleStateMap.PoweredOn,
    selectedDevice: {
        isConnected: false,
        id: ''
    }
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
        case ActionTypes.REMOVE_DEVICE: {
            return {
                ...state,
                selectedDevice: {
                    ...initialState.selectedDevice,
                }
            };
        }
        case ActionTypes.ON_DISCONNECT_DEVICE: {
            return {
                ...state,
                selectedDevice: {
                    ...state.selectedDevice,
                    isConnected: false
                }
            };
        }
        case ActionTypes.UPDATE_SERVICES: {
            const { deviceId, services } = action.payload;
            return {
                ...state,
                selectedDevice: {
                    ...state.selectedDevice,
                    isConnected: true,
                    id: deviceId
                },
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
