import { FC } from "react";

import Chat from "./components/Chat";

import SocketContext, { socket } from "./SocketContext";

const App: FC = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Chat />
    </SocketContext.Provider>
  );
};

export default App;
