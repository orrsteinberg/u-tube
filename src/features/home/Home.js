import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchHomeVideos,
  selectHomeVideos,
  selectHomeStatus,
  selectHomeError,
} from "./homeSlice";
import { VideoRow } from "../../components/shared";
import VideoItem from "../../components/VideoItem/VideoItem";

const HomeView = () => {
  const status = useSelector(selectHomeStatus);
  const videos = useSelector(selectHomeVideos);
  const error = useSelector(selectHomeError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchHomeVideos());
    }
  }, [dispatch, videos]);

  return (
    <VideoRow>
      {status === "loading" && "Loading videos..."}
      {status === "failed" && <h2>{error}</h2>}
      {status === "succeeded" &&
        videos.map((video) => <VideoItem video={video} key={video.id} />)}
    </VideoRow>
  );
};

export default HomeView;
