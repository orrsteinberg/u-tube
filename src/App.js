import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./utils/theme";
import GlobalStyles from "./globalStyles";
import Layout from "./components/Layout/Layout";
import Home from "./views/Home/Home";
import Watch from "./views/Watch/Watch";
import Channel from "./views/Channel/Channel";
import Search from "./views/Search/Search";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Layout>
            <Home />
          </Layout>
        </Route>

        <Route path="/watch" exact>
          <Layout>
            <Watch />
          </Layout>
        </Route>

        <Route path="/channel" exact>
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
          <h1>Not Found</h1>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
