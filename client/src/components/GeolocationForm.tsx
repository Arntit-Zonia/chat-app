import { FC, FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import useSocket from "../hooks/useSocket";
import useUserRoomData from "../hooks/useUserRoomData";

import { IUserRoom } from "../context/UserRoomContext";

import Button from "./Button";

const StyledForm = styled.form`
  width: 75vw;
  display: flex;
  align-items: center;

  & button:nth-of-type(2) {
    margin: 0 10px;
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
  const [isLocationBtnDisabled, setIsLocationBtnDisabled] = useState<boolean>(false);
  const [isMessageBtnDisabled, setIsMessageBtnDisabled] = useState<boolean>(false);

  const [userRoom, setUserRoom] = useUserRoomData();
  const navigate = useNavigate();
  const socket = useSocket();

  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleUserDisconnect = () => {
    socket.emit("userDisconnected", { room: userRoom?.room }, (usernames: string[]) => {
      setUserRoom((userRoom: IUserRoom | null) => ({
        ...userRoom,
        usernames,
      }));
    });

    navigate("/");
  };

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <Input ref={inputRef} placeholder="Message" type="text" autoFocus />
      <Button disabled={isMessageBtnDisabled}>Send</Button>
      <Button onClick={handleGeolocation} disabled={isLocationBtnDisabled}>
        My Location
      </Button>
      <Button onClick={handleUserDisconnect} disabled={isLocationBtnDisabled}>
        Leave
      </Button>
    </StyledForm>
  );
};

export default GeolocationForm;
