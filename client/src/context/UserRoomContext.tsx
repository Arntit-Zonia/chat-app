import { createContext, useState, ReactNode, FC, SetStateAction } from "react";

import useSocketEvents from "../hooks/useSocketEvents";

interface IUserRoomProviderProps {
  children: ReactNode;
}

export interface IUserRoom {
  username?: string;
  room?: string;
  usernames: string[];
}

type TUserRoomContext = [IUserRoom | null, React.Dispatch<SetStateAction<IUserRoom | null>>];

export const UserRoomContext = createContext<TUserRoomContext | null>(null);

const UserRoomProvider: FC<IUserRoomProviderProps> = ({ children }) => {
  const [userRoom, setUserRoom] = useState<IUserRoom | null>(null);

  useSocketEvents<IUserRoom>([
    {
      event: "roomData",
      callback: ({ usernames }, cb) => {
        console.log("roomData args", usernames, cb);

        setUserRoom((userRoom) => ({
          ...userRoom,
          usernames,
        }));
      },
    },
  ]);

  return <UserRoomContext.Provider value={[userRoom, setUserRoom]}>{children}</UserRoomContext.Provider>;
};

export default UserRoomProvider;
