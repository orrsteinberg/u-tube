import React from "react";
import styled from "styled-components";

const HeaderElement = styled.header`
  height: ${({ theme }) => theme.sizes.headerHeight};
`;

const Header = ({ handleMenuToggle }) => {
  return (
    <HeaderElement>
      <button onClick={handleMenuToggle}>TOGGLE MENU</button>
    </HeaderElement>
  );
};

export default Header;
