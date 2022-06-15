import express from 'express'
import integrationDevicesBL from '../models/BL/integrationDevicesBL.js'

const router = express.Router()

// get all Devices
router.get('/', async (req, resp) => {

    let devices = await integrationDevicesBL.getAllIntegrationDevices()
    resp.status(201).send(devices)
})

export default router