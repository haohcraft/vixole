import { get, startsWith } from 'lodash';
import { BleManager } from 'react-native-ble-plx';

import actions, { BLE, ActionTypes } from './actions';
import {
    fetchServicesAndCharacteristicsForDevice,
    askForSwitchOnBle,
    BleStateMap
} from './utils';

let manager = null;
const deviceDisconnectListeners = {};
const keepBleOn = (action, bleState) => {
    switch (action.type) {
        case ActionTypes.START_SCAN:
        case ActionTypes.STOP_SCAN:
        case ActionTypes.CONNECT_DEVICE:
        case ActionTypes.RE_CONNECT_DEVICE:
        case ActionTypes.REMOVE_DEVICE:
        case ActionTypes.DISCONNECT_DEVICE:
        case ActionTypes.WRITE_DEVICE: {
            if (bleState !== BleStateMap.PoweredOn) {
                askForSwitchOnBle();
                return false;
            }
            break;
        }
        default: {
            return true;
        }
    }
    return true;
};

const bleMiddleware = ({ getState, dispatch }) => next => (action) => {
    // To connect the device with the ID
    const connectToDevice = (deviceId) => {
        if (manager) {
            manager.connectToDevice(deviceId)
                .then(d => d.discoverAllServicesAndCharacteristics())
                .then(d => fetchServicesAndCharacteristicsForDevice(d))
                .then(services => dispatch(actions.updateServices({
                    deviceId,
                    services
                })), (rejected) => {
                    console.log('Connect failed: ', rejected.message); // eslint-disable-line
                    dispatch(actions.onDisconnectDevice());
                });
            // To avoid the case where multiple listeners set on the same device
            if (!deviceDisconnectListeners[deviceId]) {
                deviceDisconnectListeners[deviceId] = true;
                manager.onDeviceDisconnected(
                    deviceId, () => dispatch(actions.onDisconnectDevice())
                );
            }
        }
    };
    const bleState = get(getState(), 'ble.bleState');
    // If BLE related actions.
    if (startsWith(action.type, BLE) && keepBleOn(action, bleState)) {
        switch (action.type) {
            case ActionTypes.CHECK_STATE: {
                if (!manager) {
                    manager = new BleManager();
                    manager.onStateChange((s) => {
                        dispatch(actions.updateState({ s }));
                    });
                }
                break;
            }
            case ActionTypes.CREATE_BLE: {
                if (!manager) {
                    manager = new BleManager();
                }
                break;
            }
            case ActionTypes.DESTROY_BLE: {
                if (manager) {
                    manager.destroy();
                    manager = null;
                }
                break;
            }
            case ActionTypes.START_SCAN: {
                manager.startDeviceScan(null, null, (error, device) => {
                    if (error) {
                        manager.stopDeviceScan();
                    } else {
                        dispatch(actions.deviceFound({ device }));
                    }
                });
                break;
            }
            case ActionTypes.STOP_SCAN: {
                manager.stopDeviceScan();
                break;
            }
            case ActionTypes.CONNECT_DEVICE: {
                const { selectedDeviceId } = action.payload;
                const isScanning = get(getState(), 'ble.isScanning');
                if (isScanning) {
                    dispatch(actions.stopScan());
                }
                if (selectedDeviceId && selectedDeviceId.length) {
                    connectToDevice(selectedDeviceId);
                }
                break;
            }
            case ActionTypes.RE_CONNECT_DEVICE: {
                const selectedDeviceId = action.payload.selectedDeviceId;
                if (selectedDeviceId && selectedDeviceId.length) {
                    // Note: To startDeviceScan by the deviceId does not work, so have to scan blindly first
                    manager.startDeviceScan([], null, (error, device) => {
                        if (error && error.code === 102) {
                            manager.stopDeviceScan();
                        } else if (device.id === selectedDeviceId) {
                            manager.stopDeviceScan();
                            connectToDevice(selectedDeviceId);
                        }
                    });
                }
                break;
            }
            case ActionTypes.REMOVE_DEVICE:
            case ActionTypes.DISCONNECT_DEVICE: {
                const { deviceId } = action.payload;
                manager.isDeviceConnected(deviceId)
                    .then((isConnected) => {
                        if (isConnected) {
                            manager.cancelDeviceConnection(deviceId)
                                .then(() => dispatch(actions.onDisconnectDevice()));
                        }
                    });
                break;
            }
            case ActionTypes.WRITE_DEVICE: {
                const { deviceId, serviceId, characteristicId, value } = action.payload;
                const bufferedValue = new Buffer(value).toString('base64');
                manager.writeCharacteristicWithoutResponseForDevice(
                        deviceId,
                        serviceId,
                        characteristicId,
                        bufferedValue
                    )
                    .then((characteristic) => {
                        dispatch(actions.writeDeviceSuccess({ value: characteristic.value }));
                    }, (reject) => {
                        dispatch(actions.writeDeviceFailed({ reject }));
                    });
                break;
            }
            default: {
                break;
            }
        }
    }
    return next(action);
};

export default bleMiddleware;
