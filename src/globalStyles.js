import { createGlobalStyle, css } from "styled-components";
import { normalize } from "polished";

const confirmAlertStyles = css`
  body.react-confirm-alert-body-element {
    overflow: hidden;
  }
  .react-confirm-alert-blur {
    filter: url(#gaussian-blur);
    filter: blur(2px);
  }

  .react-confirm-alert-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 101;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    animation: react-confirm-alert-fadeIn 0.2s 0.2s forwards;
  }

  .react-confirm-alert-body {
    font-family: Arial, Helvetica, sans-serif;
    width: 400px;
    padding: 2rem;
    text-align: center;
    background: ${({ theme }) => theme.colors.bg.primary};
    border-radius: 5px;
    box-shadow: 0 20px 75px rgba(0, 0, 0, 0.3);
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .react-confirm-alert-svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .react-confirm-alert-body > h1 {
    margin-top: 0;
    font-size: 1.25rem;
  }

  .react-confirm-alert-body > h3 {
    margin: 0;
  }

  .react-confirm-alert-button-group {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .react-confirm-alert-button-group > button {
    outline: none;
    border: none;
    display: inline-block;
    padding: 0.5rem 1.25rem;
    color: ${({ theme }) => theme.colors.general.light};
    margin-right: 0.75rem;
    border-radius: 3px;
    font-size: 1rem;
    cursor: pointer;
  }

  .react-confirm-alert-button-group > button:nth-child(1) {
    background: ${({ theme }) => theme.colors.general.red};
  }

  .react-confirm-alert-button-group > button:nth-child(2) {
    background: ${({ theme }) => theme.colors.general.faded};
  }

  @-webkit-keyframes react-confirm-alert-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-moz-keyframes react-confirm-alert-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-o-keyframes react-confirm-alert-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes react-confirm-alert-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

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
    transition: background 0.2s;
  }

  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

  button:active {
    filter: brightness(0.8);
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

  /* Override react-confirm-alert styles */
  ${confirmAlertStyles}
`;

export default GlobalStyles;
