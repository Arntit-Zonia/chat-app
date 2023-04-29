import { FC } from "react";

import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #0077b6;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #014d82;
  }
`;

interface IButton {
  children: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<IButton> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
