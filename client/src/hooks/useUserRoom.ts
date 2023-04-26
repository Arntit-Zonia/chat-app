import { useContext } from "react";

import { UserRoomContext } from "../context/UserRoomContext";

/**
 * Custom hook to access user and room data.
 * Use this hook within components wrapped by UserRoomProvider.
 *
 * @returns An array with user and room data, and a function to update them.
 * @throws Error if hook is called outside UserRoomProvider.
 */
export const useUserRoom = () => {
  const context = useContext(UserRoomContext);

  if (!context) throw new Error("useUserRoom must be used within a UserRoomProvider");

  return context;
};
