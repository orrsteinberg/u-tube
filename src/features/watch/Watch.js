import React from "react";

import Details from "./Details/Details";
import Comments from "./Comments/Comments";
import HorizontalVideoItem from "../../components/HorizontalVideoItem/HorizontalVideoItem";
import { WatchViewContainer, MainCol, Player, RelatedVideosCol } from "./Watch.styled";

const Watch = () => {
  return (
    <WatchViewContainer>
      <MainCol>
        <Player>
          <iframe
            src={`https://www.youtube.com/embed/Hp_Eg8NMfT0`}
            frameBorder="0"
            title="Video title"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </Player>
        <Details />
        <Comments />
      </MainCol>
      <RelatedVideosCol>
        <h2>Related videos:</h2>
        {[...Array(10)].map((x, i) => (
          <HorizontalVideoItem key={i} />
        ))}
      </RelatedVideosCol>
    </WatchViewContainer>
  );
};

export default Watch;
