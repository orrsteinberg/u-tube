import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchVideoToWatch,
  selectCurrentVideo,
  seletchWatchStatus,
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
  const status = useSelector(seletchWatchStatus);
  const video = useSelector(selectCurrentVideo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideoToWatch(id));
  }, [id, dispatch]);

  return (
    <WatchViewContainer>
      <MainCol>
        {status === "succeeded" && (
          <>
            <Player>
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
                title="Video title"
                allowFullScreen
                width="100%"
                height="100%"
              ></iframe>
            </Player>
            <Details video={video} />
          </>
        )}
        <Comments />
      </MainCol>
      <RelatedVideosCol>
        <h2>Related videos:</h2>
        {[...Array(10)].map((x, i) => (
          <HorizontalVideoItem key={i} />
        ))}
      </RelatedVideosCol>
    </WatchViewContainer>
  );
};

export default Watch;
