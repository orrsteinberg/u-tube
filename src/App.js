import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { selectUser } from "./features/auth/authSlice";
import {
  fetchSubscriptions,
  clearSubscriptions,
} from "./features/subscriptions/subscriptionsSlice";
import { fetchRatings, clearRatings } from "./features/ratings/ratingsSlice";
import { darkTheme, lightTheme } from "./utils/theme";
import GlobalStyles from "./globalStyles";
import Layout from "./components/Layout/Layout";
import Home from "./features/home/Home";
import Watch from "./features/watch/Watch";
import Channel from "./features/channel/Channel";
import Search from "./features/search/Search";
import Subscriptions from "./features/subscriptions/Subscriptions";
import Explore from "./features/explore/Explore";

const App = () => {
  const [theme, setTheme] = useState("dark");
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

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Layout toggleTheme={toggleTheme} activeTab="home">
            <Home />
          </Layout>
        </Route>

        <Route path="/watch/:id" exact>
          <Layout toggleTheme={toggleTheme} watchView>
            <Watch />
          </Layout>
        </Route>

        <Route path="/channel/:id" exact>
          <Layout toggleTheme={toggleTheme}>
            <Channel />
          </Layout>
        </Route>

        <Route path="/search" exact>
          <Layout toggleTheme={toggleTheme}>
            <Search />
          </Layout>
        </Route>

        <Route path="/subscriptions" exact>
          <Layout toggleTheme={toggleTheme} activeTab="subscriptions">
            <Subscriptions />
          </Layout>
        </Route>

        <Route path="/explore">
          <Layout toggleTheme={toggleTheme} activeTab="explore">
            <Explore />
          </Layout>
        </Route>

        <Route>
          <Layout toggleTheme={toggleTheme}>
            <h1>Not Found</h1>
          </Layout>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
