import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { theme } from "../../utils/theme";

const SkeletonVideoItem = () => {
  return (
    <div style={{ width: "256px", margin: "1rem auto" }}>
      <SkeletonTheme
        color={theme.colors.bg.tertiary}
        highlightColor={theme.colors.bg.secondary}
      >
        <Skeleton height={145} width="100%" />
        <div>
          <Skeleton
            style={{ margin: "0.75rem 0.75rem 0.75rem 0" }}
            circle
            height={40}
            width={40}
          />
          <Skeleton height={40} width="80%" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default SkeletonVideoItem;