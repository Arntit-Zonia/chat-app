import { useState, FC } from "react";

import styled from "styled-components";

import useSocketEvents from "../hooks/useSocketEvents";

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

const LocationUrl = styled.a``;

interface IMessage {
  message: string;
  createdAt: string;
  url?: string;
  isLocation?: boolean;
}

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
  const [messages, setMessages] = useState<IMessage[]>([]);

  useSocketEvents<IMessage>([
    {
      event: "welcomeMessage",
      callback: ({ message, createdAt }) => console.log({ message, createdAt }),
    },
    {
      event: "userUpdates",
      callback: ({ message, createdAt }) => console.log({ message, createdAt }),
    },
    {
      event: "sendMessage",
      callback: ({ message, createdAt }) => {
        console.log({ message, createdAt });

        setMessages((messages) => [...messages, { message, createdAt }]);
      },
    },
    {
      event: "sendLocation",
      callback: ({ url, createdAt }) => {
        console.log(url, createdAt);

        setMessages((messages) => [...messages, { message: url, createdAt, isLocation: true }] as IMessage[]);
      },
    },
  ]);

  return (
    <Container>
      <StyledChat>
        {messages.map(({ message, createdAt, isLocation }, i) => (
          <Message key={i}>
            <User username={"User Name"} createdAt={createdAt} />
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
