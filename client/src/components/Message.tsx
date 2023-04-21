import { FC, ReactNode } from "react";

import styled from "styled-components";

const StyledMessage = styled.li`
  width: fit-content;
  padding: 12px;
  border-radius: 5px;
  font-size: 14px;
  color: #e9edef;
  background-color: #075e54;
  margin-bottom: 5px;
`;

interface IMessageProps {
  children: ReactNode;
}

const Message: FC<IMessageProps> = ({ children, ...props }) => <StyledMessage {...props}>{children}</StyledMessage>;

export default Message;
