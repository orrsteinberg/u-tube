import React from "react";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";
import moment from "moment";
import numeral from "numeral";

import { truncateTitle } from "../../utils/helpers";
import {
  HorizontalVideoItemContainer,
  Thumbnail,
  Duration,
  ItemBody,
  MetadataBox,
} from "./HorizontalVideoItem.styled";

const Metadata = ({ channelId, channelTitle, viewCount, publishedAt }) => {
  return (
    <MetadataBox>
      <Link to={`/channel/${channelId}`}>
        <p>{channelTitle}</p>
      </Link>
      <span>
        <span className="count">{viewCount}</span>
        {" views "}
        {" • "}
      </span>
      <span>{publishedAt}</span>
    </MetadataBox>
  );
};

const HorizontalVideoItem = ({ video, fullWidth }) => {
  // Destructure
  const { id, thumbnail, channelId, channelTitle } = video;

  // Format data
  const title = truncateTitle(video.title);

  const viewCount = numeral(video.viewCount).format("0.a");

  const publishedAt = moment(video.publishedAt).fromNow();

  const durationInSeconds = moment.duration(video.duration).asSeconds();
  const duration = moment.utc(durationInSeconds * 1000).format("mm:ss");

  return (
    <HorizontalVideoItemContainer fullWidth={fullWidth}>
      <Thumbnail>
        <Link to={`/watch/${id}`}>
          <img src={thumbnail} alt={`${title} video thumbnail`} />
          <Duration>{duration}</Duration>
          <MdPlayArrow />
        </Link>
      </Thumbnail>
      <ItemBody>
        <Link to={`/watch/${id}`}>
          <h3>{title}</h3>
        </Link>
        <Metadata
          channelId={channelId}
          channelTitle={channelTitle}
          viewCount={viewCount}
          publishedAt={publishedAt}
        />
      </ItemBody>
    </HorizontalVideoItemContainer>
  );
};

export default HorizontalVideoItem;
