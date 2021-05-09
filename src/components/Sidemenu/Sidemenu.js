import React, { useState } from "react";
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
import { FaGithub } from "react-icons/fa";

import { selectUser } from "../../features/auth/authSlice";
import { useGoogleAuth } from "../../hooks";
import { Nav, NavGroup, NavItem, AuthButton } from "./Sidemenu.styled";
import SubscriptionsNavGroup from "./SubscriptionsNavGroup";
import AuthModal from "../AuthModal/AuthModal";

const mainNavLinks = [
  {
    name: "Home",
    to: "/",
    icon: <MdHome />,
  },
  {
    name: "Explore",
    to: "/explore",
    icon: <MdExplore />,
  },
  {
    name: "Subscriptions",
    to: "/subscriptions",
    icon: <MdSubscriptions />,
  },
];

const disabledNavLinks = [
  {
    name: "Library",
    icon: <MdVideoLibrary />,
  },
  {
    name: "History",
    icon: <MdHistory />,
  },
  {
    name: "My Videos",
    icon: <MdVideocam />,
  },
  {
    name: "Watch Later",
    icon: <MdWatchLater />,
  },
];

const Sidemenu = React.forwardRef(
  ({ showOnMobile, toggleMenu, activeTab, compact }, ref) => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { signOut } = useGoogleAuth();
    const user = useSelector(selectUser);

    const handleAuth = () => {
      user ? signOut() : setShowAuthModal(true);
    };

    const authIcon = user ? <IoMdLogOut /> : <MdPerson />;
    const authText = user ? "Sign out" : "Sign in";

    const closeAuthModal = () => setShowAuthModal(false);

    return (
      <>
        <Nav showOnMobile={showOnMobile} compact={compact} ref={ref}>
          <NavGroup>
            {mainNavLinks.map((navLink) => (
              <Link to={navLink.to} key={navLink.name} onClick={toggleMenu}>
                <NavItem active={activeTab === navLink.name.toLowerCase()}>
                  {navLink.icon} <span>{navLink.name}</span>
                </NavItem>
              </Link>
            ))}
          </NavGroup>
          <NavGroup>
            {disabledNavLinks.map((navLink) => (
              <NavItem disabled key={navLink.name}>
                {navLink.icon} <span>{navLink.name}</span>
              </NavItem>
            ))}
          </NavGroup>
          {user && <SubscriptionsNavGroup />}
          <AuthButton as="button" onClick={handleAuth}>
            {authIcon} <span>{authText}</span>
          </AuthButton>
          <a
            href="https://www.github.com/orrsteinberg/u-tube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NavItem>
              <FaGithub /> <span>View on GitHub</span>
            </NavItem>
          </a>
        </Nav>
        {showAuthModal && <AuthModal closeModal={closeAuthModal} />}
      </>
    );
  }
);

export default Sidemenu;
