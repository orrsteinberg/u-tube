import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import numeral from "numeral";

import {
  fetchChannelData,
  fetchChannelVideos,
  selectChannelData,
  selectChannelVideos,
} from "./channelSlice";
import { VideoRow } from "../../components/shared";
import { ChannelHeader, ChannelHeaderText } from "./Channel.styled";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";
import SkeletonChannelHeader from "../../components/skeletons/SkeletonChannelHeader";

const Channel = () => {
  const { id } = useParams();
  const {
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

  // Format data
  const subscriberCount = numeral(rawSubscriberCount).format("0,0");
  const videoCount = numeral(rawVideoCount).format("0,0");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannelData(id));
    dispatch(fetchChannelVideos(id));
  }, [id, dispatch]);

  return (
    <>
      {status === "loading" && <SkeletonChannelHeader />}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <ChannelHeader>
          <img src={avatar} alt={`${title} avatar`} />
          <ChannelHeaderText>
            <h1>{title}</h1>
            <p>{subscriberCount} Subscribers</p>
            <p>{videoCount} Videos</p>
          </ChannelHeaderText>
          <button>Subscribe</button>
        </ChannelHeader>
      )}
      <VideoRow>
        {channelVideosStatus === "loading" &&
          [...Array(20)].map((_, i) => (
            <SkeletonVideoItem hideChannel key={i} />
          ))}
        {channelVideosStatus === "failed" && <p>{channelVideosError}</p>}
        {channelVideosStatus === "succeeded" &&
          videos.map((video) => (
            <VideoItem hideChannel video={video} key={video.id} />
          ))}
      </VideoRow>
    </>
  );
};

export default Channel;
