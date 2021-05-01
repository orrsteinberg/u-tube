import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../auth/authSlice";
import {
  addComment,
  noUserCommentError,
  clearNoUserCommentError,
  selectVideoToWatch,
  selectCommentSection,
} from "./watchSlice";
import {
  CommentsContainer,
  StyledNewCommentForm,
} from "./CommentSection.styled";
import Comment from "./Comment";
import Avatar from "../../components/Avatar/Avatar";
import Error from "../../components/Error/Error";

const NewCommentForm = () => {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const user = useSelector(selectUser);
  const { currentVideo } = useSelector(selectVideoToWatch);
  const { newCommentStatus, newCommentError } = useSelector(
    selectCommentSection
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // When user logs in, clear omment error
    if (user) {
      dispatch(clearNoUserCommentError());
    }
  }, [user, dispatch])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      dispatch(noUserCommentError());
      return;
    }

    if (text.trim() === "") return;

    // If user is logged in, add new comment
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
    <>
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
      {newCommentStatus === "failed" && (
        <Error error={newCommentError} />
      )}
    </>
  );
};

const CommentSection = () => {
  const { comments, status, error } = useSelector(selectCommentSection);

  return (
    <CommentsContainer>
      {status === "loading" && <h3>Loading comments...</h3>}
      {status === "failed" && <Error error={error} />}
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
