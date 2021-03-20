import React from "react";
import styled from "styled-components";

import Comment from "../Comment/Comment";

const NewComment = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  img {
    border-radius: 50%;
    width: 50px;
    object-fit: contain;
  }

  form {
    display: flex;
    flex: 1;

    input {
      flex: 1;
      border: none;
      background: none;
      border-bottom: 3px solid ${({ theme }) => theme.colors.bg.secondary};
      margin-left: 1rem;
      margin-right: 1rem;
      color: ${({ theme }) => theme.colors.text.primary};
      padding: 0.25rem 0;
      font-size: 1.1rem;
      transition: border-bottom 0.2s;

      &::placeholder {
        color: ${({ theme }) => theme.colors.text.secondary};
      }

      &:focus {
        outline: none;
        border-bottom: 3px solid ${({ theme }) => theme.colors.text.primary};
      }
    }

    button {
      border: none;
      background: ${({ theme }) => theme.colors.general.faded};
      color: ${({ theme }) => theme.colors.general.light};
      cursor: pointer;
      text-transform: uppercase;
      padding: 0.5rem 1rem;

      &:focus {
        outline: none;
      }
    }
  }
`;

const CommentsContainer = styled.div`
  width: 100%;
`;

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
