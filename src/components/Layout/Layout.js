import React, { useState } from "react";

import Header from "../../components/Header/Header";
import Sidemenu from "../../components/Sidemenu/Sidemenu";
import { Main, ViewContainer } from "./Layout.styled";

const Layout = ({ children }) => {
  const [showMenuOnMobile, setShowMenuOnMobile] = useState(false);

  const handleMenuToggle = () => setShowMenuOnMobile(!showMenuOnMobile);

  return (
    <>
      <Header handleMenuToggle={handleMenuToggle} />
      <Main>
        <Sidemenu showOnMobile={showMenuOnMobile} />
        <ViewContainer menuIsOpen={showMenuOnMobile}>{children}</ViewContainer>
      </Main>
    </>
  );
};

export default Layout;