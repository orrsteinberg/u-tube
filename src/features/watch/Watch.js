import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchVideoToWatch,
  fetchRelatedVideos,
  selectVideoToWatch,
  selectRelatedVideos,
} from "./watchSlice";
import Details from "./Details/Details";
import Comments from "./Comments/Comments";
import HorizontalVideoItem from "../../components/HorizontalVideoItem/HorizontalVideoItem";
import {
  WatchViewContainer,
  MainCol,
  Player,
  RelatedVideosCol,
} from "./Watch.styled";

const Watch = () => {
  const { id } = useParams();
  const { currentVideo, status, error } = useSelector(selectVideoToWatch);
  const {
    videos,
    status: relatedVideosStatus,
    error: relatedVideosError,
  } = useSelector(selectRelatedVideos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideoToWatch(id));
    dispatch(fetchRelatedVideos(id));
  }, [id, dispatch]);

  return (
    <WatchViewContainer>
      <MainCol>
        {status === "loading" && <p>Loading...</p>}
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
        <Comments />
      </MainCol>
      <RelatedVideosCol>
        <h2>Related videos:</h2>
        {relatedVideosStatus === "loading" && <p>Loading videos...</p>}
        {relatedVideosStatus === "failed" && <p>{error}</p>}
        {relatedVideosStatus === "succeeded" &&
          videos.map((video) => (
            <HorizontalVideoItem video={video} key={video.id} />
          ))}
      </RelatedVideosCol>
    </WatchViewContainer>
  );
};

export default Watch;
