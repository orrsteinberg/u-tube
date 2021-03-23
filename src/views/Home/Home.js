import React from "react";

import { VideoRow } from "../../components/shared";
import VideoItem from "../../components/VideoItem/VideoItem";

const HomeView = () => {
  return (
    <VideoRow>
      {[...Array(20)].map((x, i) => (
        <VideoItem key={i} />
      ))}
    </VideoRow>
  );
};

export default HomeView;
