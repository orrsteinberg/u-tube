import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { CommentContainer, CommentBody, Author, Text } from "./Comment.styled";

const Comment = ({ comment }) => {
  const {
    authorDisplayName,
    authorChannelId,
    authorProfileImageUrl,
    textOriginal,
  } = comment;

  const publishedAt = moment(comment.publishedAt).fromNow();

  return (
    <CommentContainer>
      <Link to={`/channel/${authorChannelId}`}>
        <img src={authorProfileImageUrl} alt="avatar" />
      </Link>
      <CommentBody>
        <Author>
          <Link to={`/channel/${authorChannelId}`}>{authorDisplayName}</Link>
          <span> {publishedAt}</span>
        </Author>
        <Text>{textOriginal}</Text>
      </CommentBody>
    </CommentContainer>
  );
};

export default Comment;
