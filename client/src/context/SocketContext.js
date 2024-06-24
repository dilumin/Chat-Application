import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { Auth } = useContext(AuthContext);

    useEffect(() => {
        if (Auth?.accessToken) {
            const newSocket = io('http://localhost:3500', {
                auth: {
                    accessToken:localStorage.getItem('accessToken')|| "",
                },
            });

            newSocket.on('connect', () => {
                console.log('Socket connected');
            });

            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
                setOnlineUsers([]);
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
                setSocket(null);
                setOnlineUsers([]);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
                setOnlineUsers([]);
            }
        }
    }, [Auth?.accessToken]); // Dependency array includes Auth.accessToken

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
