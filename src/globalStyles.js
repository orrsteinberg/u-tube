import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyles = createGlobalStyle`
  ${normalize()}

  html {
    box-sizing: border-box;
    font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-size: 0.9rem;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.bg.darker};
    overflow-x: hidden;
  }

  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

  /* Utility Classes */

  .hideOnMobile {
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }

  .count {
    text-transform: uppercase;
  }

  .circleHighlight {
    color: ${({ theme }) => theme.colors.general.blue};
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export default GlobalStyles;
