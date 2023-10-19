"use client";

import { useSocket } from "../providers/socket-provider";
import {Badge} from "../ui/badge";

export const SocketIndicator = () => {
    const { socket, isConnected } = useSocket();
    if (!isConnected) {
        return(
        <Badge variant="outline" className="bg-rose-500 text-white border-none">
            Offline
        </Badge>)
    }
    return(
        <Badge variant="outline" className="bg-emerald-500 text-white border-none">
            Online
        </Badge>)
    
}