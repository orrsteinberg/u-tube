import React from "react";
import styled from "styled-components";

import Details from "../../components/Details/Details";
import Comments from "../../components/Comments/Comments";

const Player = styled.div`
  position: relative;
  padding-top: calc(9 / 16 * 100%); // Keep the aspect ratio

  iframe {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const MainCol = styled.div`
  flex-basis: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-basis: 66%;
  }
`;

const WatchViewContainer = styled.div`
  display: flex;
`;

const WatchView = () => {
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
    </WatchViewContainer>
  );
};

export default WatchView;
