import mongoose from "mongoose";

// const zonesSchema = new mongoose.Schema({
//     Id: Number,
//     Name: String,
//     AlarmCount: Number,
//     AlarmLevel: Number
// })

const sectionsSchema = new mongoose.Schema({
    ZoneList: {
        Zones: {} // any kind of obj || array || Mixed
    },
    Id: Number,
    Name: String,
    ParentId: Number,
    AlarmCount: Number,
    AlarmLevel: Number,
    ScIp: String,
    ScPort: String,
    Status: Number,
    AuthId: String,
    AuthPwd: String,
    TemplateId: Number,
    SecurityMode: Number,
    ScModel: String,
    MapDevices: []
}, {
    strict: false
})

let Sections = mongoose.model('sections', sectionsSchema)

export default Sections