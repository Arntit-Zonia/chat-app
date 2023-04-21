import { FC } from "react";

import styled from "styled-components";

const StyledUser = styled.div``;

interface IUser {
  username: string;
  createdAt: string;
}

const User: FC<IUser> = ({ username, createdAt }) => (
  <StyledUser>
    {username} {createdAt}
  </StyledUser>
);

export default User;
