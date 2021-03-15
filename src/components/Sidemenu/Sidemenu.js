import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  MdHome,
  MdWhatshot,
  MdVideoLibrary,
  MdSubscriptions,
  MdHistory,
  MdVideocam,
  MdWatchLater,
} from "react-icons/md";

const NavItem = styled.div`
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

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: flex-start;

    svg {
      font-size: 1.5rem;
    }

    span {
      display: inline-block;
      margin-left: 1rem;
    }
  }
`;

const NavGroup = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
`;

const Nav = styled.nav`
  position: fixed;
  z-index: 3;
  width: 80px;
  height: ${({ theme }) => `calc(100vh - ${theme.sizes.headerHeight})`};
  background: ${({ theme }) => theme.colors.bg.primary};
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  transition: transform 0.2s;
  transform: ${({ showOnMobile }) =>
    showOnMobile ? "translateX(0)" : "translateX(-200px)"};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    transform: translateX(0);
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 235px;
  }
`;

const Sidemenu = ({ showOnMobile }) => {
  return (
    <Nav showOnMobile={showOnMobile}>
      <NavGroup>
        <Link to="/">
          <NavItem active>
            <MdHome /> <span>Home</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdWhatshot /> <span>Trending</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdSubscriptions /> <span>Subscriptions</span>
          </NavItem>
        </Link>
      </NavGroup>
      <NavGroup>
        <Link to="/">
          <NavItem>
            <MdVideoLibrary /> <span>Library</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdHistory /> <span>History</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdVideocam /> <span>My Videos</span>
          </NavItem>
        </Link>
        <Link to="/">
          <NavItem>
            <MdWatchLater /> <span>Watch Later</span>
          </NavItem>
        </Link>
      </NavGroup>
    </Nav>
  );
};

export default Sidemenu;
