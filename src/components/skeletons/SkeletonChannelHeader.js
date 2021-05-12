import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonChannelHeader = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ width: "100%", marginBottom: "2rem" }}>
      <SkeletonTheme
        color={theme.colors.bg.tertiary}
        highlightColor={theme.colors.bg.secondary}
      >
        <Skeleton height={130} width="100%" />
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonChannelHeader;
