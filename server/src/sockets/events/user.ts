import { Socket, Server as IOServer } from "socket.io";

import User from "../../db/models/User";
import createMessageWithTimestamp from "../../helpers/messages";
import getRoomUsers from "../../helpers/getRoomUsers";

const registerUserEvents = (io: IOServer, socket: Socket) => {
  socket.on("join", async ({ username, room }, cb) => {
    try {
      const isExistingUser = await User.findOne({ username, room });

      if (isExistingUser) {
        console.error("Username is already taken!");

        cb("Username is already taken!");

        return;
      }

      const newUser = new User({ socketId: socket.id, username, room });

      await newUser.save();

      const usernames = await getRoomUsers(room);

      socket.join(room);

      io.to(room).emit("roomData", { room, usernames });

      socket.emit("welcomeMessage", createMessageWithTimestamp({ message: `Welcome to room ${room} ${username}!` }));

      socket.broadcast.to(room).emit(
        "userUpdates",
        createMessageWithTimestamp({
          username: "Admin",
          message: `${username} has joined the room!`,
        })
      );

      cb("", usernames);
    } catch (error) {
      console.error("Error during join:", error);
    }
  });

  socket.on("userDisconnected", async ({ room }, cb) => {
    try {
      const user = await User.findOneAndDelete({ socketId: socket.id });

      if (!user) return;

      const usernames = await getRoomUsers(room);

      socket.leave(user.room);

      io.emit("roomData", { room, usernames });

      io.to(user.room).emit(
        "userUpdates",
        createMessageWithTimestamp({
          username: "Admin",
          message: `${user.username} has left the room!`,
        })
      );

      cb(usernames);
    } catch (error) {
      console.error("Error during leaveRoom:", error);
    }
  });

  socket.on("disconnect", async () => {
    try {
      const user = await User.findOne({ socketId: socket.id });

      if (!user) return;

      io.emit(
        "userUpdates",
        createMessageWithTimestamp({
          username: "Admin",
          message: `${user.username} has left the site!`,
        })
      );
    } catch (error) {
      console.error("Error during disconnect:", error);
    }
  });
};

export default registerUserEvents;
