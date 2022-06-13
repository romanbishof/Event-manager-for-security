import PhysicalDevices from '../Schemas/physicalDevicesSchema.js'

// add physical device to db
let addPhysicalDevices = (physicalDevices) => {

    return new Promise((resolve, reject) => {
        let newPhysicalDevices = new PhysicalDevices({
            Id: physicalDevices.Id,
            DeviceId: physicalDevices.DeviceId,
            Name: physicalDevices.Name,
            SectionId: physicalDevices.SectionId,
            SectionName: physicalDevices.SectionName,
            SectionStatus: physicalDevices.SectionStatus,
            DeviceType: physicalDevices.DeviceType,
            Model: physicalDevices.Model,
            Prot: physicalDevices.Prot,
            Status: physicalDevices.Status,
            Ip: physicalDevices.Ip,
            Ver: physicalDevices.Ver,
            DisconTime: physicalDevices.DisconTime,
            ZoneId: physicalDevices.ZoneId,
            ZoneName: physicalDevices.ZoneName,
            FacilityId: physicalDevices.FacilityId,
            RsGroupName: physicalDevices.RsGroupName,
            RsName: physicalDevices.RsName
        })

        newPhysicalDevices.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })

    })

}

// get all physical devices from DB
let getAllPhysicalDevices = () => {
    return new Promise((resolve, reject) => {
        PhysicalDevices.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

export default { addPhysicalDevices, getAllPhysicalDevices } 