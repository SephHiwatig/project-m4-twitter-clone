import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import catLogo from "../assets/logo.svg";
import { FaHome, FaUser, FaRegBell, FaRegBookmark } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  margin: 4px;
  padding: 4px;
  cursor: pointer;
`;

const NavigationLink = styled(NavLink)`
  margin: 8px 0;
  padding: 4px 4px 4px 20px;
  cursor: pointer;
  border-radius: 25px;
  font-weight: bold;
  text-decoration: none;
  color: #000;
  &:hover {
    background-color: ${COLORS.light};
  }

  &.active {
    color: ${COLORS.primary} !important;
  }
`;

const Logo = styled.img`
  width: 50px;
`;

const Sidebar = () => {
  const data = React.useContext(CurrentUserContext);
  console.log(data);

  return (
    <SidebarWrapper>
      <LogoWrapper>
        <Logo src={catLogo} alt="Cat Logo" />
      </LogoWrapper>
      {data.status === "loading" && <LogoWrapper>Loading...</LogoWrapper>}
      {data.status === "idle" && (
        <NavigationLink to="/" exact activeClassName="active">
          <FaHome />
          &nbsp;&nbsp;&nbsp;&nbsp;Home
        </NavigationLink>
      )}
      {data.status === "idle" && (
        <NavigationLink to="/:profileId" exact activeClassName="active">
          <FaUser />
          &nbsp;&nbsp;&nbsp;&nbsp;Profile
        </NavigationLink>
      )}
      {data.status === "idle" && (
        <NavigationLink to="/notifications" exact activeClassName="active">
          <FaRegBell />
          &nbsp;&nbsp;&nbsp;&nbsp;Notifications
        </NavigationLink>
      )}
      {data.status === "idle" && (
        <NavigationLink to="/bookmarks" exact activeClassName="active">
          <FaRegBookmark />
          &nbsp;&nbsp;&nbsp;&nbsp;Bookmarks
        </NavigationLink>
      )}
    </SidebarWrapper>
  );
};

export default Sidebar;
