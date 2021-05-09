import styled from "styled-components";

import IconButton from "../IconButton/IconButton";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: fadeIn 0.2s 0.2s forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContainer = styled.div`
  width: 400px;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.bg.primary};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  position: relative;

  ${IconButton} {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    font-size: 1.5rem;
  }

  > svg {
    color: ${({ theme }) => theme.colors.general.accent1};
    font-size: 3.5rem;
    margin: 0;
  }

  h2 {
    margin: 0 0 2rem 0;
  }
`;

export const ModalText = styled.div`
  text-align: left;
  margin-bottom: 2.5rem;

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  span {
    margin-left: 0.75rem;
    color: ${({ theme }) => theme.colors.general.orange};
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-arund;
  background: ${({ theme }) => theme.colors.bg.darker};
  border: none;
  padding: 0 1.25rem;
  margin: auto;
  cursor: pointer;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  img {
    width: 30px;
    margin-right: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;
