import React from "react";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";
import moment from "moment";
import numeral from "numeral";

import {
  VideoItemContainer,
  Thumbnail,
  Duration,
  Details,
  Meta,
  Statistics,
} from "./VideoItem.styled";

const VideoItem = ({ video, hideChannel }) => {
  // Destructure
  const {
    id,
    title,
    thumbnail,
    channelId,
    channelTitle,
    channelAvatar,
  } = video;

  // Format data
  const viewCount = numeral(video.viewCount).format("0.a");

  const publishedAt = moment(video.publishedAt).fromNow();

  const durationInSeconds = moment.duration(video.duration).asSeconds();
  const duration = moment.utc(durationInSeconds * 1000).format("mm:ss");

  return (
    <VideoItemContainer>
      <Link to={`/watch/${id}`}>
        <Thumbnail>
          <img src={thumbnail} alt={`${title} video thumbnail`} />
          <Duration>{duration}</Duration>
          <MdPlayArrow />
        </Thumbnail>
      </Link>
      <Details>
        {!hideChannel && (
          <Link to={`/channel/${channelId}`}>
            <img src={channelAvatar} alt={`${channelTitle} avatar`} />
          </Link>
        )}
        <Meta>
          <Link to={`/watch/${id}`}>
            <h3>{title}</h3>
          </Link>
          {!hideChannel && (
            <Link to={`/channel/${channelId}`}>{channelTitle}</Link>
          )}
          <Statistics>
            <span>
              <span id="viewCount">{viewCount}</span>
              {" views "}
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
