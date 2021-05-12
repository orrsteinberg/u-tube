import styled from "styled-components";

export const ViewAllSubsButton = styled.button`
  border: 0;
  outline: 0;
  background: none;
  text-align: center;
  display: block;
  width: 100%;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

