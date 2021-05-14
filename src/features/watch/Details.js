import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

import {
  DetailsContainer,
  StatisticsContainer,
  ChannelDetailsContainer,
  ChannelDetailsContent,
  DescriptionContainer,
} from "./Details.styled";
import Avatar from "../../components/Avatar/Avatar";
import SubscribeButton from "../../components/SubscribeButton/SubscribeButton";
import RatingButtons from "../../components/RatingButtons/RatingButtons";

import { useTextExpand } from "../../hooks";

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
  const { content, showToggle, handleToggle, isExpanded } = useTextExpand(
    "description",
    description
  );

  return (
    <DescriptionContainer>
      <p>{content}</p>
      {showToggle && (
        <button onClick={handleToggle}>
          Show {isExpanded ? "less" : "more"}
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

Statistics.propTypes = {
  videoId: PropTypes.string.isRequired,
  likeCount: PropTypes.string.isRequired,
  dislikeCount: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
}

ChannelDetails.propTypes = {
  channel: PropTypes.object.isRequired,
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
}

Details.propTypes = {
  video: PropTypes.object.isRequired,
}

export default Details;
