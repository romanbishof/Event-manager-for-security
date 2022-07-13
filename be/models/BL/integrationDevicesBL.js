import IntegrationDevices from "../Schemas/integrationDevicesSchema.js";

// add new integrated deice to DB
let addIntegrationDevice = (device) => {

    return new Promise((resolve, reject) => {
        let newIntegrationDevice = new IntegrationDevices({
            IsSensor: device.IsSensor,
            IsPhysicalDevice: device.IsPhysicalDevice,
            IsFieldDevice: device.IsFieldDevice,
            Type: device.Type,
            Family: device.Family,
            SyncType: device.SyncType,
            LinkedObjectId: device.LinkedObjectId,
            LocationX: device.LocationX,
            LocationY: device.LocationY,
            ImplementationClassType: device.ImplementationClassType,
            HasLocation: device.HasLocation,
            Id: device.Id,
            Name: device.Name,
            ParentObjectId: device.ParentObjectId,
            ComponentManagerId: device.ComponentManagerId,
            ImportanceLevel: device.ImportanceLevel,
        })

        newIntegrationDevice.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })

}

// get All the integraated Devices from DB
let getAllIntegrationDevices = () => {

    return new Promise((resolve, reject) => {
        IntegrationDevices.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// update integrated Device location id DB
let updateDeviceLocation = (id, deviceObj) => {

    return new Promise((resolve, reject) => {
        IntegrationDevices.findOneAndUpdate({ "Id": id }, {
            LocationX: deviceObj.coordinates.lat,
            LocationY: deviceObj.coordinates.lng
        }, (err, data) => {
            if (err) {
                reject(err)
                console.log(`Diden't manadged to update Location for ${data.Name}`);
            } else {
                resolve(deviceObj)
                console.log(`Location for ${data.Name}, ID: ${data.Id} successfully update`);
            }
        })
    })
}

export default { addIntegrationDevice, getAllIntegrationDevices, updateDeviceLocation }