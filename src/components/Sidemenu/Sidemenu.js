import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MdHome,
  MdWhatshot,
  MdVideoLibrary,
  MdSubscriptions,
  MdHistory,
  MdVideocam,
  MdWatchLater,
  MdPerson,
} from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import { Nav, NavGroup, NavItem, AuthButton } from "./Sidemenu.styled";
import { selectUser } from "../../features/auth/authSlice";
import { login, logout } from "../../features/auth/authSlice";

const Sidemenu = ({ showOnMobile, activeTab, watchView }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleAuth = () => {
    user ? dispatch(logout()) : dispatch(login());
  };

  const authIcon = user ? <IoMdLogOut /> : <MdPerson />;
  const authText = user ? "Log out" : "Log in";

  return (
    <Nav showOnMobile={showOnMobile} watchView={watchView}>
      <NavGroup>
        <Link to="/">
          <NavItem active={activeTab === "home"}>
            <MdHome /> <span>Home</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem active={activeTab === "trending"}>
            <MdWhatshot /> <span>Trending</span>
          </NavItem>
        </Link>
        <Link to="/subscriptions">
          <NavItem active={activeTab === "subscriptions"}>
            <MdSubscriptions /> <span>Subscriptions</span>
          </NavItem>
        </Link>
      </NavGroup>
      <NavGroup>
        <NavItem disabled>
          <MdVideoLibrary /> <span>Library</span>
        </NavItem>
        <NavItem disabled>
          <MdHistory /> <span>History</span>
        </NavItem>
        <NavItem disabled>
          <MdVideocam /> <span>My Videos</span>
        </NavItem>
        <NavItem disabled>
          <MdWatchLater /> <span>Watch Later</span>
        </NavItem>
      </NavGroup>
      <AuthButton as="button" onClick={handleAuth}>
        {authIcon} <span>{authText}</span>
      </AuthButton>
    </Nav>
  );
};

export default Sidemenu;
