
import { io } from "socket.io-client";
import BASE_URL from "./api";

export const socket = io(`${BASE_URL}`, {
  withCredentials: true,
  autoConnect: false, // 🔹 अब manual connect होगा
});

// जब login/token ready हो, तब connect करो
export const connectSocket = (token) => {
  socket.auth = { token }; // backend अगर token check करता है
  socket.connect();
};
