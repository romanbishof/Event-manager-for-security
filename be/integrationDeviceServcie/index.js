import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server } from "socket.io";
import integrationDevicesController from './controllers/integrationDevicesController.js'
import './configs/subscriptionsDB.js'
import './configs/subscriptionExchangeRabbitMQ.js'
const PORT = 8080;

const appIntegrationDevice = express();
appIntegrationDevice.use(cors());
appIntegrationDevice.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())

const httpServer = createServer(appIntegrationDevice)
const io = new Server(httpServer, { cors: { origin: "*" } })
global.io = io

appIntegrationDevice.get('/api/v1', (req, res) => {
    res.send('hello from BE for ISMS')
})

// set api for integrationDevices collection
appIntegrationDevice.use('/api/v1/integrationDevices', integrationDevicesController)


httpServer.listen(PORT, () => {
    console.log(`the integrationDevice service is running on port ${PORT}`);
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id} `);

    socket.on("send_message", (data) => {
        socket.emit('receive_message', data)
    })

    socket.on('error', (err) => {
        console.log(' socket error in main servise error: ', err);
    })

    socket.on('disconnect', (reason) => {
        console.log(reason);
    })

});

// process.on('disconnect', () => {
//     console.log('trying to reconnect');

//     httpServer.listen(PORT, () => {
//         console.log(`the status service is running on port ${PORT}`);
//     })
// })