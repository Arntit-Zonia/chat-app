import { useEffect, useRef, FC } from "react";

import styled from "styled-components";

import useSocketEventsContext from "../hooks/useSocketEventsContext";

import Message from "./Message";
import User from "./User";
import Form from "./GeolocationForm";
import Sidebar from "./Sidebar";

const ChatLayout = styled.div`
  display: flex;
  padding: 20px;
`;

const StyledChat = styled.ul`
  width: 75vw;
  height: 70vh;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;

  /* For Chrome and Edge */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #ccc;
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 #eee;
`;

const LocationUrl = styled.a`
  color: #6495ed;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  max-width: 100vw;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Chat: FC = () => {
  const [messages] = useSocketEventsContext();

  const chatRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      const { scrollHeight } = chatRef.current;

      chatRef.current.scrollTop = scrollHeight;
    }
  }, [messages]);

  return (
    <ChatLayout>
      <Sidebar />
      <Container>
        <StyledChat ref={chatRef}>
          {messages.map(({ username, message, createdAt, isLocation, isNewUser }, i) => (
            <Message key={i}>
              {isNewUser ? (
                <User username={"Admin"} createdAt={createdAt} />
              ) : (
                <User username={username} createdAt={createdAt} />
              )}
              {isLocation ? (
                <LocationUrl href={message} target="_blank" rel="noreferrer">
                  My location
                </LocationUrl>
              ) : (
                <>{message}</>
              )}
            </Message>
          ))}
        </StyledChat>
        <Form />
      </Container>
    </ChatLayout>
  );
};

export default Chat;
