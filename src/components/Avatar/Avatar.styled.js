import styled, { css } from "styled-components";

export const AvatarImg = styled.img`
  width: ${({ size }) =>
    size === "xs"
      ? "26px"
      : size === "sm"
      ? "36px"
      : size === "md"
      ? "40px"
      : size === "lg"
      ? "50px"
      : "auto"};
  border-radius: 50%;

  ${({ highlight }) =>
    highlight &&
    css`
      box-shadow: var(--highlight);
    `}
`;
