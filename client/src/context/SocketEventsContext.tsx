import { createContext, useState, FC, ReactNode } from "react";

import useSocketEvents from "../hooks/useSocketEvents";

interface IMessage {
  username: string;
  message: string;
  createdAt: string;
  url?: string;
  isLocation?: boolean;
  isNewUser?: boolean;
}

interface SocketEventsProviderProps {
  children: ReactNode;
}

type SocketEventsContextValue = [messages: IMessage[], setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>];

export const SocketEventsContext = createContext<SocketEventsContextValue | null>(null);

const SocketEventsProvider: FC<SocketEventsProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useSocketEvents<IMessage>([
    {
      event: "welcomeMessage",
      callback: ({ username, message, createdAt }) => {
        setMessages([{ username, message, createdAt, isNewUser: true }]);
      },
    },
    {
      event: "userUpdates",
      callback: ({ username, message, createdAt }) => {
        setMessages((messages) => [...messages, { username, message, createdAt }]);
      },
    },
    {
      event: "sendMessage",
      callback: ({ username, message, createdAt }) => {
        setMessages((messages) => [...messages, { username, message, createdAt }]);
      },
    },
    {
      event: "sendLocation",
      callback: ({ username, url, createdAt }) => {
        setMessages((messages) => [...messages, { username, message: url, createdAt, isLocation: true }] as IMessage[]);
      },
    },
  ]);

  return <SocketEventsContext.Provider value={[messages, setMessages]}>{children}</SocketEventsContext.Provider>;
};

export default SocketEventsProvider;
