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
  outline: none;
  cursor: pointer;
`;

export default IconButton;
