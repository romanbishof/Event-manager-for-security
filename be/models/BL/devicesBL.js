import Devices from '../Schemas/devicesSchema.js'

// add device
let addDevices = (devices) => {

    return new Promise((resolve, reject) => {

        let newDevices = new Devices({
            Id: devices.Id,
            PhysicalDeviceId: devices.PhysicalDeviceId,
            Name: devices.Name,
            SectionId: devices.SectionId,
            SectionName: devices.SectionStatus,
            SectionStatus: devices.SectionStatus,
            DeviceType: devices.DeviceType,
            Model: devices.Model,
            Status: devices.Status,
            Value: devices.Value,
            DisconTime: devices.DisconTime,
            Ip: devices.Ip,
            IsPtzSupported: devices.IsPtzSupported,
            RecordStatus: devices.RecordStatus,
            AlarmCount: devices.AlarmCount,
            ArmLevel: devices.ArmLevel,
            IsUse: devices.IsUse,
            ZoneId: devices.ZoneId,
            ZoneName: devices.ZoneName
        })

        newDevices.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// get all devices
let getAllDevices = () => {

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

export default { addDevices, getAllDevices } 