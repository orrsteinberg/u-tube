import styled from "styled-components";

export const VideoItemContainer = styled.div`
  margin: 0 auto 1.5rem auto;
  max-width: 230px;
`;

export const Thumbnail = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 3px solid ${({ theme }) => theme.colors.bg.tertiary};

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

export const Details = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.75rem;

  img {
    border-radius: 50%;
    object-fit: contain;
    margin-right: 0.75rem;
  }
`;

export const Meta = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};

  h3 {
    line-height: 1;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const Statistics = styled.div`
  display: flex;
  margin-top: 0.5rem;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 0.25rem;
  }
`;
