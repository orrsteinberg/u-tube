import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import numeral from "numeral";
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
import { ChannelHeader, ChannelHeaderText } from "./Channel.styled";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";
import SkeletonChannelHeader from "../../components/skeletons/SkeletonChannelHeader";
import Avatar from "../../components/Avatar/Avatar";

const Channel = () => {
  const { id: urlParamId } = useParams();
  const dispatch = useDispatch();
  const {
    channelId,
    status,
    error,
    title,
    avatar,
    subscriberCount: rawSubscriberCount,
    videoCount: rawVideoCount,
  } = useSelector(selectChannelData);
  const {
    status: channelVideosStatus,
    error: channelVideosError,
    videos,
  } = useSelector(selectChannelVideos);

  // Fetch more videos on scroll
  const getMoreVideos = useCallback(
    () => dispatch(fetchChannelVideos(urlParamId)),
    [urlParamId, dispatch]
  );

  useEffect(() => {
    // Only fetch initial channel data if it's a new channel (different id than the prev)
    // (on first render channelId would be null therefore we would fetch data)
    if (urlParamId !== channelId) {
      dispatch(clearChannelView());
      dispatch(fetchChannelData(urlParamId));
    }
  }, [urlParamId, channelId, dispatch]);

  // Format data
  const videoCount =
    rawVideoCount === 0 ? "No" : numeral(rawVideoCount).format("0,0");
  const subscriberCount =
    rawSubscriberCount === 0 ? "No" : numeral(rawSubscriberCount).format("0,0");

  return (
    <InfiniteScroll
      dataLength={videos.length}
      next={getMoreVideos}
      hasMore={true}
      // Target parent container by id to detect scroll
      scrollableTarget="view-container"
    >
      <Helmet>
        <title>{title || "View Channel"} | U-Tube</title>
      </Helmet>
      {status === "loading" && <SkeletonChannelHeader />}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <ChannelHeader>
          <Avatar src={avatar} alt={title} />
          <ChannelHeaderText>
            <h1>{title}</h1>
            <p>
              {subscriberCount === "1"
                ? `1 subscriber`
                : `${subscriberCount} subscribers`}
            </p>
            <p>{videoCount === "1" ? `1 video` : `${videoCount} videos`}</p>
          </ChannelHeaderText>
          <button>Subscribe</button>
        </ChannelHeader>
      )}
      <VideoRow>
        {channelVideosStatus === "loading" && (
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
        {channelVideosStatus === "succeeded" &&
          videos.map((video) => (
            <VideoItem hideChannel video={video} key={video.id} />
          ))}
        {channelVideosStatus === "failed" && <p>{channelVideosError}</p>}
      </VideoRow>
    </InfiniteScroll>
  );
};

export default Channel;
