import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchHomeVideos, selectHome } from "./homeSlice";
import { NUM_VIDS_TO_FETCH } from "../../utils/constants";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";
import Error from "../../components/Error/Error";

const Home = () => {
  const { status, videos, error, hasMoreVideos, pageToken } = useSelector(
    selectHome
  );
  const dispatch = useDispatch();

  // Fetch more videos on scroll
  const getMoreVideos = () => {
    if (pageToken) {
      dispatch(fetchHomeVideos());
    }
  };

  useEffect(() => {
    // Auto fetch videos if there aren't any yet
    if (videos.length === 0) {
      dispatch(fetchHomeVideos());
    }
  }, [videos, dispatch]);

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={getMoreVideos}
      hasMore={hasMoreVideos}
      // Target parent container by id to detect scroll
      scrollableTarget="view-container"
    >
      <Helmet>
        <title>Home | U-Tube</title>
      </Helmet>
      <div className="row">
        {videos.map((video) => (
          <VideoItem video={video} key={video.id} />
        ))}
        {status === "loading" && (
          <>
            {[...Array(NUM_VIDS_TO_FETCH)].map((_, i) => (
              <SkeletonVideoItem key={i} />
            ))}
          </>
        )}
      </div>
      {status === "failed" && <Error error={error} />}
    </InfiniteScroll>
  );
};

export default Home;
