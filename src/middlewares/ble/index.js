import { get, startsWith } from 'lodash';
import { BleManager } from 'react-native-ble-plx';

import actions, { BLE, ActionTypes } from './actions';
import {
    fetchServicesAndCharacteristicsForDevice
} from './utils';

let manager = null;

const bleMiddleware = ({ getState, dispatch }) => next => (action) => {
    // If BLE related actions.
    if (startsWith(action.type, BLE)) {

        switch (action.type) {
            case ActionTypes.CHECK_STATE: {
                if (!manager) {
                    manager = new BleManager();
                }
                manager.onStateChange((s) => {
                    dispatch(actions.updateState({ s }));
                });
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
                        })));
                }
                break;
            }
            case ActionTypes.DISCONNECT_DEVICE: {
                const { deviceId } = action.payload;
                manager.cancelDeviceConnection(deviceId)
                    .then(() => dispatch(actions.onDisconnectDevice()));
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
