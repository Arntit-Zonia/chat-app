import { FC, FormEvent, useRef, useState } from "react";

import styled from "styled-components";

import useSocket from "../hooks/useSocket";

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
  const [isLocationBtnDisabled, setIsLocationBtnDisabled] = useState<boolean>(false);
  const [isMessageBtnDisabled, setIsMessageBtnDisabled] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const socket = useSocket();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current?.value) return;

    setIsMessageBtnDisabled(true);

    socket.emit("sendMessage", inputRef.current?.value, (confirmation: string) => {
      console.log("Response from receiver:", confirmation);

      setIsMessageBtnDisabled(false);
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
          socket.emit("sendLocation", { latitude, longitude }, (confirmation: string) => console.log(confirmation));

          setIsLocationBtnDisabled(false);
        },
        (error) => {
          console.error(error);

          setIsLocationBtnDisabled(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <Input ref={inputRef} placeholder="Message" type="text" />
      <Button disabled={isMessageBtnDisabled}>Send</Button>
      <Button onClick={handleGeolocation} disabled={isLocationBtnDisabled}>
        Share Location
      </Button>
    </StyledForm>
  );
};

export default GeolocationForm;
