import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { createGlobalStyle } from "styled-components";

import Chat from "./components/Chat";

import SocketContext, { socket } from "./SocketContext";
import Join from "./components/Join";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #111b21;
  }
`;

const App: FC = () => (
  <SocketContext.Provider value={socket}>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  </SocketContext.Provider>
);

export default App;
