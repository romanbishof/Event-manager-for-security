import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server } from "socket.io";
import './rabbitMQ/eventSubscription.js'
const PORT = 8081;

const appEvent = express();
appEvent.use(cors());
appEvent.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json())

const httpServer = createServer(appEvent)
const io = new Server(httpServer, { cors: { origin: "*" } })
global.io = io

appEvent.get('/api/v1', (req, res) => {
    res.send('Hello from event service for ISMS')
})

httpServer.listen(PORT, () => {
    console.log(`the event service is running on port ${PORT}`);
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id} `);

    socket.on('Error', () => {
        console.log(' socket error in main servise error ');
    })

});



