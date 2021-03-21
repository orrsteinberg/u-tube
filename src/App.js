import React from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "./utils/theme";
import GlobalStyles from "./globalStyles";
import Layout from "./components/Layout/Layout";
import Home from "./views/Home/Home";
import Watch from "./views/Watch/Watch";

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

        <Route>
          <h1>Not Found</h1>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
