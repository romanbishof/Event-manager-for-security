import express from 'express'
import integrationDevicesBL from '../models/BL/integrationDevicesBL.js'

const router = express.Router()

// get all Devices
router.get('/', async (req, resp) => {

    let devices = await integrationDevicesBL.getAllIntegrationDevices()
    resp.status(201).send(devices)
})

// update location of device
router.put('/updateLocation', async (req, resp) => {
    // let {Id} = req.params
    let body = req.body
    let updateDeviceLocation = await integrationDevicesBL.updateDeviceLocation(body.id, body)
    resp.status(201).send(updateDeviceLocation)
})

export default router