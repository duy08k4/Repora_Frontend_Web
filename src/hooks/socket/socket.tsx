//  Import libraries
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// Import Socket
import { io, Socket } from "socket.io-client";

// Import interface
import type { interface__socketContext, interface__socketProviderProps } from "../../type/interface__Socket";

// Import redux
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

// Import custom
import { useCache } from "../cache/cache";
import { cacheAddAnotherStaffLocation } from "../../redux/reducers/staffLocation.reducer";

const SocketContext = createContext<interface__socketContext | undefined>(undefined);

export const useSocket = (): interface__socketContext => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export const SocketProvider: React.FC<interface__socketProviderProps> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null);

    //   Redux

    const { cacheSetData } = useCache()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_GATE, {
            transports: ["websocket"],
            withCredentials: true,
            reconnection: false
        });

        socketRef.current = socket;

        // Listener socket server
        socket.on("receiveLocation", (data) => {

            console.log(data)
            const sender = data.from
            const senderLocation = data.location

            cacheSetData(cacheAddAnotherStaffLocation({ targetStaffGmail: sender, targetStaffLocation: senderLocation }))
        })


        // Cleanup when component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    );
};
