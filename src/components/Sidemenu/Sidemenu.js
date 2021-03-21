import React from "react";
import { Link } from "react-router-dom";
import {
  MdHome,
  MdWhatshot,
  MdVideoLibrary,
  MdSubscriptions,
  MdHistory,
  MdVideocam,
  MdWatchLater,
} from "react-icons/md";

import { Nav, NavGroup, NavItem } from "./Sidemenu.styled";

const Sidemenu = ({ showOnMobile }) => {
  return (
    <Nav showOnMobile={showOnMobile}>
      <NavGroup>
        <Link to="/">
          <NavItem active>
            <MdHome /> <span>Home</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdWhatshot /> <span>Trending</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdSubscriptions /> <span>Subscriptions</span>
          </NavItem>
        </Link>
      </NavGroup>
      <NavGroup>
        <Link to="/">
          <NavItem>
            <MdVideoLibrary /> <span>Library</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdHistory /> <span>History</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdVideocam /> <span>My Videos</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdWatchLater /> <span>Watch Later</span>
          </NavItem>
        </Link>
      </NavGroup>
    </Nav>
  );
};

export default Sidemenu;
