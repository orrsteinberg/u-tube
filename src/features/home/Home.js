import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchHomeVideos, selectHome } from "./homeSlice";
import { VideoRow } from "../../components/shared";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";

const HomeView = () => {
  const { status, videos, error } = useSelector(selectHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeVideos());
  }, [dispatch]);

  return (
    <VideoRow>
      {status === "loading" &&
        [...Array(20)].map((_, i) => <SkeletonVideoItem key={i} />)}
      {status === "succeeded" &&
        videos.map((video) => <VideoItem video={video} key={video.id} />)}
      {status === "failed" && <h2>{error}</h2>}
    </VideoRow>
  );
};

export default HomeView;
