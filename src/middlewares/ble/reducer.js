import { pick } from 'lodash';
import { ActionTypes } from './actions';

const initialState = {
    devicesMap: {
        // "0" : { name: "Good", id: '0', rssi: -50, isConnectable: true, serviceUUIDs: [] },
        // "1" : { name: "Bad", id: '0', rssi: -90, isConnectable: true, serviceUUIDs: [] },
        // "2" : { name: "Bad", id: '0', rssi: -90, isConnectable: true, serviceUUIDs: [] },
        // "3" : { name: "Bad", id: '0', rssi: -90, isConnectable: true, serviceUUIDs: [] },
        // "4" : { name: "Bad", id: '0', rssi: -90, isConnectable: true, serviceUUIDs: [] },
        // "5" : { name: "Bad", id: '0', rssi: -90, isConnectable: true, serviceUUIDs: [] },
        // "6" : { name: "Good", id: '0', rssi: -40, isConnectable: true, serviceUUIDs: [] },
        // "7" : { name: "Good", id: '0', rssi: -30, isConnectable: true, serviceUUIDs: [] }
    },
    isScanning: false
};

const bleReducer = (state = initialState, action = {}) => {
    switch (action.type) {
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
