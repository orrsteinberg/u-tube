import React from "react";
import styled from "styled-components";

const NavElement = styled.nav`
  background: ${({ theme }) => theme.colors.bg.secondary};
  width: 250px;
`;

const Sidemenu = ({}) => {
  return <NavElement>Sidemenu</NavElement>;
};

export default Sidemenu;
