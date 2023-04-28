import User from "../db/models/User";

/**
 * Retrieves all users in a specific room.
 * @param {string} room Room used to retrieve the users.
 * @returns An array of usernames for all users in the specified room.
 */
const getRoomUsers = async (room: string) => {
  const users = await User.find({ room });
  const usernames = users.map((user) => user.username);

  return usernames;
};

export default getRoomUsers;
