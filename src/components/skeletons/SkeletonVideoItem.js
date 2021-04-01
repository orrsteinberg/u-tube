import React from "react";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { theme } from "../../utils/theme";

const SkeletonContainer = styled.div`
  width: 256px;
  margin: 0 auto 1rem auto;
`;

const SkeletonVideoItem = ({ hideChannel }) => {
  return (
    <SkeletonContainer>
      <SkeletonTheme
        color={theme.colors.bg.tertiary}
        highlightColor={theme.colors.bg.secondary}
      >
        <Skeleton height={145} width="100%" />
        <div>
          {!hideChannel && (
            <Skeleton
              style={{ marginRight: "0.75rem" }}
              circle
              height={40}
              width={40}
            />
          )}
          <Skeleton style={{ margin: "0.75rem 0" }} height={50} width="80%" />
        </div>
      </SkeletonTheme>
    </SkeletonContainer>
  );
};

export default SkeletonVideoItem;
