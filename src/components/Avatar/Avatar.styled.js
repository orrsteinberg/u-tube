import styled from "styled-components";

export const AvatarImg = styled.img`
  width: ${({ size }) =>
    size === "sm"
      ? "30px"
      : size === "md"
      ? "40px"
      : size === "lg"
      ? "50px"
      : "auto"};
  border-radius: 50%;
`;
