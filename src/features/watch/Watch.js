import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  fetchVideoToWatch,
  fetchRelatedVideos,
  fetchComments,
  selectVideoToWatch,
  selectRelatedVideos,
} from "./watchSlice";
import { NUM_RELATED_VIDS_TO_FETCH } from "../../utils/constants";
import Details from "./Details/Details";
import CommentSection from "./CommentSection/CommentSection";
import HorizontalVideoItem from "../../components/HorizontalVideoItem/HorizontalVideoItem";
import SkeletonWatchVideo from "../../components/skeletons/SkeletonWatchVideo";
import SkeletonHorizontalVideoItem from "../../components/skeletons/SkeletonHorizontalVideoItem";
import {
  WatchViewContainer,
  MainCol,
  Player,
  RelatedVideosCol,
} from "./Watch.styled";

const Watch = () => {
  const { id: urlParamId } = useParams();
  const { currentVideo, status, error } = useSelector(selectVideoToWatch);
  const {
    videos,
    status: relatedVideosStatus,
    error: relatedVideosError,
  } = useSelector(selectRelatedVideos);

  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch required data if it's a new video
    if (urlParamId !== currentVideo.id) {
      dispatch(fetchVideoToWatch(urlParamId));
      dispatch(fetchRelatedVideos(urlParamId));
      dispatch(fetchComments(urlParamId));
    }
  }, [urlParamId, currentVideo, dispatch]);

  return (
    <WatchViewContainer>
      <Helmet>
        <title>{currentVideo.title || "Watch"} | U-Tube</title>
      </Helmet>
      <MainCol>
        {status === "loading" && <SkeletonWatchVideo />}
        {status === "failed" && <p>{error}</p>}
        {status === "succeeded" && (
          <>
            <Player>
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.id}`}
                frameBorder="0"
                title="Video title"
                allowFullScreen
                width="100%"
                height="100%"
              ></iframe>
            </Player>
            <Details video={currentVideo} />
          </>
        )}
        <CommentSection />
      </MainCol>
      <RelatedVideosCol>
        <h2>Related videos</h2>
        {relatedVideosStatus === "loading" &&
          [...Array(NUM_RELATED_VIDS_TO_FETCH)].map((_, i) => (
            <SkeletonHorizontalVideoItem key={i} />
          ))}
        {relatedVideosStatus === "failed" && <p>{relatedVideosError}</p>}
        {relatedVideosStatus === "succeeded" &&
          videos.map((video) => (
            <HorizontalVideoItem video={video} key={video.id} />
          ))}
      </RelatedVideosCol>
    </WatchViewContainer>
  );
};

export default Watch;
