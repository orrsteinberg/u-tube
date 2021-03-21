import React from "react";

import VideoItem from "../../components/VideoItem/VideoItem";
import { VideosRow } from "./Home.styled";

const HomeView = () => {
  return (
    <VideosRow>
      {[...Array(20)].map((x, i) => (
        <VideoItem key={i} />
      ))}
    </VideosRow>
  );
};

export default HomeView;
