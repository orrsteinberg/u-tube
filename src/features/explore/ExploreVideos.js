import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  fetchVideosToExplore,
  setCurrentCategory,
  selectCurrentCategoryData,
} from "./exploreSlice";
import { NUM_VIDS_TO_FETCH } from "../../utils/constants";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";
import Error from "../../components/Error/Error";

const ExploreVideos = () => {
  const { category } = useParams();
  const currentCategoryData = useSelector(selectCurrentCategoryData);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update state
    dispatch(setCurrentCategory(category));
  }, [dispatch, category]);

  useEffect(() => {
    // On category state update, fetch videos if there aren't any yet
    if (currentCategoryData?.status === "idle") {
      dispatch(fetchVideosToExplore());
    }
  }, [dispatch, currentCategoryData]);

  const getMoreVideos = () => {
    // Fetch more videos on scroll
    if (currentCategoryData.pageToken) {
      dispatch(fetchVideosToExplore());
    }
  };

  if (!currentCategoryData) return null;

  return (
    <InfiniteScroll
      dataLength={currentCategoryData.videos.length || 0}
      next={getMoreVideos}
      hasMore={currentCategoryData.hasMoreVideos}
      // Target parent container by id to detect scroll
      scrollableTarget="view-container"
    >
      <div className="row">
        {currentCategoryData.videos.map((video) => (
          <VideoItem video={video} key={video.id} />
        ))}
        {currentCategoryData.status === "loading" && (
          <>
            {[...Array(NUM_VIDS_TO_FETCH)].map((_, i) => (
              <SkeletonVideoItem key={i} />
            ))}
          </>
        )}
      </div>
      {currentCategoryData.status === "failed" && (
        <Error error={currentCategoryData.error} />
      )}
    </InfiniteScroll>
  );
};

export default ExploreVideos;
