import React from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";

import {
  HorizontalChannelItemContainer,
  ChannelAvatar,
  ChannelDetails,
} from "./HorizontalChannelItem.styled";

const HorizontalChannelItem = ({ channel }) => {
  const { id, title, avatar } = channel;
  //
  // Format data
  const subscriberCount = numeral(channel.subscriberCount).format("0,0");
  const videoCount = numeral(channel.videoCount).format("0,0");

  return (
    <HorizontalChannelItemContainer>
      <ChannelAvatar>
        <Link to={`/channel/${id}`}>
          <img src={avatar} alt={`${title} avatar`} />
        </Link>
      </ChannelAvatar>
      <ChannelDetails>
        <Link to={`/channel/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>
          <span className="count">{videoCount}</span> Videos
        </p>
        <p>
          <span className="count">{subscriberCount}</span> Subscribers
        </p>
      </ChannelDetails>
    </HorizontalChannelItemContainer>
  );
};

export default HorizontalChannelItem;
