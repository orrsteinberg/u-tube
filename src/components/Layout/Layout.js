import React, { useRef } from "react";

import { useDetectPageClick } from "../../hooks";
import Header from "../Header/Header";
import Sidemenu from "../Sidemenu/Sidemenu";
import { Main, ViewContainer } from "./Layout.styled";

const Layout = ({ children, activeTab, watchView }) => {
  const menuRef = useRef(null);
  const [showMenuOnMobile, setShowMenuOnMobile] = useDetectPageClick(
    menuRef,
    false
  );

  const handleMenuToggle = () => setShowMenuOnMobile(!showMenuOnMobile);

  return (
    <>
      <Header handleMenuToggle={handleMenuToggle} />
      <Main>
        <Sidemenu
          ref={menuRef}
          showOnMobile={showMenuOnMobile}
          activeTab={activeTab}
          watchView={watchView}
        />
        <ViewContainer id="view-container" menuIsOpen={showMenuOnMobile}>
          {children}
        </ViewContainer>
      </Main>
    </>
  );
};

export default Layout;
