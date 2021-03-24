import React from "react";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";

import {
  HorizontalVideoItemContainer,
  Thumbnail,
  Duration,
  ItemBody,
  MetadataBox,
} from "./HorizontalVideoItem.styled";

const Metadata = () => {
  return (
    <MetadataBox>
      <Link to="/">
        <p>Channel Name</p>
      </Link>
      <span>18M views{" • "}</span>
      <span>2 months ago</span>
    </MetadataBox>
  );
};

const HorizontalVideoItem = ({ fullWidth }) => {
  const title =
    Math.floor(Math.random() * 10) > 5
      ? "Video Title"
      : "Video Title Can Actually Be a Long One!";

  return (
    <HorizontalVideoItemContainer fullWidth={fullWidth}>
      <Thumbnail>
        <img src="https://picsum.photos/275/155" alt="Media thumbnail" />
        <Duration>3:52</Duration>
        <MdPlayArrow />
      </Thumbnail>
      <ItemBody>
        <Link to="/watch">
          <h3>{title}</h3>
        </Link>
        <Metadata />
      </ItemBody>
    </HorizontalVideoItemContainer>
  );
};

export default HorizontalVideoItem;
