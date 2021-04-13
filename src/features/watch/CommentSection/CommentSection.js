import React from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../../auth/authSlice";
import { CommentsContainer, NewComment } from "./CommentSection.styled";
import Comment from "./Comment";
import Avatar from "../../../components/Avatar/Avatar";

const CommentSection = ({ comments }) => {
  const user = useSelector(selectUser);

  return (
    <CommentsContainer>
      <NewComment>
        <Avatar size="lg" src={user?.avatar} alt={user?.name} />
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
