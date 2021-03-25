import React from "react";
import { Link } from "react-router-dom";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import moment from "moment";
import numeral from "numeral";

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
        <span className="count">{viewCount}</span>
        {" views "}
        {" • "}
        {publishedAt}
        {" as Jun 28, 2020"}
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
  const { id, title, subscriberCount, avatar } = channel;
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
  return (
    <DescriptionContainer>
      <p>{description}</p>
      <button>Show less</button>
    </DescriptionContainer>
  );
};

const Details = ({ video }) => {
  let {
    title,
    description,
    likeCount,
    dislikeCount,
    viewCount,
    publishedAt,
    channel,
  } = video;

  // Format data
  viewCount = numeral(video.viewCount).format("0.a");
  likeCount = numeral(video.likeCount).format("0.a");
  dislikeCount = numeral(video.dislikeCount).format("0.a");

  publishedAt = moment(video.publishedAt).fromNow();

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
