import { FC, ReactNode, createContext } from "react";
import { Socket, io } from "socket.io-client";

interface ISocketContextProviderProps {
  children: ReactNode;
}

export const socket: Socket = io(`http://localhost:${import.meta.env.VITE_PORT}`);
export const SocketContext = createContext<Socket>(socket);

const SocketContextProvider: FC<ISocketContextProviderProps> = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export default SocketContextProvider;
