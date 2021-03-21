import React from "react";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";

import { VideoItemContainer, Thumbnail, Duration, Details, Meta, Statistics } from "./VideoItem.styled";


const VideoItem= () => {
  const title =
    Math.floor(Math.random() * 10) > 5
      ? "Video Title"
      : "Video Title Can Actually Be a Prettttttttttttty Long One!";

  return (
    <VideoItemContainer>
      <Link to="/watch">
        <Thumbnail>
          <img src="https://picsum.photos/275/155" alt="video thumbnail" />
          <Duration>3:52</Duration>
          <MdPlayArrow />
        </Thumbnail>
      </Link>
      <Details>
        <Link to="/">
          <img src="https://picsum.photos/40" alt="channel avatar" />
        </Link>
        <Meta>
          <Link to="/watch">
            <h3>{title}</h3>
          </Link>
          <Link to="/">Channel Title</Link>
          <Statistics>
            <span>18M views{" • "}</span>
            <span>2 months ago</span>
          </Statistics>
        </Meta>
      </Details>
    </VideoItemContainer>
  );
};

export default VideoItem;
