import pysicalDevices from '../data_temp/physical_devices.json' assert {type: 'json'}
import physicalDevicesBL from '../models/BL/physicalDevicesBL.js'

pysicalDevices.forEach(async (obj) => {

    let temp = await physicalDevicesBL.addPhysicalDevices(obj)

})