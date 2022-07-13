import integrationDevices from '../data_temp/cloud_devices.json' assert {type: 'json'}
// import integrationDevicesBL from '../models/BL/integrationDevicesBL.js'

integrationDevices.forEach(async (obj) => {
    let temp = await integrationDevicesBL.addIntegrationDevice(obj)
})