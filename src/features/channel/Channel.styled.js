import styled from "styled-components";

export const ChannelHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg.primary};
  border-radius: 10px;
  padding: 1rem;
  overflow: hidden;
  margin-bottom: 2rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }

  img {
    border-radius: 50%;
    object-fit: contain;
    width: 100px;
    margin: auto;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin: 0;
    }
  }

  button {
    border: 0;
    background: ${({ theme }) => theme.colors.general.red};
    color: ${({ theme }) => theme.colors.general.light};
    font-size: 1.1rem;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    margin: auto;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.general.light};
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin: 0 0 0 auto;
    }
  }
`;

export const ChannelHeaderText = styled.div`
  margin: 0.5rem auto 1.25rem auto;
  text-align: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 0 0 1rem;
    text-align: left;
  }

  h1 {
    margin: 0;
  }

  p {
    margin: 0.25rem 0 0 0;
    font-size: 1.2rem;
  }
`;
