import { createContext, useState, ReactNode, FC } from "react";

interface IUserRoomProviderProps {
  children: ReactNode;
}

interface IUserRoom {
  username: string;
  room: string;
}

type TUserRoomContext = [IUserRoom | null, (userRoom: IUserRoom | null) => void];

export const UserRoomContext = createContext<TUserRoomContext | null>(null);

const UserRoomProvider: FC<IUserRoomProviderProps> = ({ children }) => {
  const [userRoom, setUserRoom] = useState<IUserRoom | null>(null);

  return <UserRoomContext.Provider value={[userRoom, setUserRoom]}>{children}</UserRoomContext.Provider>;
};

export default UserRoomProvider;
