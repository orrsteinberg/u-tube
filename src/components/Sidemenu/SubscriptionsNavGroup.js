import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { NavGroup, NavItem } from "./Sidemenu.styled";
import { ViewAllSubsButton } from "./SubscriptionsNavGroup.styled";
import { truncateSubscriptionTitle } from "../../utils/helpers";
import { selectSubscriptions } from "../../features/subscriptions/subscriptionsSlice";
import Avatar from "../Avatar/Avatar";

const SubscriptionsNavGroup = () => {
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

export default SubscriptionsNavGroup;
