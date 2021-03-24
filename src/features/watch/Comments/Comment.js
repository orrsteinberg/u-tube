import React from "react";

import { CommentContainer, CommentBody, Author, Text } from "./Comment.styled";

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
