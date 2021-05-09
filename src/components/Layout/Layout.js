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
      <Header toggleTheme={toggleTheme} toggleMenu={toggleMenu} />
      <Main>
        <Sidemenu
          ref={menuRef}
          showOnMobile={mobileMenuIsOpen}
          toggleMenu={toggleMenu}
          toggleTheme={toggleTheme}
          activeTab={activeTab}
          compact={watchView}
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
