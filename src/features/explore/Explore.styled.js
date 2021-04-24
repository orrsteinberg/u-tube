import styled, { css } from "styled-components";

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

export const StyledCard = styled.div`
  background: ${({ theme }) => theme.colors.bg.primary};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 1rem 0;

  ${({ theme, current }) =>
    current &&
    css`
      background: ${({ theme }) => theme.colors.bg.tertiary};
    `}

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    padding: 0.75rem 0 0 0;
  }

  svg {
    font-size: 2.5rem;
    margin-right: 1.25rem;

    ${({ theme, current }) =>
      current &&
      css`
        color: ${({ theme }) => theme.colors.general.accent2};
      `}

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin: 0;
    }
  }

  h2 {
    font-size: 1.2rem;
    text-transform: capitalize;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bg.tertiary};

    & svg {
      color: ${({ theme }) => theme.colors.general.accent2};
    }
  }
`;

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
