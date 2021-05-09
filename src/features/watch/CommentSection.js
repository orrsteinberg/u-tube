import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../auth/authSlice";
import {
  postComment,
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
import AuthModal from "../../components/AuthModal/AuthModal";

const NewCommentForm = () => {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const user = useSelector(selectUser);
  const { currentVideo } = useSelector(selectVideoToWatch);
  const { newCommentStatus, newCommentError } = useSelector(
    selectCommentSection
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();

  const closeAuthModal = () => setShowAuthModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (text.trim() === "") return;

    // If user is logged in, add new comment
    const newComment = {
      videoId: currentVideo.id,
      text,
    };
    dispatch(postComment(newComment));

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
      {newCommentStatus === "failed" && <Error error={newCommentError} />}
      {showAuthModal && <AuthModal closeModal={closeAuthModal} />}
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
