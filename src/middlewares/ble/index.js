import { get, startsWith } from 'lodash';
import { BleManager } from 'react-native-ble-plx';

import actions, { BLE, ActionTypes } from './actions';
import {
    fetchServicesAndCharacteristicsForDevice,
    askForSwitchOnBle
} from './utils';

let manager = null;

const bleMiddleware = ({ getState, dispatch }) => next => (action) => {
    // If BLE related actions.
    if (startsWith(action.type, BLE)) {

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
                    manager.connectToDevice(selectedDeviceId)
                        .then(device => device.discoverAllServicesAndCharacteristics())
                        .then(device => fetchServicesAndCharacteristicsForDevice(device))
                        .then(services => dispatch(actions.updateServices({
                            deviceId: selectedDeviceId,
                            services
                        })), (rejected) => {
                            console.log('Connect failed: ', rejected.message); // eslint-disable-line
                            dispatch(actions.onDisconnectDevice());
                        });

                    manager.onDeviceDisconnected(
                        selectedDeviceId, () => dispatch(actions.onDisconnectDevice())
                    );
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
                            askForSwitchOnBle();
                        } else if (device.id === selectedDeviceId) {
                            manager.stopDeviceScan();
                            device.connect()
                                .then(d => d.discoverAllServicesAndCharacteristics())
                                .then(d => fetchServicesAndCharacteristicsForDevice(d))
                                .then(services => dispatch(actions.updateServices({
                                    deviceId: device.id,
                                    services
                                })), (rejected) => {
                                    console.log('Connect failed: ', rejected.message); // eslint-disable-line
                                    dispatch(actions.onDisconnectDevice());
                                });

                            manager.onDeviceDisconnected(
                                device.id, () => dispatch(actions.onDisconnectDevice())
                            );
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
