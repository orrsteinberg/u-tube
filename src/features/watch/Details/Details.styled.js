import styled from "styled-components";
import { lighten } from "polished";

export const DetailsContainer = styled.div`
  padding-bottom: 0.5rem;

  h1 {
    margin: 1rem 0 0.5rem 0;
    font-size: 1.4rem;
    letter-spacing: 0.6px;
    line-height: 1;
    font-weight: normal;
  }

  span {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }
`;
export const StatisticsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text.tertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  padding-bottom: 0.75rem;

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  span {
    font-size: 1.2rem;
  }

  button {
    margin: 0 0.25rem;
    font-size: 1.75rem;

    &:hover {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

export const LikesBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 130px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};

  span {
    margin-right: 0.75rem;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-right: 0;
      margin-left: 0.75rem;
    }
  }
`;

export const ChannelDetailsContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  padding: 0.75rem 0;

  img {
    border-radius: 50%;
    object-fit: contain;
    width: 50px;
  }

  h3 {
    line-height: 1;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
  }

  span {
    margin-top: 0.25rem;
    font-size: 1rem;
  }

  button {
    border: 0;
    background: ${({ theme }) => theme.colors.general.red};
    color: ${({ theme }) => theme.colors.general.light};
    font-size: 1.1rem;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    margin-left: auto;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.general.light};
    }
  }
`;

export const ChannelDetailsContent = styled.div`
  margin-left: 0.75rem;
`;

export const DescriptionContainer = styled.div`
  padding-left: 0.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: calc(50px + 0.75rem);
  }

  p {
    margin: 0;
    max-width: 500px;
    letter-spacing: 0.4px;
    line-height: 1.4;
    color: ${({ theme }) => lighten(0.15, theme.colors.text.secondary)};
    white-space: pre-line;
  }

  button {
    border: 0;
    background: none;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text.tertiary};
    padding: 0;
    margin: 0.75rem 0 0 0;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;
