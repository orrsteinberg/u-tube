import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IoMusicalNotes,
  IoGameController,
  IoNewspaper,
  IoTrophy,
  IoHappy,
} from "react-icons/io5";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  fetchVideosToExplore,
  setCurrentCategory,
  selectCurrentCategory,
  selectExploreCategory,
} from "./exploreSlice";
import { CardsContainer, StyledCard, ExploreText } from "./Explore.styled";
import { NUM_VIDS_TO_FETCH } from "../../utils/constants";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";
import Error from "../../components/Error/Error";

const Card = ({ title, icon, onClick }) => {
  const currentCategory = useSelector(selectCurrentCategory);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentCategory(title));
  };

  return (
    <StyledCard
      onClick={handleClick}
      ariaRole="button"
      current={currentCategory === title}
    >
      {icon} <h2>{title}</h2>
    </StyledCard>
  );
};

const CategoryCards = () => {
  return (
    <CardsContainer>
      <Card title="music" icon={<IoMusicalNotes />} />
      <Card title="gaming" icon={<IoGameController />} />
      <Card title="news" icon={<IoNewspaper />} />
      <Card title="sports" icon={<IoTrophy />} />
      <Card title="comedy" icon={<IoHappy />} />
    </CardsContainer>
  );
};

const Explore = () => {
  const activeCategory = useSelector(selectExploreCategory);
  const dispatch = useDispatch();

  const getVideos = useCallback(() => dispatch(fetchVideosToExplore()), [
    dispatch,
  ]);

  useEffect(() => {
    // On state change, fetch videos if there aren't any already
    if (activeCategory?.status === "idle") {
      getVideos();
    }
  }, [getVideos, activeCategory]);

  return (
    <InfiniteScroll
      dataLength={activeCategory?.videos.length || 0}
      next={getVideos}
      hasMore={activeCategory?.hasMoreVideos}
      // Target parent container by id to detect scroll
      scrollableTarget="view-container"
    >
      <Helmet>
        <title>Explore | U-Tube</title>
      </Helmet>
      <CategoryCards />
      {!activeCategory && (
        <ExploreText>
          Click on a category to explore trending videos
        </ExploreText>
      )}
      {activeCategory && (
        <>
          <div className="row">
            {activeCategory.status === "loading" && (
              <>
                {activeCategory.videos.length > 0 &&
                  activeCategory.videos.map((video) => (
                    <VideoItem video={video} key={video.id} />
                  ))}
                {[...Array(NUM_VIDS_TO_FETCH)].map((_, i) => (
                  <SkeletonVideoItem key={i} />
                ))}
              </>
            )}
            {activeCategory.status === "succeeded" &&
              activeCategory.videos.map((video) => (
                <VideoItem video={video} key={video.id} />
              ))}
          </div>
          {activeCategory.status === "failed" && (
            <Error error={activeCategory.error} />
          )}
        </>
      )}
    </InfiniteScroll>
  );
};

export default Explore;
