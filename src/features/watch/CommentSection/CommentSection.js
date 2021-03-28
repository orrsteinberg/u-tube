import React from "react";

import userAvatar from "../../../user.svg";
import Comment from "./Comment";
import { CommentsContainer, NewComment } from "./CommentSection.styled";

const CommentSection = ({ comments }) => {
  return (
    <CommentsContainer>
      <NewComment>
        <img src={userAvatar} alt="User avatar" />
        <form>
          <input type="text" placeholder="Add a comment..." />
          <button type="submit">Comment</button>
        </form>
      </NewComment>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </CommentsContainer>
  );
};

export default CommentSection;
