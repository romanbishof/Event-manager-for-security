import mongoose from "mongoose"

const integrationDevicesSchema = new mongoose.Schema({
    IsSensor: Boolean,
    IsFieldDevice: Boolean,
    Type: Number,
    Family: Number,
    SyncType: Number,
    LinkedObjectId: String,
    LocationX: {
        type: Number,
        default: 0
    },
    LocationY: {
        type: Number,
        default: 0
    },
    ImplementationClassType: Number,
    HasLocation: Boolean,
    Id: String,
    Name: String,
    ParentObjectId: String,
    ComponentManagerId: String,
    ImportanceLevel: Number,
})

let IntegrationDevices = mongoose.model('integration_Devices', integrationDevicesSchema)

export default IntegrationDevices 