import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { selectUser } from "./features/auth/authSlice";
import {
  fetchSubscriptions,
  clearSubscriptions,
} from "./features/subscriptions/subscriptionsSlice";
import { theme } from "./utils/theme";
import GlobalStyles from "./globalStyles";
import Layout from "./components/Layout/Layout";
import Home from "./features/home/Home";
import Watch from "./features/watch/Watch";
import Channel from "./features/channel/Channel";
import Search from "./features/search/Search";
import Subscriptions from "./features/subscriptions/Subscriptions";
import Explore from "./features/explore/Explore";

const App = () => {
  // Listen for auth state change and fetch/clear subscriptions
  // to avoid repetitive subscription status requests for every channel/video
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchSubscriptions());
    } else {
      dispatch(clearSubscriptions());
    }
  }, [user, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Layout activeTab="home">
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

        <Route path="/subscriptions" exact>
          <Layout activeTab="subscriptions">
            <Subscriptions />
          </Layout>
        </Route>

        <Route path="/explore" exact>
          <Layout activeTab="explore">
            <Explore />
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
