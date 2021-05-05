import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { selectUser } from "./features/auth/authSlice";
import {
  fetchSubscriptions,
  clearSubscriptions,
} from "./features/subscriptions/subscriptionsSlice";
import { fetchRatings, clearRatings } from "./features/ratings/ratingsSlice";
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
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // On user state change fetch/clear subscriptions/rating
    // to avoid repetitive status requests for every channel/video
    if (user) {
      dispatch(fetchSubscriptions());
      dispatch(fetchRatings());
    } else {
      dispatch(clearSubscriptions());
      dispatch(clearRatings());
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

        <Route path="/explore">
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
