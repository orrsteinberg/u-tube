import React from "react";
import { useSelector } from "react-redux";

import { selectVideoToWatch, selectRelatedVideos } from "./watchSlice";
import { NUM_RELATED_VIDS_TO_FETCH } from "../../utils/constants";
import HorizontalVideoItem from "../../components/HorizontalVideoItem/HorizontalVideoItem";
import SkeletonHorizontalVideoItem from "../../components/skeletons/SkeletonHorizontalVideoItem";
import Error from "../../components/Error/Error";

const RelatedVideos = () => {
  const { status: videoToWatchStatus } = useSelector(selectVideoToWatch);
  const { status, videos, error } = useSelector(selectRelatedVideos);

  // Because we only fetch related videos if the main videoToWatch request succeeds
  // we display loading skeletons while the main video is loading as well.
  // this way we avoid simply showing empty space until the main video fetch succeeds

  return (
    <>
      {(videoToWatchStatus === "loading" || status === "loading") && (
        <>
          <h2>Related videos</h2>
          {[...Array(NUM_RELATED_VIDS_TO_FETCH)].map((_, i) => (
            <SkeletonHorizontalVideoItem key={i} />
          ))}
        </>
      )}
      {status === "failed" && <Error error={error} />}
      {status === "succeeded" && (
        <>
          <h2>Related videos</h2>
          {videos.map((video) => (
            <HorizontalVideoItem video={video} key={video.id} />
          ))}
        </>
      )}
    </>
  );
};

export default RelatedVideos;
