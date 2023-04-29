import { Socket, Server as IOServer } from "socket.io";
import badWords from "bad-words";

import createMessageWithTimestamp from "../../helpers/messages";

const registerChatEvents = (io: IOServer, socket: Socket) => {
  socket.on("sendMessage", ({ username, message, room }, cb) => {
    if (!message) return;

    const filter = new badWords();

    if (filter.isProfane(message)) return cb("Profanity is not allowed!");

    io.to(room).emit("sendMessage", createMessageWithTimestamp({ username, message }));

    cb("Message received!");
  });

  socket.on("sendLocation", ({ username, latitude, longitude, room }, cb) => {
    if (!latitude || !longitude) return;

    const googleMapsLocation = `https://www.google.com/maps?q=${latitude},${longitude}`;

    console.log("Location received", { username, latitude, longitude });

    io.to(room).emit("sendLocation", createMessageWithTimestamp({ username, url: googleMapsLocation }));

    cb("Location shared!");
  });
};

export default registerChatEvents;
