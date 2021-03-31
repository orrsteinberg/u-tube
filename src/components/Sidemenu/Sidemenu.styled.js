import styled from "styled-components";

export const NavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: ${({ theme, active }) =>
    active ? theme.colors.bg.secondary : "none"};
  color: ${({ theme, active }) =>
    active ? theme.colors.text.primary : theme.colors.text.secondary};
  font-weight: ${({ active }) => (active ? "bold" : "regular")};

  &:hover {
    background: ${({ theme }) => theme.colors.bg.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  svg {
    font-size: 1.8rem;
  }

  span {
    display: none;
  }
`;

export const Nav = styled.nav`
  position: fixed;
  z-index: 3;
  width: 80px;
  height: ${({ theme }) => `calc(100vh - ${theme.sizes.headerHeight})`};
  overflow: auto;
  background: ${({ theme }) => theme.colors.bg.primary};
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  transition: transform 0.2s, width 0.2s;
  transform: ${({ showOnMobile }) =>
    showOnMobile ? "translateX(0)" : "translateX(-200px)"};

  // Show compact version of nav items on the watch view
  & ${NavItem} {
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      ${({ watchView }) =>
        !watchView &&
        `
          justify-content: flex-start;

          svg {
            font-size: 1.5rem;
          }

          span {
            display: inline-block;
            margin-left: 1rem;
          }
        `};
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    transform: translateX(0);
  }

  // Expand menu on large screen if user is not on the watch view
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ watchView }) => !watchView && "width: 230px"};
  }

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 11px;
  }
  & {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) =>
      `${theme.colors.bg.tertiary} ${theme.colors.bg.primary}`};
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg.primary};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.bg.tertiary};
    border-radius: 6px;
    border: 3px solid ${({ theme }) => theme.colors.bg.primary};
  }
`;

export const NavGroup = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;
