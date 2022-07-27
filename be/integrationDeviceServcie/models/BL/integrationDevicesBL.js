import IntegrationDevices from "../Schemas/integrationDevicesSchema.js";

// add new integrated deice to DB
let addIntegrationDevice = (device) => {

    return new Promise((resolve, reject) => {

        IntegrationDevices.findOneAndUpdate({ "Id": device.Id },
            {
                IsSensor: device.IsSensor,
                IsFieldDevice: device.IsFieldDevice,
                Type: device.Type,
                Family: device.Family,
                SyncType: device.SyncType,
                LinkedObjectId: device.LinkedObjectId,
                // LocationX: device.LocationX,
                // LocationY: device.LocationY,
                ImplementationClassType: device.ImplementationClassType,
                // HasLocation: device.HasLocation,
                Id: device.Id,
                Name: device.Name,
                ParentObjectId: device.ParentObjectId,
                ComponentManagerId: device.ComponentManagerId,
                ImportanceLevel: device.ImportanceLevel,
            },
            {
                upsert: true,
                new: true,
            },
            ((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        )
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
let updateDeviceLocation = (deviceObj) => {

    return new Promise((resolve, reject) => {
        let location = false
        if (deviceObj.coordinates.lat !== 0) {

            location = true
        } else {
            location = false
        }
        IntegrationDevices.findOneAndUpdate({ "Id": deviceObj.id }, {
            LocationX: deviceObj.coordinates.lat,
            LocationY: deviceObj.coordinates.lng,
            HasLocation: location,
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