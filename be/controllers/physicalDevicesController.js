import express from 'express'
import physicalDevicesBL from '../models/BL/physicalDevicesBL.js'

const router = express.Router()

// get all physical devices
router.get('/', async (req, resp) => {

    let physicalDevices = await physicalDevicesBL.getAllPhysicalDevices()
    resp.send(physicalDevices)
})

export default router