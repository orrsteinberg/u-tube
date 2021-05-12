import styled from "styled-components";

export const HorizontalChannelItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  max-width: 100%;
  font-size: 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  padding: 1rem 1rem 1.75rem 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.bg.primary};
  }
`;

export const ChannelDetails = styled.div`
  padding-top: 0.25rem;
  padding-left: 0.75rem;

  h3 {
    line-height: 1;
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: 0.25rem 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-top: 0;
  }
`;
