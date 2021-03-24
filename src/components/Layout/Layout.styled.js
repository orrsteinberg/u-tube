import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  height: ${({ theme }) => `calc(100vh - ${theme.sizes.headerHeight})`};
  margin-top: ${({ theme }) => theme.sizes.headerHeight};
`;

export const ViewContainer = styled.div`
  flex: 1;
  position: relative;
  padding-top: ${({ theme }) => `calc(1rem + ${theme.sizes.decorBarHeight})`};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;

  ::before {
    content: "";
    position: fixed;
    z-index: 2;
    top: ${({ theme }) => theme.sizes.headerHeight};
    left: 0;
    right: 0;
    height: ${({ theme }) => theme.sizes.decorBarHeight};
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.general.accent1} 20%,
      ${({ theme }) => theme.colors.general.accent2} 100%
    );
  }

  ::after {
    content: "";
    background: transparent;
    transition: background 0.2s;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ menuIsOpen, theme }) =>
      menuIsOpen &&
      `::after {
        position: fixed;
        top: ${theme.sizes.headerHeight};
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1;
      }`}
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;