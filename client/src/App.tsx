import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import UserRoomProvider from "./components/context/UserRoomContext";
import SocketContextProvider from "./components/context/SocketContext";

import Chat from "./components/Chat";
import Join from "./components/Join";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #111b21;
  }
`;

/**
 * @todo show userUpdate messages
 * @todo create constants dir (sockets, colors, etc)
 * @todo ts linting not working
 * @todo improve styling
 */

const App: FC = () => (
  <UserRoomProvider>
    <SocketContextProvider>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </SocketContextProvider>
  </UserRoomProvider>
);

export default App;
