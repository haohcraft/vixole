/* eslint-disable no-unused-vars */
import keyMirror from 'keymirror';
import React from 'react';
import { Linking, Alert } from 'react-native';

export async function fetchServicesAndCharacteristicsForDevice(device) { // eslint-disable-line
    const servicesMap = {};
    const services = await device.services();
    for (let service of services) { // eslint-disable-line
        const characteristicsMap = {};
        const characteristics = await service.characteristics(); // eslint-disable-line
        if (characteristics && characteristics.length) {
            for (let c of characteristics) { // eslint-disable-line
                characteristicsMap[c.uuid] = {
                    uuid: c.uuid,
                    isReadable: c.isReadable,
                    isWritable: c.isWritableWithResponse,
                    isNotifiable: c.isNotifiable,
                    isNotifying: c.isNotifying,
                    value: c.value
                };
            }
        }
        servicesMap[service.uuid] = {
            uuid: service.uuid,
            isPrimary: service.isPrimary,
            characteristicsCount: characteristics.length,
            characteristics: characteristicsMap
        };
    }
    return servicesMap;
}

export const BleStateMap = keyMirror({
    Unknown: null,
    PoweredOn: null,
    PoweredOff: null
});

export const askForSwitchOnBle = () => {
    Alert.alert(
        'Turn On Bluetooth to Allow "VIXOLE" to Connect to Accessories', '',
        [
            {
                text: 'Settings', onPress: () => Linking.openURL('App-Prefs:root=Bluetooth')
            }, {
                text: 'OK'
            }
        ]
    );
};
