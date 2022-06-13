import Sections from '../Schemas/sectionsSchema.js'


// add new section
let addSection = (section) => {
    return new Promise((resolve, reject) => {

        let zones = section.ZoneList.Zones

        let newSection = new Sections({
            ZoneList: {
                Zones: zones
            },
            Id: section.Id,
            Name: section.Name,
            ParentId: section.ParentId,
            AlarmCount: section.AlarmCount,
            AlarmLevel: section.AlarmLevel,
            ScIp: section.ScIp,
            ScPort: section.ScPort,
            Status: section.Status,
            AuthId: section.AuthId,
            AuthPwd: section.AuthPwd,
            TemplateId: section.TemplateId,
            SecurityMode: section.SecurityMode,
            ScModel: section.ScModel,
            MapDevices: []
        })

        newSection.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })

    })
}

// get all sections
let getAllSections = () => {

    return new Promise((resolve, reject) => {
        Sections.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

export default { addSection, getAllSections } 