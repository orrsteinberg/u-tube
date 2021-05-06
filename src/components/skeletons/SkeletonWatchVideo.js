import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonVideoContainer = styled.div`
  position: relative;
  padding-top: calc(9 / 16 * 100%); // Keep the aspect ratio
`;

const SkeletonWatchVideo = () => {
  const theme = useContext(ThemeContext);

  return (
    <SkeletonTheme
      color={theme.colors.bg.tertiary}
      highlightColor={theme.colors.bg.secondary}
    >
      <SkeletonVideoContainer>
        <Skeleton
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </SkeletonVideoContainer>
      <Skeleton
        style={{
          width: "100%",
          height: "200px",
          marginTop: "1rem",
        }}
      />
    </SkeletonTheme>
  );
};

export default SkeletonWatchVideo;
