import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import integrationDevicesController from './controllers/integrationDevicesController.js'

import './configs/subscriptionsDB.js'
// import './configs/integrationDevicesColection.js'
import './configs/subscriptionExchangeRabbitMQ.js'


const PORT = 8080;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())

app.get('/api/v1', (req, res) => {
    res.send('hello from BE for ISMS')
})

// set api for integrationDevices collection
app.use('/api/v1/integrationDevices', integrationDevicesController)


app.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
})