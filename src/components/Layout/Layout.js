import React, { useLayoutEffect, useRef } from "react";

import { useMobileMenu } from "../../hooks";
import Header from "../Header/Header";
import Sidemenu from "../Sidemenu/Sidemenu";
import { Main, ViewContainer } from "./Layout.styled";

const Layout = ({ children, activeTab, watchView, toggleTheme }) => {
  const menuRef = useRef(null);
  const viewContainerRef = useRef(null);
  const [mobileMenuIsOpen, toggleMobileMenu] = useMobileMenu(
    menuRef, // Element
    false // Initial value
  );

  useLayoutEffect(() => {
    // Scroll to top when changing views
    viewContainerRef.current.scrollTop = 0;
  });

  return (
    <>
      <Header toggleTheme={toggleTheme} toggleMenu={toggleMobileMenu} />
      <Main>
        <Sidemenu
          ref={menuRef}
          showOnMobile={mobileMenuIsOpen}
          toggleMenu={toggleMobileMenu}
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
