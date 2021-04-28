import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { fetchVideoToWatch, selectVideoToWatch } from "./watchSlice";
import {
  WatchViewContainer,
  MainCol,
  RelatedVideosCol,
  Player,
} from "./Watch.styled";
import Details from "./Details";
import CommentSection from "./CommentSection";
import RelatedVideos from "./RelatedVideos";
import SkeletonWatchVideo from "../../components/skeletons/SkeletonWatchVideo";
import Error from "../../components/Error/Error";

const Watch = () => {
  const { id: urlParamId } = useParams();
  const { currentVideo, status, error } = useSelector(selectVideoToWatch);

  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch required data if it's a new video
    if (urlParamId !== currentVideo.id) {
      dispatch(fetchVideoToWatch(urlParamId));
    }
  }, [urlParamId, currentVideo, dispatch]);

  return (
    <WatchViewContainer>
      <Helmet>
        <title>{currentVideo.title || "Watch"} | U-Tube</title>
      </Helmet>
      <MainCol>
        {status === "loading" && <SkeletonWatchVideo />}
        {status === "failed" && <Error error={error} />}
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
        <RelatedVideos />
      </RelatedVideosCol>
    </WatchViewContainer>
  );
};

export default Watch;
