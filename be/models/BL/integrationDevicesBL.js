import IntegrationDevices from "../Schemas/integrationDevicesSchema.js";

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

let getAllIntegrationDevices = () => {

    return new Promise((resolve, reject) => {
        Devices.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

export default { addIntegrationDevice, getAllIntegrationDevices }