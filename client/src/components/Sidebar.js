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

const MenuItem = styled.span`
  display: none;

  @media (min-width: 768px) {
    display: inline;
  }
`;

const Sidebar = () => {
  const data = React.useContext(CurrentUserContext);

  return (
    <SidebarWrapper>
      <LogoWrapper>
        <Logo src={catLogo} alt="Cat Logo" />
      </LogoWrapper>
      {data.status === "loading" && <LogoWrapper>Loading...</LogoWrapper>}
      {data.status === "idle" && (
        <NavigationLink to="/" exact activeClassName="active">
          <FaHome />
          <MenuItem>&nbsp;&nbsp;&nbsp;Home</MenuItem>
        </NavigationLink>
      )}
      {data.status === "idle" && (
        <NavigationLink
          to={"/" + data.currentUser.handle}
          exact
          activeClassName="active"
        >
          <FaUser />
          <MenuItem>&nbsp;&nbsp;&nbsp;Profile</MenuItem>
        </NavigationLink>
      )}
      {data.status === "idle" && (
        <NavigationLink to="/notifications" exact activeClassName="active">
          <FaRegBell />
          <MenuItem>&nbsp;&nbsp;&nbsp;Notifications</MenuItem>
        </NavigationLink>
      )}
      {data.status === "idle" && (
        <NavigationLink to="/bookmarks" exact activeClassName="active">
          <FaRegBookmark />
          <MenuItem>&nbsp;&nbsp;&nbsp;Bookmarks</MenuItem>
        </NavigationLink>
      )}
    </SidebarWrapper>
  );
};

export default Sidebar;
