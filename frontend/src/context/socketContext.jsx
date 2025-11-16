import { io } from 'socket.io-client';
import { useState, useEffect, createContext, useContext } from 'react';

const SOCKET_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4001';

const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(`${SOCKET_URL}/notifications`, {
            withCredentials: true,
        });

        newSocket.on('connect', () => {
            console.log(`Connected to Socket`);
        });

        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
                console.log('Socket disconnected');
            }
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);