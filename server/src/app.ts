import express, { Express, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

import badWords from "bad-words";

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

  socket.emit("welcomeMessage", createMessageWithTimestamp({ message: "Welcome to the site!" }));
  socket.broadcast.emit("userUpdates", createMessageWithTimestamp({ message: "A new user has joined the site!" }));

  socket.on("sendMessage", (message: string, cb) => {
    if (!message) return;

    const filter = new badWords();

    if (filter.isProfane(message)) return cb("Profanity is not allowed!");

    io.emit("sendMessage", createMessageWithTimestamp({ message }));

    cb("Message received!");
  });

  socket.on("sendLocation", (location, cb) => {
    if (!location) return;

    const { latitude, longitude } = location;
    const googleMapsLocation = `https://www.google.com/maps?q=${latitude},${longitude}`;

    console.log("Location received", location);

    io.emit("sendLocation", createMessageWithTimestamp({ url: googleMapsLocation }));

    cb("Location shared!");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");

    io.emit("userUpdates", createMessageWithTimestamp({ message: "A user has left the site!" }));
  });
});

export default httpServer;
