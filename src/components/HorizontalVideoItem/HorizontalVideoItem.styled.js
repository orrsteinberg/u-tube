import styled from "styled-components";

export const HorizontalVideoItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  max-width: 600px;
`;

export const Thumbnail = styled.div`
  flex-basis: 50%;
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid ${({ theme }) => theme.colors.bg.tertiary};
  cursor: pointer;
  width: 100%;

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
`;

export const ItemBody = styled.div`
  flex-basis: 50%;
  padding-top: 0.25rem;
  padding-left: 0.75rem;

  h3 {
    line-height: 1;
    margin: 0;
    font-weight: normal;
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
