import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonContainer = styled.div`
  font-size: ${({ fullWidth }) => (fullWidth ? "1.1rem" : "1rem")};
  margin: 1.5rem auto;
  max-width: 90%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: ${({ fullWidth }) => (fullWidth ? "680px" : "600px")};
    margin: ${({ fullWidth }) =>
      fullWidth ? "0 0 1.25rem 0" : "0 0 0.75rem 0"};
  }
`;

const SkeletonHorizontalVideoItem = () => {
  const theme = useContext(ThemeContext);

  return (
    <SkeletonContainer>
      <SkeletonTheme
        color={theme.colors.bg.tertiary}
        highlightColor={theme.colors.bg.secondary}
      >
        <Skeleton height={125} style={{ width: "50%" }} />
        <Skeleton style={{ marginLeft: "0.5rem", width: "45%" }} height={40} />
      </SkeletonTheme>
    </SkeletonContainer>
  );
};

export default SkeletonHorizontalVideoItem;
