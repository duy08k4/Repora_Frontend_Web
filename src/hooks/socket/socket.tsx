//  Import libraries
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// Import Socket
import { io, Socket } from "socket.io-client";

// Import interface
import type {  interface__socketContext, interface__socketProviderProps } from "../../type/interface__Socket";

// Import redux
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

// Import custom
import { useCache } from "../cache/cache";

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

    

    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    );
};
