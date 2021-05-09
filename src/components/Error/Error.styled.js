import styled from "styled-components";
import { darken } from "polished";

export const ErrorContainer = styled.div`
  max-width: 380px;
  padding: 0.25rem;
  margin: 1.5rem auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) =>
    theme.name === "light"
      ? darken(0.1, theme.colors.bg.primary)
      : darken(0.16, theme.colors.bg.tertiary)};
  border: 1px solid
    ${({ theme }) =>
      theme.name === "light"
        ? theme.colors.text.tertiary
        : theme.colors.text.tertiary};
  border-radius: 5px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 480px;
  }
`;
