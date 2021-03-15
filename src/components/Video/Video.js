import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdPlayArrow } from "react-icons/md";

const Statistics = styled.div`
  display: flex;
  margin-top: 0.5rem;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 0.25rem;
  }
`;

const Meta = styled.div`
  padding-left: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  h3 {
    line-height: 1;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const Details = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.75rem;

  img {
    border-radius: 50%;
    object-fit: contain;
  }
`;

const Duration = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.25rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.25rem 0.5rem;
`;

const Thumbnail = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid ${({ theme }) => theme.colors.bg.tertiary};

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.general.accent1} 0%,
      ${({ theme }) => theme.colors.general.accent2} 100%
    );
    opacity: 0;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 6rem;
    color: ${({ theme }) => theme.colors.general.light};
    display: none;
  }

  &:hover {
    ::before {
      opacity: 0.6;
    }

    svg {
      display: block;
    }
  }

  img {
    height: 100%;
    display: block;
  }
`;

const VideoContainer = styled.div`
  margin: 0 auto 1.5rem auto;
  max-width: 260px;
  cursor: pointer;
`;

const Video = () => {
  return (
    <VideoContainer>
      <Thumbnail>
        <img src="https://picsum.photos/275/155" alt="video thumbnail" />
        <Duration>3:52</Duration>
        <MdPlayArrow />
      </Thumbnail>
      <Details>
        <Link to="/">
          <img src="https://picsum.photos/40" alt="channel avatar" />
        </Link>
        <Meta>
          <h3>Video Title</h3>
          <Link to="/">Channel Title</Link>
          <Statistics>
            <span>18M views{" • "}</span>
            <span>2 months ago</span>
          </Statistics>
        </Meta>
      </Details>
    </VideoContainer>
  );
};

export default Video;
