import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../../auth/authSlice";
import {
  addComment,
  selectVideoToWatch,
  selectCommentSection,
} from "../watchSlice";
import {
  CommentsContainer,
  StyledNewCommentForm,
} from "./CommentSection.styled";
import Comment from "./Comment";
import Avatar from "../../../components/Avatar/Avatar";

const NewCommentForm = () => {
  const { currentVideo } = useSelector(selectVideoToWatch);
  const { newCommentStatus } = useSelector(selectCommentSection);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    // If user is logged in, add new comment
    if (!user) return;

    const newComment = {
      videoId: currentVideo.id,
      text,
    };
    dispatch(addComment(newComment));

    // Clear input and remove focus
    inputRef.current.blur();
    setText("");
  };

  return (
    <StyledNewCommentForm>
      <Avatar size="lg" src={user?.avatar} alt={user?.name} />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={({ target }) => setText(target.value)}
        />
        <button type="submit" disabled={newCommentStatus === "loading"}>
          Comment
        </button>
      </form>
    </StyledNewCommentForm>
  );
};

const CommentSection = () => {
  const { comments, status, error } = useSelector(selectCommentSection);

  return (
    <CommentsContainer>
      {status === "loading" && <h3>Loading comments...</h3>}
      {status === "failed" && <h3>{error}</h3>}
      {status === "succeeded" && (
        <>
          <NewCommentForm />
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </>
      )}
    </CommentsContainer>
  );
};

export default CommentSection;
