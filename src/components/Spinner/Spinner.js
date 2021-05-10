import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  35% {
    transform: rotate(720deg);
  }
  100% {
    transform: rotate(1440deg);
  }
`;

const Spinner = styled.div`
  margin: 3rem auto;
  animation: ${rotate360} 4s linear infinite;
  border-top: 6px solid ${({ theme }) => theme.colors.bg.tertiary};
  border-right: 6px solid ${({ theme }) => theme.colors.bg.tertiary};
  border-bottom: 6px solid ${({ theme }) => theme.colors.bg.tertiary};
  border-left: 5px solid transparent;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default Spinner;
