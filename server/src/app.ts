import express, { Express, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

import badWords from "bad-words";

import User from "./db/models/User";

import createMessageWithTimestamp from "./helpers/messages";

const app: Express = express();
const httpServer: HttpServer = new HttpServer(app);
const io: IOServer = new IOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
});

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

io.on("connection", (socket: Socket) => {
  console.log("Client connected", socket.id);

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

  // todo: add roomData event
  socket.on("join", async ({ username, room }, cb) => {
    try {
      const isExistingUser = await User.findOne({ username, room });

      if (isExistingUser) {
        console.error("User already exists");

        cb("Username is already taken!");

        return;
      }

      const newUser = new User({ socketId: socket.id, username, room });

      await newUser.save();

      socket.join(room);

      socket.emit("welcomeMessage", createMessageWithTimestamp({ message: `Welcome to room ${room} ${username}!` }));

      socket.broadcast.to(room).emit(
        "userUpdates",
        createMessageWithTimestamp({
          username: "Admin",
          message: `${username} has joined the room!`,
        })
      );

      cb();
    } catch (error) {
      console.error("Error during join:", error);
    }
  });

  // todo: add roomData event
  socket.on("userDisconnected", async () => {
    try {
      const user = await User.findOneAndDelete({ socketId: socket.id });

      if (!user) return;

      socket.leave(user.room);

      io.to(user.room).emit(
        "userUpdates",
        createMessageWithTimestamp({
          username: "Admin",
          message: `${user.username} has left the room!`,
        })
      );
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
});

export default httpServer;
