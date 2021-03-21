import styled from "styled-components";

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;

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

  span {
    font-weight: normal;
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const Text = styled.p`
  margin: 0.25rem 0 0 0;
`;
