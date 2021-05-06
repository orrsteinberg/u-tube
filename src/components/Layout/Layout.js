import React, { useLayoutEffect, useRef } from "react";

import { useDetectPageClick } from "../../hooks";
import Header from "../Header/Header";
import Sidemenu from "../Sidemenu/Sidemenu";
import { Main, ViewContainer } from "./Layout.styled";

const Layout = ({ children, activeTab, watchView, toggleTheme }) => {
  const menuRef = useRef(null);
  const viewContainerRef = useRef(null);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useDetectPageClick(
    menuRef, // Element
    false // Initial value
  );

  useLayoutEffect(() => {
    // Scroll to top when changing views
    viewContainerRef.current.scrollTop = 0;
  });

  const toggleMenu = () => setMobileMenuIsOpen(!mobileMenuIsOpen);

  return (
    <>
      <Header handleThemeToggle={toggleTheme} handleMenuToggle={toggleMenu} />
      <Main>
        <Sidemenu
          ref={menuRef}
          showOnMobile={mobileMenuIsOpen}
          activeTab={activeTab}
          watchView={watchView}
        />
        <ViewContainer
          ref={viewContainerRef}
          id="view-container"
          menuIsOpen={mobileMenuIsOpen}
        >
          {children}
        </ViewContainer>
      </Main>
    </>
  );
};

export default Layout;
