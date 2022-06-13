import express from 'express'
import devicesBl from '../models/BL/devicesBL.js'

const router = express.Router()

// get all Devices
router.get('/', async (req, resp) => {

    let devices = await devicesBl.getAllDevices()
    resp.status(201).send(devices)
})

export default router