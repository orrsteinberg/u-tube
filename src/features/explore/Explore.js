import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";

import { selectExplore } from "./exploreSlice";
import { ExploreText } from "./Explore.styled";
import Tabs from "./Tabs";
import ExploreVideos from "./ExploreVideos";

const Explore = () => {
  const explore = useSelector(selectExplore);
  const { path } = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>
          {explore.currentCategory
            ? `Explore ${explore.currentCategory} | U-Tube`
            : `Explore | U-Tube`}
        </title>
      </Helmet>
      <Tabs />
      <Route path={path} exact>
        {explore?.currentCategory && (
          <Redirect to={`${path}/${explore.currentCategory}`} />
        )}
        <ExploreText>
          Click on a category to explore trending videos
        </ExploreText>
      </Route>
      <Route path={`${path}/:category`} exact>
        <ExploreVideos />
      </Route>
    </>
  );
};

export default Explore;
