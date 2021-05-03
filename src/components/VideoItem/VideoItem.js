import React from "react";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";
import moment from "moment";
import numeral from "numeral";

import { truncateText } from "../../utils/helpers";
import {
  VideoItemContainer,
  Thumbnail,
  Duration,
  Details,
  Meta,
  Statistics,
} from "./VideoItem.styled";
import Avatar from "../Avatar/Avatar";

const VideoItem = ({ video, hideChannel }) => {
  // Destructure
  const { id, thumbnail, channelId, channelTitle, channelAvatar } = video;

  // Format data
  const title = truncateText("title", video.title);

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
          <Link to={`/channel/${channelId}`} title={channelTitle}>
            <Avatar size="sm" src={channelAvatar} alt={channelTitle} />
          </Link>
        )}
        <Meta hideChannel={hideChannel}>
          <Link to={`/watch/${id}`} title={video.title}>
            <h3>{title}</h3>
          </Link>
          {!hideChannel && (
            <Link to={`/channel/${channelId}`}>{channelTitle}</Link>
          )}
          <Statistics>
            <span>
              <span className="count">{viewCount}</span>
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
