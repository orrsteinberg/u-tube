import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { theme } from "../../utils/theme";

const SkeletonChannelHeader = () => {
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
