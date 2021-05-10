import React from "react";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

import { truncateText } from "../../utils/helpers";
import {
  HorizontalVideoItemContainer,
  ThumbnailLink,
  Duration,
  ItemBody,
  MetadataBox,
  Text,
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
  const title = truncateText("title", video.title);

  const viewCount = numeral(video.viewCount).format("0.a");

  const publishedAt = moment(video.publishedAt).fromNow();

  const durationInSeconds = moment.duration(video.duration).asSeconds();
  const duration = moment.utc(durationInSeconds * 1000).format("mm:ss");

  // Only display description on fullWidth version for search results
  const description =
    fullWidth && truncateText("description", video.description);

  return (
    <HorizontalVideoItemContainer fullWidth={fullWidth}>
      <ThumbnailLink to={`/watch/${id}`}>
        <LazyLoadImage
          alt={`${title} video thumbnail`}
          src={thumbnail}
          effect="opacity"
          wrapperProps={{ style: { display: "block" } }}
        />
        <Duration>{duration}</Duration>
        <MdPlayArrow />
      </ThumbnailLink>
      <ItemBody fullWidth={fullWidth}>
        <Link to={`/watch/${id}`} title={video.title}>
          <h3>{title}</h3>
        </Link>
        <Metadata
          channelId={channelId}
          channelTitle={channelTitle}
          viewCount={viewCount}
          publishedAt={publishedAt}
        />
        <Text>{description}</Text>
      </ItemBody>
    </HorizontalVideoItemContainer>
  );
};

export default HorizontalVideoItem;
