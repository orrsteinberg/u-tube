import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "./utils/theme";
import GlobalStyles from "./globalStyles";
import HomeView from "./views/HomeView/HomeView";
import Header from "./components/Header/Header";
import Sidemenu from "./components/Sidemenu/Sidemenu";

const ViewContainer = styled.div`
  position: relative;
  flex: 1;

  ::before {
    content: "";
    background: transparent;
    transition: background 0.2s;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ menuIsOpen }) =>
      menuIsOpen &&
      `::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1;
      }`}
  }
`;

const Main = styled.main`
  display: flex;
  height: ${({ theme }) => `calc(100vh - ${theme.sizes.headerHeight})`};
`;

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomeView />
          </Layout>
        </Route>

        <Route>
          <h1>Not Found</h1>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
