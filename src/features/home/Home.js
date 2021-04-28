import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchHomeVideos, selectHome } from "./homeSlice";
import { NUM_VIDS_TO_FETCH } from "../../utils/constants";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";
import Error from "../../components/Error/Error";

const HomeView = () => {
  const { status, videos, error, hasMoreVideos } = useSelector(selectHome);
  const dispatch = useDispatch();

  const getVideos = useCallback(() => dispatch(fetchHomeVideos()), [dispatch]);

  useEffect(() => {
    // Auto fetch videos if there aren't any yet
    if (videos.length === 0) {
      getVideos();
    }
  }, [videos, getVideos]);

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={getVideos}
      hasMore={hasMoreVideos}
      // Target parent container by id to detect scroll
      scrollableTarget="view-container"
    >
      <Helmet>
        <title>Home | U-Tube</title>
      </Helmet>
      <div className="row">
        {status === "loading" && (
          <>
            {videos.length > 0 &&
              videos.map((video) => <VideoItem video={video} key={video.id} />)}
            {[...Array(NUM_VIDS_TO_FETCH)].map((_, i) => (
              <SkeletonVideoItem key={i} />
            ))}
          </>
        )}
        {status === "succeeded" &&
          videos.map((video) => <VideoItem video={video} key={video.id} />)}
      </div>
      {status === "failed" && <Error error={error} />}
    </InfiniteScroll>
  );
};

export default HomeView;
