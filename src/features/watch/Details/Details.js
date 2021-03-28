import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import moment from "moment";
import numeral from "numeral";

import { truncateDescription } from "../../../utils/helpers";
import { IconButton } from "../../../components/shared";
import {
  DetailsContainer,
  StatisticsContainer,
  LikesBox,
  ChannelDetailsContainer,
  ChannelDetailsContent,
  DescriptionContainer,
} from "./Details.styled";

const Statistics = ({ likeCount, dislikeCount, viewCount, publishedAt }) => {
  return (
    <StatisticsContainer>
      <span>
        {viewCount}
        {" views "}
        {" • "}
        {publishedAt}
      </span>
      <LikesBox>
        <span className="count">
          <IconButton>
            <MdThumbUp />
          </IconButton>
          {likeCount}
        </span>
        <span className="count">
          <IconButton>
            <MdThumbDown />
          </IconButton>
          {dislikeCount}
        </span>
      </LikesBox>
    </StatisticsContainer>
  );
};

const ChannelDetails = ({ channel }) => {
  const { id, title, avatar } = channel;
  const subscriberCount = numeral(channel.subscriberCount).format("0,0");

  return (
    <ChannelDetailsContainer>
      <Link to={`/channel/${id}`}>
        <img src={avatar} alt={`${title} avatar`} />
      </Link>
      <ChannelDetailsContent>
        <Link to={`/channel/${id}`}>
          <h3>{title}</h3>
        </Link>
        <span>{subscriberCount} Subscribers</span>
      </ChannelDetailsContent>
      <button>Subscribe</button>
    </ChannelDetailsContainer>
  );
};

const Description = ({ description }) => {
  const [isExpended, setIsExpanded] = useState(false);

  const handleToggleClick = () => setIsExpanded(!isExpended);

  // Truncate description if necessary, only show
  const shortDescription = truncateDescription(description);
  const showToggle =
    shortDescription.length < description.length ? true : false;

  // Display the appropriate version (short or full description)
  // and split description on every newline char so we can format it nicely
  const displayText = isExpended
    ? description.split("\n")
    : shortDescription.split("\n");

  return (
    <DescriptionContainer>
      {displayText.map((lineOfText, i) => (
        <p key={i}>{lineOfText}</p>
      ))}
      {showToggle && (
        <button onClick={handleToggleClick}>
          Show {isExpended ? "less" : "more"}
        </button>
      )}
    </DescriptionContainer>
  );
};

const Details = ({ video }) => {
  const { title, description, channel } = video;

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
      />
      <ChannelDetails channel={channel} />
      <Description description={description} />
    </DetailsContainer>
  );
};

export default Details;
