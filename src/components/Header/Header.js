import React from "react";
import styled from "styled-components";

const HeaderElement = styled.header`
  background: ${({ theme }) => theme.colors.bg.primary};
  height: ${({ theme }) => theme.sizes.headerHeight};
`;

const Header = ({}) => {
  return <HeaderElement>Header</HeaderElement>;
};

export default Header;
