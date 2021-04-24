import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  fetchChannelData,
  fetchChannelVideos,
  clearChannelView,
  selectChannelData,
  selectChannelVideos,
} from "./channelSlice";
import { NUM_VIDS_TO_FETCH } from "../../utils/constants";
import { VideoRow } from "../../components/shared";
import { StyledChannelHeader, ChannelHeaderText } from "./Channel.styled";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";
import SkeletonChannelHeader from "../../components/skeletons/SkeletonChannelHeader";
import Avatar from "../../components/Avatar/Avatar";
import ChannelStatCount from "../../components/ChannelStatCount/ChannelStatCount";
import SubscribeButton from "../../components/SubscribeButton/SubscribeButton";
import Error from "../../components/Error/Error";

const ChannelHeader = () => {
  const {
    channelId,
    status,
    error,
    title,
    avatar,
    subscriberCount,
    videoCount,
  } = useSelector(selectChannelData);

  return (
    <>
      {status === "loading" && <SkeletonChannelHeader />}
      {status === "failed" && <Error error={error} />}
      {status === "succeeded" && (
        <StyledChannelHeader>
          <Avatar src={avatar} alt={title} />
          <ChannelHeaderText>
            <h1>{title}</h1>
            <ChannelStatCount name="subscriber" count={subscriberCount} />
            <ChannelStatCount name="video" count={videoCount} />
          </ChannelHeaderText>
          <SubscribeButton channelId={channelId} />
        </StyledChannelHeader>
      )}
    </>
  );
};

const ChannelVideos = () => {
  const { status, error, videos } = useSelector(selectChannelVideos);

  return (
    <VideoRow>
      {status === "loading" && (
        <>
          {videos.length > 0 &&
            videos.map((video) => (
              <VideoItem hideChannel video={video} key={video.id} />
            ))}
          {[...Array(NUM_VIDS_TO_FETCH)].map((_, i) => (
            <SkeletonVideoItem hideChannel key={i} />
          ))}
        </>
      )}
      {status === "succeeded" &&
        videos.map((video) => (
          <VideoItem hideChannel video={video} key={video.id} />
        ))}
      {status === "failed" && <Error error={error} />}
    </VideoRow>
  );
};

const Channel = () => {
  const { id: urlParamId } = useParams();
  const { channelId, title } = useSelector(selectChannelData);
  const { videos, hasMoreVideos } = useSelector(selectChannelVideos);
  const dispatch = useDispatch();

  // Fetch more videos on scroll
  const getMoreVideos = useCallback(
    () => dispatch(fetchChannelVideos(urlParamId)),
    [urlParamId, dispatch]
  );

  useEffect(() => {
    // Only fetch initial channel data if it's a new channel (different id than the prev)
    // (on first render channelId would be null so we would fetch data)
    if (urlParamId !== channelId) {
      dispatch(clearChannelView());
      dispatch(fetchChannelData(urlParamId));
    }
  }, [urlParamId, channelId, dispatch]);

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={getMoreVideos}
      hasMore={hasMoreVideos}
      // Target parent container by id to detect scroll
      scrollableTarget="view-container"
    >
      <Helmet>
        <title>{title || "View Channel"} | U-Tube</title>
      </Helmet>
      <ChannelHeader />
      <ChannelVideos />
    </InfiniteScroll>
  );
};

export default Channel;
