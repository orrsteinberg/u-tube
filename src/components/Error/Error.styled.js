import styled from "styled-components";
import { darken } from "polished";

export const ErrorContainer = styled.div`
  max-width: 480px;
  padding: 0.25rem;
  margin: 1.5rem auto;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => darken(0.16, theme.colors.bg.tertiary)};
  border: 1px solid ${({ theme }) => theme.colors.text.tertiary};
  border-radius: 5px;
`;
