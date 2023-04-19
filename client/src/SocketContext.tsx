import { createContext } from "react";
import { Socket, io } from "socket.io-client";

export const socket: Socket = io(`http://localhost:${import.meta.env.VITE_PORT}`);
const SocketContext = createContext<Socket>(socket);

export default SocketContext;
