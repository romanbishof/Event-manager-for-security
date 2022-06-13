import mongoose from "mongoose";

const physicalDeviceSchema = new mongoose.Schema({
    Id: String,
    DeviceId: Number,
    Name: String,
    SectionId: Number,
    SectionName: String,
    SectionStatus: Number,
    DeviceType: Number,
    Model: String,
    Prot: Number,
    Status: Number,
    Ip: String,
    Ver: String,
    DisconTime: String,
    ZoneId: Number,
    ZoneName: String,
    FacilityId: String,
    RsGroupName: String,
    RsName: String
})

let PhysicalDevices = mongoose.model('physicalDevices', physicalDeviceSchema)

export default PhysicalDevices