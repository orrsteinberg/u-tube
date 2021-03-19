import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "./utils/theme";
import GlobalStyles from "./globalStyles";
import HomeView from "./views/HomeView/HomeView";
import WatchView from "./views/WatchView/WatchView";
import Header from "./components/Header/Header";
import Sidemenu from "./components/Sidemenu/Sidemenu";

const ViewContainer = styled.div`
  flex: 1;
  position: relative;
  padding-top: ${({ theme }) => `calc(1rem + ${theme.sizes.decorBarHeight})`};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;

  ::before {
    content: "";
    position: fixed;
    z-index: 2;
    top: ${({ theme }) => theme.sizes.headerHeight};
    left: 0;
    right: 0;
    height: ${({ theme }) => theme.sizes.decorBarHeight};
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.general.accent1} 20%,
      ${({ theme }) => theme.colors.general.accent2} 100%
    );
  }

  ::after {
    content: "";
    background: transparent;
    transition: background 0.2s;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ menuIsOpen, theme }) =>
      menuIsOpen &&
      `::after {
        position: fixed;
        top: ${theme.sizes.headerHeight};
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
  margin-top: ${({ theme }) => theme.sizes.headerHeight};
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

        <Route path="/watch" exact>
          <Layout>
            <WatchView />
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
