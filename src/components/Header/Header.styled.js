import styled from "styled-components";
import { shade } from "polished";

import { ReactComponent as YouTubeLogo } from "../../logo.svg";
import IconButton from "../shared/IconButton";

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
    width: 40px;
    object-fit: contain;
    border-radius: 50%;
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
  font-size: 3rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  background: ${({ theme }) => theme.colors.bg.darker};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 3px;

  input {
    border: none;
    background: none;
    color: ${({ theme }) => theme.colors.text.primary};
    padding-left: 1rem;
    font-size: 1.1rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.secondary};
    }

    &:focus {
      outline: none;
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 100%;
    }
  }

  button {
    background: ${({ theme }) => shade(0.4, theme.colors.bg.primary)};
    border: none;
    color: ${({ theme }) => theme.colors.text.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.75rem;
    cursor: pointer;
    padding: 0.25rem 1rem;

    &:focus {
      outline: none;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 0.6;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 0.5;
  }
`;