import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server } from "socket.io";
import integrationDevicesController from './controllers/integrationDevicesController.js'
import './configs/subscriptionsDB.js'
// import './configs/integrationDevicesColection.js'
import './configs/subscriptionExchangeRabbitMQ.js'
const PORT = 8080;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())

const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: "*" } })
global.io = io

app.get('/api/v1', (req, res) => {
    res.send('hello from BE for ISMS')
})

// set api for integrationDevices collection
app.use('/api/v1/integrationDevices', integrationDevicesController)


httpServer.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id} `);

    socket.on("send_message", (data) => {
        socket.emit('receive_message', data)
    })

    socket.on('Error', () => {
        console.log('error ');
    })

});
