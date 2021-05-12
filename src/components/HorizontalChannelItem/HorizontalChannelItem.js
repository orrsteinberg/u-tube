import React from "react";
import { Link } from "react-router-dom";

import {
  HorizontalChannelItemContainer,
  ChannelDetails,
} from "./HorizontalChannelItem.styled";
import Avatar from "../Avatar/Avatar";
import ChannelStatCount from "../ChannelStatCount/ChannelStatCount";

const HorizontalChannelItem = ({ channel, subscription }) => {
  const { id, title, avatar } = channel;

  return (
    <HorizontalChannelItemContainer>
      <Link to={`/channel/${id}`}>
        <Avatar src={avatar} alt={title} />
      </Link>
      <ChannelDetails>
        <Link to={`/channel/${id}`}>
          <h3>{title}</h3>
        </Link>
        <ChannelStatCount name="video" count={channel.videoCount} />
        {subscription ? (
          <ChannelStatCount
            name="new video"
            count={channel.newVideoCount}
            style={channel.newVideoCount > 0 ? { fontWeight: "bold" } : null}
          />
        ) : (
          <ChannelStatCount name="subscriber" count={channel.subscriberCount} />
        )}
      </ChannelDetails>
    </HorizontalChannelItemContainer>
  );
};

export default HorizontalChannelItem;
