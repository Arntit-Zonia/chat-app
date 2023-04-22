import { useContext } from "react";
import { SocketContext } from "../components/context/SocketContext";

/**
 * Custom hook to access the socket instance.
 * Use this hook within components wrapped by SocketProvider.
 *
 * @returns The socket instance from the SocketContext.
 */
const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
