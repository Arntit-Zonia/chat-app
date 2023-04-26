import { FC } from "react";

import styled from "styled-components";

const StyledUser = styled.div`
  font-weight: bold;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const Timestamp = styled.span`
  color: #a9a9a9;
  font-size: 12px;
`;

interface IUser {
  username: string;
  createdAt: string;
}

const User: FC<IUser> = ({ username, createdAt }) => (
  <StyledUser>
    <Username>{username}</Username> <Timestamp>{createdAt}</Timestamp>
  </StyledUser>
);

export default User;
