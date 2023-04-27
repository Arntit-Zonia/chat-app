import { useContext } from "react";

import { UserRoomContext } from "../context/UserRoomContext";

/**
 * Custom hook to access user and room data.
 * To be used within components wrapped by UserRoomProvider.
 *
 * @returns An array with user and room data, and a function to update them.
 * @throws Error if hook is called outside UserRoomProvider.
 */
const useUserRoomData = () => {
  const context = useContext(UserRoomContext);

  if (!context) throw new Error("useUserRoomData must be used within a UserRoomProvider");

  return context;
};

export default useUserRoomData;
