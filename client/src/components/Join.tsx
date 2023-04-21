import { FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Button from "./Button";

const H1 = styled.h1``;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CenteredForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Join: FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const username = (formData.get("username") ?? "").toString().trim();
    const room = parseInt((formData.get("room") ?? 0).toString().trim());

    if (!username || !room) return;

    navigate("/chat");
  };

  return (
    <Container>
      <CenteredForm>
        <Form onSubmit={handleSubmit}>
          <H1>Join</H1>
          <Label>Display name</Label>
          <Input type="text" name="username" placeholder="Display name" required />
          <Label>Room</Label>
          <Input type="number" name="room" placeholder="Room" required />
          <Button>Join</Button>
        </Form>
      </CenteredForm>
    </Container>
  );
};

export default Join;
