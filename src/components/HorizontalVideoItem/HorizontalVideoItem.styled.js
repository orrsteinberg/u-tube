import styled from "styled-components";
import { Link } from "react-router-dom";

export const HorizontalVideoItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: ${({ fullWidth }) => (fullWidth ? "1.1rem" : "1rem")};
  margin: 1.5rem auto;
  max-width: 400px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 600px;
    flex-wrap: nowrap;
    margin: ${({ fullWidth }) =>
      fullWidth ? "0 0 1.25rem 0" : "0 0 0.75rem 0"};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 800px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: 860px;
  }
`;

export const ThumbnailLink = styled(Link)`
  --thumbnail-width: 100%; // var for maintaining aspect ratio
  flex-basis: var(--thumbnail-width);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid ${({ theme }) => theme.colors.bg.tertiary};
  cursor: pointer;
  background: ${({ theme }) => theme.colors.bg.tertiary};
  padding-top: calc(9 / 16 * var(--thumbnail-width));

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    --thumbnail-width: 42%;
    flex-basis: var(--thumbnail-width);
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.general.accent1} 0%,
      ${({ theme }) => theme.colors.general.accent2} 100%
    );
    opacity: 0;
    z-index: 1;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 6rem;
    color: ${({ theme }) => theme.colors.general.light};
    display: none;
    z-index: 2;
  }

  &:hover {
    ::before {
      opacity: 0.7;
    }

    svg {
      display: block;
    }
  }

  img {
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
`;

export const Duration = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.25rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.colors.general.light};
  z-index: 3;
`;

export const ItemBody = styled.div`
  padding-top: 0.5rem;
  padding-right: 1.5rem;

  h3 {
    line-height: 1.2;
    margin: 0;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text.primary};

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      font-size: ${({ fullWidth }) => (fullWidth ? "1.3rem" : "1rem")};
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 0rem;
    padding-left: 0.75rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-top: 0;
  }
`;

export const MetadataBox = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};

  p {
    margin: 0.25rem 0;
  }
`;

export const Text = styled.p`
  font-size: 1rem;
  display: none;
  color: ${({ theme }) => theme.colors.text.tertiary};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;
