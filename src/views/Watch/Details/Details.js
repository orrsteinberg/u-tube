import React from "react";
import { Link } from "react-router-dom";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

import IconButton from "../../../components/shared/IconButton";
import {
  DetailsContainer,
  StatisticsContainer,
  LikesBox,
  ChannelContainer,
  ChannelData,
  DescriptionContainer,
} from "./Details.styled";

const Statistics = () => {
  return (
    <StatisticsContainer>
      <span>8,091,680 views • Jun 28, 2020</span>
      <LikesBox>
        <span>
          <IconButton>
            <MdThumbUp />
          </IconButton>
          46K
        </span>
        <span>
          <IconButton>
            <MdThumbDown />
          </IconButton>
          90
        </span>
      </LikesBox>
    </StatisticsContainer>
  );
};

const Channel = () => {
  return (
    <ChannelContainer>
      <Link to="/">
        <img src="https://picsum.photos/50" alt="Channel avatar" />
      </Link>
      <ChannelData>
        <Link to="/">
          <h3>Channel Title</h3>
        </Link>
        <span>2.3M Subscribers</span>
      </ChannelData>
      <button>Subscribe</button>
    </ChannelContainer>
  );
};

const Description = () => {
  return (
    <DescriptionContainer>
      <p>
        Elit suscipit quibusdam deleniti aliquid velit dicta Ullam
        exercitationem atque porro dignissimos laudantium assumenda Nam eaque
        vitae provident ipsa aut, eaque nemo recusandae? Eos repudiandae! Elit
        distinctio in exercitationem sequi earum. Voluptas temporibus sapiente
        corrupti praesentium distinctio praesentium Rerum explicabo aspernatur
        expedita tenetur quaerat Nemo dolorum quod porro est repellendus
        voluptatem Enim obcaecati placeat saepe error animi. Et quas nulla at
        placeat esse doloribus aliquam? Quis cupiditate nisi modi quia fuga
        Fugiat enim eum dolor
      </p>
      <button>Show less</button>
    </DescriptionContainer>
  );
};

const Details = () => {
  return (
    <DetailsContainer>
      <h1>Positive Mood JAZZ - Sunny Jazz Cafe and Bossa Nova Music</h1>
      <Statistics />
      <Channel />
      <Description />
    </DetailsContainer>
  );
};

export default Details;
