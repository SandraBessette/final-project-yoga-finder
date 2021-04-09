import React, { useCallback } from "react";
import io from "socket.io-client";

let socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);

export const SocketContext = React.createContext(null);

export const SocketProvider = ({ children }) => {
    const handleSocketJoinEvent = useCallback((userId) => {
        socket.emit("join", { _id: userId });
    }, []);

    const handleSocketLogOutEvent = useCallback((userId) => {
        socket.emit("logout", { _id: userId });
    }, []);

    return (
        <SocketContext.Provider
            value={{
                socket,
                handleSocketJoinEvent,
                handleSocketLogOutEvent,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
