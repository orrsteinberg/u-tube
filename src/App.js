import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./utils/theme";
import GlobalStyles from "./globalStyles";
import Layout from "./components/Layout/Layout";
import Home from "./features/home/Home";
import Watch from "./features/watch/Watch";
import Channel from "./features/channel/Channel";
import Search from "./features/search/Search";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Layout activeTab={"home"}>
            <Home />
          </Layout>
        </Route>

        <Route path="/watch/:id" exact>
          <Layout watchView>
            <Watch />
          </Layout>
        </Route>

        <Route path="/channel/:id" exact>
          <Layout>
            <Channel />
          </Layout>
        </Route>

        <Route path="/search" exact>
          <Layout>
            <Search />
          </Layout>
        </Route>

        <Route>
          <Layout>
            <h1>Not Found</h1>
          </Layout>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
