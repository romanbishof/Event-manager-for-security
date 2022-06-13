import section from '../data_temp/sections_and_zones.json' assert { type: 'json' };
import sectionsBL from '../models/BL/sectionsBL.js'

section.forEach(async (obj) => {

    let temp = await sectionsBL.addSection(obj)

})
