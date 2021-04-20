import styled from "styled-components";

export const CommentsContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bg.secondary};
  padding-top: 1rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    border-bottom: none;
  }
`;

export const StyledNewCommentForm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  form {
    display: flex;
    flex: 1;

    input {
      flex: 1;
      border: none;
      background: none;
      border-bottom: 3px solid ${({ theme }) => theme.colors.bg.secondary};
      margin-left: 1rem;
      margin-right: 0.5rem;
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

      &:disabled {
        opacity: 0.7;
        cursor: auto;
      }
    }
  }
`;
