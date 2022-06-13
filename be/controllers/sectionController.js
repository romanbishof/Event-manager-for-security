import express from 'express'
import sectionsBL from '../models/BL/sectionsBL.js'

const router = express.Router()

// get all sections
router.get('/', async (req, resp) => {

    let sections = await sectionsBL.getAllSections()
    resp.status(201).send(sections)
})

export default router