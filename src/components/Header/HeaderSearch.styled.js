import styled from "styled-components";
import { shade } from "polished";

export const SearchForm = styled.form`
  display: flex;
  background: ${({ theme }) => theme.colors.bg.darker};
  border: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 3px;
  margin: 0 0.25rem;

  &:focus-within {
    background: ${({ theme }) => shade(0.5, theme.colors.bg.primary)};
  }

  input {
    border: 1px solid transparent;
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
      border: 1px solid ${({ theme }) => theme.colors.text.primary};
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
