import styled from "styled-components";

export const DetailsContainer = styled.div`
  padding-bottom: 0.5rem;

  h1 {
    margin: 1rem 0 0.5rem 0;
    font-size: 1.5rem;
    letter-spacing: 0.6px;
    line-height: 1;
    font-weight: normal;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: 1.75rem;
    }
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
`;

export const ChannelContainer = styled.div`
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

export const ChannelData = styled.div`
  margin-left: 0.75rem;
`;

export const DescriptionContainer = styled.div`
  padding-left: calc(50px + 0.75rem);
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};

  p {
    margin: 0;
    padding-right: 1rem;
    max-width: 500px;
    letter-spacing: 0.6px;
    color: ${({ theme }) => theme.colors.text.primary};
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
