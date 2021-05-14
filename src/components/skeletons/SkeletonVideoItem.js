import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonContainer = styled.div`
  margin: 0 auto 1.75rem auto;
  flex-basis: 90%;
  max-width: 380px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-basis: 48%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-basis: 29%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-basis: 24%;
  }
`;

const SkeletonVideoItem = ({ hideChannel }) => {
  const theme = useContext(ThemeContext);

  return (
    <SkeletonContainer>
      <SkeletonTheme
        color={theme.colors.bg.tertiary}
        highlightColor={theme.colors.bg.secondary}
      >
        <Skeleton style={{ paddingTop: "calc(9/16 * 100%)" }} width="100%" />
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

SkeletonVideoItem.propTypes = {
  hideChannel: PropTypes.bool
}

export default SkeletonVideoItem;
