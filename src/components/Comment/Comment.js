import React from "react";
import styled from "styled-components";

const Text = styled.p`
  margin: 0.25rem 0 0 0;
`;

const Author = styled.div`
  font-weight: bold;

  span {
    font-weight: normal;
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const CommentBody = styled.div`
  padding-top: 0.25rem;
`;

const CommentContainer = styled.div`
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

const Comment = () => {
  return (
    <CommentContainer>
      <img src="https://picsum.photos/60" alt="avatar" />
      <CommentBody>
        <Author>
          Jazz & Bossa Collection <span>1 month ago</span>
        </Author>
        <Text>
          It's very refreshing and refreshing, and all the songs are perfect for
          everyday.
        </Text>
      </CommentBody>
    </CommentContainer>
  );
};

export default Comment;
