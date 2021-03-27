import styled from "styled-components";
import { lighten } from "polished";

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  max-width: 90%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 80%;
  }

  img {
    border-radius: 50%;
    object-fit: contain;
    width: 40px;
    margin-right: 1rem;
  }
`;

export const CommentBody = styled.div`
  padding-top: 0.25rem;
`;

export const Author = styled.div`
  font-weight: bold;

  a {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  span {
    font-weight: normal;
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const Text = styled.p`
  margin: 0.25rem 0 0 0;
  color: ${({ theme }) => lighten(0.15, theme.colors.text.secondary)};
`;
