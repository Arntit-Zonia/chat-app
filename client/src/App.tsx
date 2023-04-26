import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import UserRoomProvider from "./context/UserRoomContext";
import SocketContextProvider from "./context/SocketContext";
import SocketEventsProvider from "./context/SocketEventsContext";

import Chat from "./components/Chat";
import Join from "./components/Join";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #111b21;
  }
`;

const App: FC = () => (
  <UserRoomProvider>
    <SocketContextProvider>
      <SocketEventsProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </SocketEventsProvider>
    </SocketContextProvider>
  </UserRoomProvider>
);

export default App;
