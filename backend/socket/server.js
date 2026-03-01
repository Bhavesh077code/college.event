import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
           origin: ["http://192.168.1.71:5173", "http://192.168.1.71:5174"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket Connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Socket Disconnected");
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket not initialized!");
    }
    return io;
};
