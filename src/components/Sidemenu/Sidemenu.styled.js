import styled, { css } from "styled-components";

export const NavGroup = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;

export const ViewAllSubsButton = styled.button`
  border: 0;
  outline: 0;
  background: none;
  text-align: center;
  display: block;
  width: 100%;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

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

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.text.tertiary};
      cursor: default;
    `}

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

export const AuthButton = styled(NavItem)`
  border: 0;
  box-shadow: inset 5px 0px 0px 1px ${({ theme }) => theme.colors.general.blue};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.general.blue};
  font-weight: bold;
  margin-bottom: 2rem;

  &:hover {
    background: ${({ theme }) => theme.colors.general.blue};
    color: ${({ theme }) => theme.colors.bg.primary};
    box-shadow: inset 10px 0px 0px 1px ${({ theme }) => theme.colors.bg.primary};
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

  // Show compact version of nav items on the Watch view
  & ${NavItem} {
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      ${({ watchView }) =>
        !watchView &&
        css`
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
    // Box shadow var for highlighted channel avatars on md screen
    --highlight: 0px 0px 0px 2px ${({ theme }) => theme.colors.general.blue};
  }

  // Expand menu on large screen if user is not on the watch view
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${({ watchView }) =>
      !watchView &&
      css`
        width: 240px;
        // No need for highlighting avatars on large screen (except on watch view)
        --highlight: none;
      `};
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
