import { createActionTypes, createActionCreator } from '../../lib/utils';

export const BLE = 'BLE';

// Will generate actionTypes, like `BLE_START_SCAN`.
export const ActionTypes = createActionTypes({
    namespace: BLE,
    types: [
        'CHECK_STATE',
        'UPDATE_STATE',
        'CREATE_BLE',
        'DESTROY_BLE',
        'START_SCAN',
        'STOP_SCAN',
        'DEVICE_FOUND',
        'CONNECT_DEVICE',
        'RE_CONNECT_DEVICE',
        'DISCONNECT_DEVICE',
        'ON_DISCONNECT_DEVICE',
        'REMOVE_DEVICE',
        'UPDATE_SERVICES',
        'WRITE_DEVICE',
        'WRITE_DEVICE_SUCCESS',
        'WRITE_DEVICE_FAILED'
    ]
});

export default {
    ...createActionCreator(ActionTypes)
};
