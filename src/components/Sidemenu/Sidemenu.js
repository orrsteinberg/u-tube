import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  MdHome,
  MdExplore,
  MdVideoLibrary,
  MdSubscriptions,
  MdHistory,
  MdVideocam,
  MdWatchLater,
  MdPerson,
} from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import { useGoogleAuth } from "../../hooks";
import { Nav, NavGroup, NavItem, AuthButton } from "./Sidemenu.styled";
import { selectUser } from "../../features/auth/authSlice";
import SubscriptionsNavGroup from "./SubscriptionsNavGroup";

const Sidemenu = React.forwardRef(
  ({ showOnMobile, activeTab, watchView }, ref) => {
    const [signIn, signOut] = useGoogleAuth();
    const user = useSelector(selectUser);

    const handleAuth = () => {
      user ? signOut() : signIn();
    };

    const authIcon = user ? <IoMdLogOut /> : <MdPerson />;
    const authText = user ? "Sign out" : "Sign in";

    return (
      <Nav showOnMobile={showOnMobile} watchView={watchView} ref={ref}>
        <NavGroup>
          <Link to="/">
            <NavItem active={activeTab === "home"}>
              <MdHome /> <span>Home</span>
            </NavItem>
          </Link>
          <Link to="/explore">
            <NavItem active={activeTab === "explore"}>
              <MdExplore /> <span>Explore</span>
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
        {user && <SubscriptionsNavGroup />}
        <AuthButton as="button" onClick={handleAuth}>
          {authIcon} <span>{authText}</span>
        </AuthButton>
      </Nav>
    );
  }
);

export default Sidemenu;
