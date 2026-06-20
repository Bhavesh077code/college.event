import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: [/\.vercel\.app$/],
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
