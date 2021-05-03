import styled from "styled-components";

export const ExploreText = styled.h3`
  display: block;
  margin-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text.tertiary};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;
