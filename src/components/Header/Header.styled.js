import styled from "styled-components";

import { ReactComponent as YouTubeLogo } from "../../assets/logo.svg";
import IconButton from "../IconButton/IconButton";

export const StyledHeader = styled.header`
  position: fixed;
  z-index: 4;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.bg.primary};
  height: ${({ theme }) => theme.sizes.headerHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  transition: background 0.2s;
`;

export const HeaderLogo = styled(YouTubeLogo)`
  display: none;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    width: 50px;
    margin-left: 0.5rem;
    max-height: 45px;
  }
`;

export const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    margin-left: 0.2rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-left: 1rem;
    }
  }

  button {
    display: none;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
    }
  }
`;

export const ToggleButton = styled(IconButton)`
  font-size: 2.2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
