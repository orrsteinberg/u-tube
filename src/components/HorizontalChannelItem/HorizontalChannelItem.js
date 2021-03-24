import React from "react";
import { Link } from "react-router-dom";

import {
  HorizontalChannelItemContainer,
  ChannelAvatar,
  ChannelDetails,
} from "./HorizontalChannelItem.styled";

const HorizontalChannelItem = () => {
  return (
    <HorizontalChannelItemContainer>
      <ChannelAvatar>
        <img src="https://picsum.photos/130" alt="Channel avatar" />
      </ChannelAvatar>
      <ChannelDetails>
        <Link to="/channel">
          <h3>Channel Title</h3>
        </Link>
        <p>230 videos</p>
        <p>20K subscribers</p>
      </ChannelDetails>
    </HorizontalChannelItemContainer>
  );
};

export default HorizontalChannelItem;
