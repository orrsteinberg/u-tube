import React, { useLayoutEffect, useRef } from "react";

import { useDetectPageClick } from "../../hooks";
import Header from "../Header/Header";
import Sidemenu from "../Sidemenu/Sidemenu";
import { Main, ViewContainer } from "./Layout.styled";

const Layout = ({ children, activeTab, watchView }) => {
  const menuRef = useRef(null);
  const [showMenuOnMobile, setShowMenuOnMobile] = useDetectPageClick(
    menuRef, // Element
    false // Initial value
  );
  const viewContainerRef = useRef(null);

  useLayoutEffect(() => {
    // Scroll to top when changing views
    viewContainerRef.current.scrollTop = 0;
  });

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
        <ViewContainer
          ref={viewContainerRef}
          id="view-container"
          menuIsOpen={showMenuOnMobile}
        >
          {children}
        </ViewContainer>
      </Main>
    </>
  );
};

export default Layout;
