const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server
    , {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    }
);

io.on('connection', (socket) => {
    console.log('a user connected ' , socket.id);
})

io.on('disconnect', (socket) => {
    console.log('a user disconnected ' , socket.id);
})

module.exports = { app ,io , server };    