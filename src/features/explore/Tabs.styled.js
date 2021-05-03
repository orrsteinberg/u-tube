import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

export const TabLink = styled(Link)`
  display: block;
  width: 100%;
  margin: 0.5rem;
`;

export const StyledTab = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg.primary};
  padding: 1rem 0;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text.primary};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    padding: 0.75rem 0 0 0;
  }

  ${({ theme, isActive }) =>
    isActive &&
    css`
      background: ${({ theme }) => theme.colors.bg.tertiary};
    `}

  svg {
    font-size: 2.5rem;
    margin-right: 1.25rem;

    ${({ theme, isActive }) =>
      isActive &&
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
