import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import sectionsController from './controllers/sectionController.js'
import devicesController from './controllers/devicesController.js'
import physicalDevicesController from './controllers/physicalDevicesController.js'
import integrationDevicesController from './controllers/integrationDevicesController.js'

import './configs/subscriptionsDB.js'
// import './configs/sectionsColection.js'
// import './configs/devicesColection.js'
// import './configs/physicalDevicesColection.js'
// import './configs/integrationDevicesColection.js'
import './configs/integrationDeviceCollection.js'

const PORT = 8080;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())

app.get('/api/v1', (req, res) => {
    res.send('hello from BE for ISMS')
})

// set api for section collection
app.use('/api/v1/sections', sectionsController)

// set api for devices collection
app.use('/api/v1/devices', devicesController)

// set api for phsicalDevices collection
app.use('/api/v1/physicalDevices', physicalDevicesController)

// set api for integrationDevices collection
app.use('/api/v1/integrationDevices', integrationDevicesController)


app.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
})