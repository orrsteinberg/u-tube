import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyles = createGlobalStyle`
  ${normalize()}

  html {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.bg.primary};
  }

  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

`;

export default GlobalStyles;
