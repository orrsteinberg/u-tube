import styled from "styled-components";

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  transition: color 0.2s;
  outline: none;
  cursor: pointer;

  &:active {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export default IconButton;
