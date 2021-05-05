import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import moment from "moment";
import numeral from "numeral";

import { truncateText } from "../../utils/helpers";
import {
  DetailsContainer,
  StatisticsContainer,
  LikesBox,
  ChannelDetailsContainer,
  ChannelDetailsContent,
  DescriptionContainer,
} from "./Details.styled";
import Avatar from "../../components/Avatar/Avatar";
import SubscribeButton from "../../components/SubscribeButton/SubscribeButton";
import IconButton from "../../components/IconButton/IconButton";

import RatingButtons from "../../components/RatingButtons/RatingButtons";

const Statistics = ({
  videoId,
  likeCount,
  dislikeCount,
  viewCount,
  publishedAt,
}) => {
  return (
    <StatisticsContainer>
      <span>
        {viewCount}
        {" views "}
        {" • "}
        {publishedAt}
      </span>
      <RatingButtons
        videoId={videoId}
        likeCount={likeCount}
        dislikeCount={dislikeCount}
      />
    </StatisticsContainer>
  );
};

const ChannelDetails = ({ channel }) => {
  const { id, title, avatar } = channel;
  const subscriberCount = numeral(channel.subscriberCount).format("0,0");

  return (
    <ChannelDetailsContainer>
      <Link to={`/channel/${id}`}>
        <Avatar size="lg" src={avatar} alt={title} />
      </Link>
      <ChannelDetailsContent>
        <Link to={`/channel/${id}`}>
          <h3>{title}</h3>
        </Link>
        <span>{subscriberCount} Subscribers</span>
      </ChannelDetailsContent>
      <SubscribeButton channelId={id} />
    </ChannelDetailsContainer>
  );
};

const Description = ({ description }) => {
  const [isExpended, setIsExpanded] = useState(false);

  const handleToggleClick = () => setIsExpanded(!isExpended);

  // Truncate description, and if it's still the same length, hide toggle button
  const shortDescription = truncateText("description", description);
  const showToggle =
    shortDescription.length < description.length ? true : false;

  // Display the appropriate version (short or full description)
  const displayText = isExpended ? description : shortDescription;

  return (
    <DescriptionContainer>
      <p>{displayText}</p>
      {showToggle && (
        <button onClick={handleToggleClick}>
          Show {isExpended ? "less" : "more"}
        </button>
      )}
    </DescriptionContainer>
  );
};

const Details = ({ video }) => {
  const { id, title, description, channel } = video;

  // Format data
  const viewCount = numeral(video.viewCount).format("0,0");
  const likeCount = numeral(video.likeCount).format("0.a");
  const dislikeCount = numeral(video.dislikeCount).format("0.a");
  const publishedAt = moment(video.publishedAt).format("MMM D, YYYY");

  return (
    <DetailsContainer>
      <h1>{title}</h1>
      <Statistics
        viewCount={viewCount}
        publishedAt={publishedAt}
        likeCount={likeCount}
        dislikeCount={dislikeCount}
        videoId={id}
      />
      <ChannelDetails channel={channel} />
      <Description description={description} />
    </DetailsContainer>
  );
};

export default Details;
