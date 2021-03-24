import React from "react";

import Comment from "../Comment/Comment";
import { CommentsContainer, NewComment } from "./Comments.styled";


const Comments = () => {
  return (
    <CommentsContainer>
      <h2>3,692 Comments</h2>
      <NewComment>
        <img src="https://picsum.photos/40" alt="avatar" />
        <form>
          <input type="text" placeholder="Add a comment..." />
          <button type="submit">Comment</button>
        </form>
      </NewComment>
      {[...Array(8)].map((x, i) => (
        <Comment key={i} />
      ))}
    </CommentsContainer>
  );
};

export default Comments;
