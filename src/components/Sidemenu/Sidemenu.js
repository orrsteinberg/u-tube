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

import { useGoogleAuth } from "../../hooks";
import {
  Nav,
  NavGroup,
  NavItem,
  AuthButton,
  ViewAllSubsButton,
} from "./Sidemenu.styled";
import { truncateSubscriptionTitle } from "../../utils/helpers";
import { selectUser } from "../../features/auth/authSlice";
import { selectSubscriptions } from "../../features/subscriptions/subscriptionsSlice";
import Avatar from "../Avatar/Avatar";

const SubscribedChannelsGroup = () => {
  // Show only the first 5 subscriptions, expand list to show the rest
  const [isExpanded, setIsExpanded] = useState(false);
  const { items: fullList } = useSelector(selectSubscriptions);

  const listToDisplay = isExpanded ? fullList : fullList.slice(0, 5);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const button =
    fullList.length > 5 ? (
      <ViewAllSubsButton onClick={handleToggle}>
        {isExpanded ? "show less" : "show all"}
      </ViewAllSubsButton>
    ) : null;

  return (
    <NavGroup className="hideOnMobile">
      {listToDisplay.map((item) => (
        <Link to={`/channel/${item.channel.id}`} key={item.channel.id}>
          <NavItem>
            <Avatar
              highlight={item.channel.newVideoCount > 0}
              size="xs"
              src={item.channel.avatar}
              alt={item.channel.title}
            />{" "}
            <span>{truncateSubscriptionTitle(item.channel.title)}</span>
            {item.channel.newVideoCount > 0 && (
              <span className="circleHighlight">●</span>
            )}
          </NavItem>
        </Link>
      ))}
      {button}
    </NavGroup>
  );
};

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
        {user && <SubscribedChannelsGroup />}
        <AuthButton as="button" onClick={handleAuth}>
          {authIcon} <span>{authText}</span>
        </AuthButton>
      </Nav>
    );
  }
);

export default Sidemenu;
