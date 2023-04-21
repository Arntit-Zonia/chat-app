import { useEffect } from "react";

import useSocket from "./useSocket";

export interface SocketEvent<T = unknown> {
  event: string;
  callback: (...args: T[]) => void;
}

/**
 * Custom hook to subscribe and unsubscribe from socket events.
 *
 * @template T - Type for the event payload.
 * @param {SocketEvent<T>[]} events - Array of socket events and callbacks.
 */
const useSocketEvents = <T = unknown>(events: SocketEvent<T>[]) => {
  const socket = useSocket();

  useEffect(() => {
    events.forEach(({ event, callback }) => {
      socket.on(event, callback);
    });

    return () => {
      events.forEach(({ event }) => {
        socket.off(event);
      });
    };
  }, [events, socket]);
};

export default useSocketEvents;
