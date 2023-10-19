import { Server as IOServer } from "socket.io";
import { NextApiRequest } from "next";
import { Server as HTTPServer } from "http";
import { NextApiResponseServerIo } from "@/types";

export const config={
    api: {
        bodyParser: false,
    },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer: HTTPServer = res.socket.server as any
        const io = new IOServer(httpServer, {
            path: path,
            addTrailingSlash: false,
        });
        res.socket.server.io = io;
    }
    res.end();
}

export default ioHandler;