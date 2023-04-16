import express, { Express, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

const app: Express = express();
const httpServer: HttpServer = new HttpServer(app);
const io: IOServer = new IOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

io.on("connection", (socket: Socket) => {
  console.log("Client connected", socket.id);

  socket.on("message", (message: string) => {
    console.log("Message from client", message);

    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

export default httpServer;
