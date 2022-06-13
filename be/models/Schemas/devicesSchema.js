import mongoose from "mongoose";

const devicesSchema = new mongoose.Schema({
    Id: String,
    PhysicalDeviceId: String,
    Name: String,
    SectionId: Number,
    SectionName: String,
    SectionStatus: Number,
    DeviceType: Number,
    Model: String,
    Status: Number,
    Value: Number,
    DisconTime: String,
    Ip: String,
    IsPtzSupported: String,
    RecordStatus: String,
    AlarmCount: String,
    ArmLevel: String,
    IsUse: String,
    ZoneId: Number,
    ZoneName: String
})

let Devices = mongoose.model('devices', devicesSchema)

export default Devices