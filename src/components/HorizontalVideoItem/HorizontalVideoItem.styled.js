import styled from "styled-components";

export const HorizontalVideoItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  font-size: ${({ fullWidth }) => (fullWidth ? "1.1rem" : "1rem")};
  margin: 1.5rem auto;
  max-width: 80%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 0 0.75rem 0;
    max-width: ${({ fullWidth }) => (fullWidth ? "680px" : "600px")};
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid ${({ theme }) => theme.colors.bg.tertiary};
  cursor: pointer;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-basis: 50%;
    width: 100%;
  }

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.general.accent1} 0%,
      ${({ theme }) => theme.colors.general.accent2} 100%
    );
    opacity: 0;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 6rem;
    color: ${({ theme }) => theme.colors.general.light};
    display: none;
  }

  &:hover {
    ::before {
      opacity: 0.6;
    }

    svg {
      display: block;
    }
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const Duration = styled.div`
  position: absolute;
  right: 0.5rem;
  bottom: 0.25rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.25rem 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ItemBody = styled.div`
  padding-top: 0.25rem;

  h3 {
    line-height: 1;
    margin: 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-basis: 50%;
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
