import devices from '../data_temp/devices.json' assert {type: 'json'}
import devicesBL from '../models/BL/devicesBL.js'

devices.forEach(async (obj) => {

    let temp = await devicesBL.addDevices(obj)

})