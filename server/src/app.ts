import express, { Express, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

import registerSocketEvents from "./sockets";

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
  try {
    console.log("Client connected", socket.id);

    registerSocketEvents(io, socket);
  } catch (error) {
    console.error(error);
  }
});

export default httpServer;
