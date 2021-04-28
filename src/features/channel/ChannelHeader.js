import React from "react";
import { useSelector } from "react-redux";

import {
  selectChannelData,
} from "./channelSlice";
import { StyledChannelHeader, ChannelHeaderText } from "./ChannelHeader.styled";
import SkeletonChannelHeader from "../../components/skeletons/SkeletonChannelHeader";
import Avatar from "../../components/Avatar/Avatar";
import ChannelStatCount from "../../components/ChannelStatCount/ChannelStatCount";
import SubscribeButton from "../../components/SubscribeButton/SubscribeButton";
import Error from "../../components/Error/Error";

const ChannelHeader = () => {
  const {
    channelId,
    status,
    error,
    title,
    avatar,
    subscriberCount,
    videoCount,
  } = useSelector(selectChannelData);

  return (
    <>
      {status === "loading" && <SkeletonChannelHeader />}
      {status === "failed" && <Error error={error} />}
      {status === "succeeded" && (
        <StyledChannelHeader>
          <Avatar src={avatar} alt={title} />
          <ChannelHeaderText>
            <h1>{title}</h1>
            <ChannelStatCount name="subscriber" count={subscriberCount} />
            <ChannelStatCount name="video" count={videoCount} />
          </ChannelHeaderText>
          <SubscribeButton channelId={channelId} />
        </StyledChannelHeader>
      )}
    </>
  );
};

export default ChannelHeader;
