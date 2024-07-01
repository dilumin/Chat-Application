const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const DB = require('../model/friends');
const jwt = require('jsonwebtoken');
//to get env for the jwts secret
const path = require('path');
const messageDB = require('../model/messages');
require('dotenv').config( {path:path.resolve(__dirname,'../.env')})

const app = express();
const server = http.createServer(app);
const io = new Server(server
    , {
        cors: {
            
            origin: "https://chat-application-phi-two.vercel.app",

            // origin: "http://localhost:3000",
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
                console.log("TOKEN EXPIRED from socket" , err)
                socket.emit('authError', { msg: 'Token is not valid', authFailed: "403" }); // Send error to client
                socket.disconnect()
                return;
                // return res.status(403).json({ msg: 'Token is not valid  in socketIO' , authFailed:"403" }); //403 is the status code for forbidden ,invalid token                
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
            addFriendRequest(email, friendEmail);
            socket.to(userSocketMap[friendEmail]).emit('friendRequest', { email });
        }
    })
    
    socket.on('messaging', ({ sender, receiver, message }) => {
        console.log(`Message from ${sender} to ${receiver}: ${message}`);
        
        // Optionally, save the message to the database here
        const saveMessage = async ()=>{
            await messageDB.AddMsgToDb(sender, receiver, message);
        }
        saveMessage();
    
        if (userSocketMap[receiver]) {
          socket.to(userSocketMap[receiver]).emit('newMessage', { sender, message });
        } else {
          console.log('Receiver is offline');
          // Optionally, handle storing unsent messages for later delivery
        }
      });






    socket.on("disconnect", ()=> {
        console.log("User disconnected", socket.id)   
        delete userSocketMap[email]
    })

})

io.on('disconnect', (socket) => {
    console.log('a user disconnected ' , socket.id);
})

module.exports = { app ,io , userSocketMap , server };    