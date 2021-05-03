import React, { useEffect } from "react";
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
import ChannelHeader from "./ChannelHeader";
import ChannelVideos from "./ChannelVideos";

const Channel = () => {
  const { id: urlParamId } = useParams();
  const { channelId, title } = useSelector(selectChannelData);
  const { videos, hasMoreVideos, pageToken } = useSelector(selectChannelVideos);
  const dispatch = useDispatch();

  // Fetch more videos on scroll
  const getMoreVideos = () => {
    if (pageToken) {
      dispatch(fetchChannelVideos(urlParamId));
    }
  };

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
