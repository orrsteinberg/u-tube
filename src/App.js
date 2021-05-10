import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { useDarkMode } from "./hooks";
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
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  const [darkMode, toggleThemeMode] = useDarkMode();
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
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Layout toggleTheme={toggleThemeMode} activeTab="home">
            <Home />
          </Layout>
        </Route>

        <Route path="/watch/:id" exact>
          <Layout toggleTheme={toggleThemeMode} watchView>
            <Watch />
          </Layout>
        </Route>

        <Route path="/channel/:id" exact>
          <Layout toggleTheme={toggleThemeMode}>
            <Channel />
          </Layout>
        </Route>

        <Route path="/search" exact>
          <Layout toggleTheme={toggleThemeMode}>
            <Search />
          </Layout>
        </Route>

        <Route path="/subscriptions" exact>
          <Layout toggleTheme={toggleThemeMode} activeTab="subscriptions">
            <Subscriptions />
          </Layout>
        </Route>

        <Route path="/explore">
          <Layout toggleTheme={toggleThemeMode} activeTab="explore">
            <Explore />
          </Layout>
        </Route>

        <Route>
          <Layout toggleTheme={toggleThemeMode}>
            <NotFound />
          </Layout>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
