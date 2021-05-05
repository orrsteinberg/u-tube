import styled from "styled-components";

export const VideoItemContainer = styled.div`
  margin: 0 auto 1.75rem auto;
  flex-basis: 90%;
  max-width: 320px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-basis: 48%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-basis: 29%;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    flex-basis: 24%;
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid ${({ theme }) => theme.colors.bg.tertiary};
  background: ${({ theme }) => theme.colors.bg.tertiary};
  padding-top: calc(9 / 16 * 100%);

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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

export const Details = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.5rem;

  img {
    margin-right: 1rem;
  }
`;

export const Meta = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};

  h3 {
    line-height: 1.2;
    margin-top: ${({ hideChannel }) => (hideChannel ? "0" : "0.25rem")};
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.075rem;
  }
`;

export const Statistics = styled.div`
  display: flex;
  margin-top: 0.25rem;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 0.25rem;
  }
`;
