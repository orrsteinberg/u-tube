import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyles = createGlobalStyle`
  ${normalize()}

  html {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
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

  .count {
    text-transform: uppercase;
  }

`;

export default GlobalStyles;
