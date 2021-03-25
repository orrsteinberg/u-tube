import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchHomeVideos,
  selectAllVideos,
  selectHomeStatus,
} from "./homeSlice";
import { VideoRow } from "../../components/shared";
import VideoItem from "../../components/VideoItem/VideoItem";

const HomeView = () => {
  const videos = useSelector(selectAllVideos);
  const status = useSelector(selectHomeStatus);
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
