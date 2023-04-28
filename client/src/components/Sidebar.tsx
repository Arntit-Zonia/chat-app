import { FC } from "react";

import styled from "styled-components";

import useUserRoomData from "../hooks/useUserRoomData";

const StyledSidebar = styled.div`
  display: inline-block;
  width: 15vw;
  height: 70vh;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RoomInfo = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Sidebar: FC = () => {
  const [userRoom] = useUserRoomData();

  return (
    <StyledSidebar>
      <RoomInfo>Room: {userRoom?.room}</RoomInfo>
      <UserList>
        {userRoom?.usernames.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </UserList>
    </StyledSidebar>
  );
};

export default Sidebar;
