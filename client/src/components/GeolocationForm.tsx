import { FC, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import useSocket from "../hooks/useSocket";
import { useUserRoom } from "../hooks/useUserRoom";

import Button from "./Button";

const StyledForm = styled.form`
  width: 80vw;
  display: flex;
  align-items: center;

  & button:first-of-type {
    margin-right: 10px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: #0077b6;
  }
`;

const GeolocationForm: FC = () => {
  const [userRoom] = useUserRoom();
  const [isLocationBtnDisabled, setIsLocationBtnDisabled] = useState<boolean>(false);
  const [isMessageBtnDisabled, setIsMessageBtnDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const socket = useSocket();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current?.value) return;

    const eventData = {
      message: inputRef.current?.value,
      username: userRoom?.username,
      room: userRoom?.room,
    };

    setIsMessageBtnDisabled(true);

    socket.emit("sendMessage", eventData, (confirmation: string) => {
      console.log("Response from receiver:", confirmation);

      setIsMessageBtnDisabled((isMessageBtnDisabled) => !isMessageBtnDisabled);
    });

    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleGeolocation = () => {
    const geolocation = navigator.geolocation;

    if (geolocation) {
      setIsLocationBtnDisabled(true);

      geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const eventData = {
            latitude,
            longitude,
            username: userRoom?.username,
            room: userRoom?.room,
          };

          socket.emit("sendLocation", eventData, (confirmation: string) => console.log(confirmation));

          setIsLocationBtnDisabled((isLocationBtnDisabled) => !isLocationBtnDisabled);

          inputRef?.current?.focus();
        },
        (error) => {
          console.error(error);

          setIsLocationBtnDisabled((isLocationBtnDisabled) => !isLocationBtnDisabled);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <Input ref={inputRef} placeholder="Message" type="text" autoFocus />
      <Button disabled={isMessageBtnDisabled}>Send</Button>
      <Button onClick={handleGeolocation} disabled={isLocationBtnDisabled}>
        Share Location
      </Button>
      <Button
        onClick={() => {
          socket.emit("userDisconnected");

          navigate("/");
        }}
        disabled={isLocationBtnDisabled}
      >
        Leave
      </Button>
    </StyledForm>
  );
};

export default GeolocationForm;
