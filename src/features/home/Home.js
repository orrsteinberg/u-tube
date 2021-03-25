import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchHomeVideos,
  selectHomeVideos,
  selectHomeStatus,
} from "./homeSlice";
import { VideoRow } from "../../components/shared";
import VideoItem from "../../components/VideoItem/VideoItem";

const HomeView = () => {
  const status = useSelector(selectHomeStatus);
  const videos = useSelector(selectHomeVideos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeVideos());
  }, [dispatch]);

  return (
    <VideoRow>
      {status === "loading" && "Loading videos..."}
      {videos.map((video) => (
        <VideoItem video={video} key={video.id} />
      ))}
    </VideoRow>
  );
};

export default HomeView;
