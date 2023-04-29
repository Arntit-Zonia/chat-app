import { Socket, Server as IOServer } from "socket.io";

import registerChatEvents from "./events/chat";
import registerUserEvents from "./events/user";

const registerSocketEvents = (io: IOServer, socket: Socket) => {
  registerChatEvents(io, socket);
  registerUserEvents(io, socket);
};

export default registerSocketEvents;
