import { useContext } from "react";

import { SocketEventsContext } from "../components/context/SocketEventsContext";

/**
 * Custom hook to access the SocketEventsContext.
 * @returns {Array} An array of messages and a setMessages function to update them.
 */
const useSocketEventsContext = () => {
  const context = useContext(SocketEventsContext);
  if (!context) {
    throw new Error("useSocketEventsContext must be used within a SocketEventsProvider");
  }
  return context;
};

export default useSocketEventsContext;
