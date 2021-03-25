import React from "react";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";

import {
  VideoItemContainer,
  Thumbnail,
  Duration,
  Details,
  Meta,
  Statistics,
} from "./VideoItem.styled";

const VideoItem = ({ video, hideChannel }) => {
  // Destructure data
  const { title, channelId, channelTitle, publishedAt } = video.snippet;
  const { url: thumbnailURL } = video.snippet.thumbnails.medium;
  const { duration } = video.contentDetails;
  const { viewCount } = video.statistics;

  return (
    <VideoItemContainer>
      <Link to="/watch">
        <Thumbnail>
          <img src={thumbnailURL} alt={`${title} video thumbnail`} />
          <Duration>{duration}</Duration>
          <MdPlayArrow />
        </Thumbnail>
      </Link>
      <Details>
        {!hideChannel && (
          <Link to={`/channel/${channelId}`}>
            <img src="https://picsum.photos/40" alt="channel avatar" />
          </Link>
        )}
        <Meta>
          <Link to="/watch">
            <h3>{title}</h3>
          </Link>
          {!hideChannel && (
            <Link to={`/channel/${channelId}`}>{channelTitle}</Link>
          )}
          <Statistics>
            <span>
              {viewCount}
              {" • "}
            </span>
            <span>{publishedAt}</span>
          </Statistics>
        </Meta>
      </Details>
    </VideoItemContainer>
  );
};

export default VideoItem;
