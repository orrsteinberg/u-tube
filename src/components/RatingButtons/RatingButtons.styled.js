import styled, { css } from "styled-components";

import IconButton from "../../components/IconButton/IconButton";

export const LikeButton = styled(IconButton)`
  ${({ highlight, theme }) =>
    highlight &&
    css`
      color: ${({ theme }) => theme.colors.bg.primary};
    `}

  &:disabled: {
    color: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

export const DislikeButton = styled(IconButton)`
  ${({ highlight, theme }) =>
    highlight &&
    css`
      color: ${({ theme }) => theme.colors.bg.primary};
    `}

  &:disabled: {
    color: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

export const RatingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 130px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    margin-right: 0.75rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-right: 0;
      margin-left: 0.75rem;
    }
  }

  button {
    margin: 0 0.25rem;
    font-size: 1.75rem;
  }
`;
