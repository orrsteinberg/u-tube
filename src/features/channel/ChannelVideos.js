import React from "react";
import { useSelector } from "react-redux";

import { selectChannelVideos } from "./channelSlice";
import { NUM_VIDS_TO_FETCH } from "../../utils/constants";
import VideoItem from "../../components/VideoItem/VideoItem";
import SkeletonVideoItem from "../../components/skeletons/SkeletonVideoItem";
import Error from "../../components/Error/Error";

const ChannelVideos = () => {
  const { status, error, videos } = useSelector(selectChannelVideos);

  return (
    <div className="row">
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
    </div>
  );
};

export default ChannelVideos;
