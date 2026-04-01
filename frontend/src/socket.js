
import { io } from "socket.io-client";

/*
export const socket = io("http://192.168.1.86:5173", {
    withCredentials: true
});

*/


export const socket = io("http://192.168.1.67:8000", {
  withCredentials: true,
  autoConnect: true,
});



