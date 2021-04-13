import styled from "styled-components";
import { shade } from "polished";

import { ReactComponent as YouTubeLogo } from "../../logo.svg";
import { IconButton } from "../shared";

export const HeaderElement = styled.header`
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
  font-size: 2.5rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  background: ${({ theme }) => theme.colors.bg.darker};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 3px;

  &:focus-within {
    background: ${({ theme }) => shade(0.5, theme.colors.bg.primary)};
    //background: ${({ theme }) => theme.colors.bg.secondary};
  }

  input {
    border: 2px solid transparent;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background: none;
    color: ${({ theme }) => theme.colors.text.primary};
    padding-left: 1rem;
    font-size: 1.1rem;
    transition: border 0.2s;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.secondary};
    }

    &:focus {
      outline: none;
      border: 2px solid ${({ theme }) => theme.colors.text.primary};
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 100%;
    }
  }

  button {
    background: ${({ theme }) => shade(0.4, theme.colors.bg.primary)};
    border: none;
    border-bottom: 2px solid transparent;
    color: ${({ theme }) => theme.colors.text.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.75rem;
    cursor: pointer;
    padding: 0.25rem 1rem;
    transition: border 0.2s;

    &:hover {
      border-bottom: 2px solid ${({ theme }) => theme.colors.text.secondary};
    }

    &:active {
      border-bottom: none;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid ${({ theme }) => theme.colors.text.secondary};
      background: ${({ theme }) => shade(0.5, theme.colors.bg.primary)};
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 0.6;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 0.5;
  }
`;
