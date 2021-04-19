import styled from "styled-components";
import { lighten } from "polished";

export const StyledSubscribeButton = styled.button`
  border: 0;
  border-radius: 3px;
  background: ${({ isSubscribed, theme }) =>
    isSubscribed ? theme.colors.general.faded : theme.colors.general.red};
  color: ${({ theme }) => theme.colors.general.light};
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0.75rem 1rem;
  line-height: 1;
  cursor: pointer;

  &:active {
    background: ${({ isSubscribed, theme }) =>
      isSubscribed
        ? lighten(0.05, theme.colors.general.faded)
        : lighten(0.05, theme.colors.general.red)};
  }

  &:disabled {
    opacity: 0.7;
  }
`;
