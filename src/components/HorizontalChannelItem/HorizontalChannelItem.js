import React from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";

import {
  HorizontalChannelItemContainer,
  ChannelDetails,
} from "./HorizontalChannelItem.styled";
import Avatar from "../Avatar/Avatar";

const HorizontalChannelItem = ({ channel, subscription }) => {
  const { id, title, avatar } = channel;

  // Format data
  const videoCount =
    channel.videoCount === 0 ? "No" : numeral(channel.videoCount).format("0,0");
  const subscriberCount =
    channel.subscriberCount === 0
      ? "No"
      : numeral(channel.subscriberCount).format("0,0");
  const newVideoCount =
    channel.newVideoCount === 0
      ? "No"
      : numeral(channel.newVideoCount).format("0,0");

  return (
    <HorizontalChannelItemContainer>
      <Link to={`/channel/${id}`}>
        <Avatar src={avatar} alt={title} />
      </Link>
      <ChannelDetails>
        <Link to={`/channel/${id}`}>
          <h3>{title}</h3>
        </Link>
        <p>{videoCount === "1" ? `1 video` : `${videoCount} videos`}</p>
        {subscription ? (
          <p>
            {newVideoCount === "1"
              ? `1 new video`
              : `${newVideoCount} new videos`}
          </p>
        ) : (
          <p>
            {subscriberCount === "1"
              ? `1 subscriber`
              : `${subscriberCount} subscribers`}
          </p>
        )}
      </ChannelDetails>
    </HorizontalChannelItemContainer>
  );
};

export default HorizontalChannelItem;
