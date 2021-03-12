import React from "react";
import { Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "./utils/theme";
import GlobalStyles from "./globalStyles";
import HomeView from "./views/HomeView/HomeView";
import Header from "./components/Header/Header";
import Sidemenu from "./components/Sidemenu/Sidemenu";

const ViewContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg.primary};
  flex: 1;
`;

const Main = styled.main`
  display: flex;
  height: ${({ theme }) => `calc(100vh - ${theme.sizes.headerHeight})`};
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Sidemenu />
        <ViewContainer>{children}</ViewContainer>
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
