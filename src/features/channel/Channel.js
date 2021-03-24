import React from "react";

import { VideoRow } from "../../components/shared";
import { ChannelHeader, ChannelHeaderText } from "./Channel.styled";
import VideoItem from "../../components/VideoItem/VideoItem";

const Channel = () => {
  return (
    <>
      <ChannelHeader bannerUrl="https://picsum.photos/300">
        <img src="https://picsum.photos/100" alt="avatar" />
        <ChannelHeaderText>
          <h1>Channel Title</h1>
          <p>25K Subscribers</p>
        </ChannelHeaderText>
        <button>Subscribe</button>
      </ChannelHeader>
      <VideoRow>
        {[...Array(20)].map((x, i) => (
          <VideoItem hideChannel key={i} />
        ))}
      </VideoRow>
    </>
  );
};

export default Channel;
