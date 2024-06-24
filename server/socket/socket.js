const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const DB = require('../model/friends');
const jwt = require('jsonwebtoken');
//to get env for the jwts secret
const path = require('path');
require('dotenv').config( {path:path.resolve(__dirname,'../.env')})

const app = express();
const server = http.createServer(app);
const io = new Server(server
    , {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    }
);

const userSocketMap = {}; //email , socketID

io.on('connection', (socket) => {
    console.log('a user connected ' , socket.id);

    const accessToken = socket.handshake.auth.accessToken;
    let email = "undefined";

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("TOKEN EXPIRED" , err)
                return res.status(403).json({ msg: 'Token is not valid  in socketIO' , authFailed:"403" }); //403 is the status code for forbidden ,invalid token                
            }
            console.log("TOKEN OKAY" );
            email = decoded.email;
        }
    )
    console.log("Email is ", email);
    
    if (email != "undefined" ){
        userSocketMap[email] = socket.id;
    }

    const addFriendRequest = async (email, friendEmail) => {
         await DB.friendRequestSent(email, friendEmail);
    }

    socket.on('sendFriendRequest', ({ email: friendEmail }) => {
        console.log("Friend Request to ", friendEmail);

        if (!userSocketMap[friendEmail]) {
            console.log("Friend is offline");
            addFriendRequest(email, friendEmail);
            return;
        }else{
            socket.to(userSocketMap[friendEmail]).emit('friendRequest', { email });
        }
    })




    socket.on("disconnect", ()=> {
        console.log("User disconnected", socket.id)   
        delete userSocketMap[email]
    })

})

io.on('disconnect', (socket) => {
    console.log('a user disconnected ' , socket.id);
})

module.exports = { app ,io , server };    