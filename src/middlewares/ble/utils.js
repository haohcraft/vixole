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
