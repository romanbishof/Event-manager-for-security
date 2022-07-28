import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server } from "socket.io";
import './rabbitMQ/statusSubscription.js'
const PORT = 8082;

const appStatus = express();
appStatus.use(cors());
appStatus.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())

const httpServer = createServer(appStatus)
const io = new Server(httpServer, { cors: { origin: "*" } })
global.io = io

appStatus.get('/api/v1', (req, res) => {
    res.send('Hello from status service for ISMS')
})

httpServer.listen(PORT, () => {
    console.log(`the status service is running on port ${PORT}`);
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

process.on('disconnect', () => {
    console.log('trying to reconnect');
    httpServer.listen(PORT, () => {
        console.log(`the status service is running on port ${PORT}`);
    })

    // process.reconnect();
})


