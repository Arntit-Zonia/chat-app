import { FC } from "react";

import styled from "styled-components";

import useSocketEventsContext from "../hooks/useSocketEventsContext";

import Message from "./Message";
import User from "./User";
import Form from "./GeolocationForm";

const StyledChat = styled.ul`
  width: 80vw;
  list-style: none;
  padding: 0;
  margin: 0;
  height: calc(100% - 150px);
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const LocationUrl = styled.a`
  color: #6495ed;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  max-width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const Chat: FC = () => {
  const [messages] = useSocketEventsContext();

  return (
    <Container>
      <StyledChat>
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
  );
};

export default Chat;
