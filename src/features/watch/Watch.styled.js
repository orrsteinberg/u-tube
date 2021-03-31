import styled from "styled-components";

export const WatchViewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MainCol = styled.div`
  flex-basis: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-basis: 65%;
  }
`;

export const Player = styled.div`
  position: relative;
  padding-top: calc(9 / 16 * 100%); // Keep the aspect ratio

  iframe {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const RelatedVideosCol = styled.div`
  flex-basis: 100%;
  margin-top: 1rem;

  h2 {
    display: block;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      display: none;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    margin-top: 0;
    padding-left: 1rem;
    flex-basis: 35%;
  }
`;
