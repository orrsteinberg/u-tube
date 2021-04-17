import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import { getQueryStringParams } from "../../utils/helpers";
import {
  updateSearchView,
  fetchSearchResults,
  selectSearch,
} from "./searchSlice";
import HorizontalVideoItem from "../../components/HorizontalVideoItem/HorizontalVideoItem";
import HorizontalChannelItem from "../../components/HorizontalChannelItem/HorizontalChannelItem";

const Search = () => {
  const { currentQuery, status, error, channels, videos } = useSelector(
    selectSearch
  );
  const dispatch = useDispatch();

  // Parse query from URL
  const { q: queryParam } = getQueryStringParams(useLocation().search);

  useEffect(() => {
    // If it's a new search, clear previous results
    if (currentQuery !== queryParam) {
      dispatch(updateSearchView(queryParam));
      dispatch(fetchSearchResults(queryParam));
    }
  }, [currentQuery, queryParam, dispatch]);

  return (
    <>
      <Helmet>
        <title>{queryParam} | U-Tube</title>
      </Helmet>
      <h1>Search results for "{queryParam}"</h1>
      {status === "loading" && (
        <>
          {channels.length > 0 &&
            channels.map((channel) => (
              <HorizontalChannelItem
                channel={channel}
                key={channel.id}
              />
            ))}
          {videos.length > 0 &&
            videos.map((video) => (
              <HorizontalVideoItem fullWidth video={video} key={video.id} />
            ))}
          <h3>Searching...</h3>
        </>
      )}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <>
          {channels.map((channel) => (
            <HorizontalChannelItem
              fullWidth
              channel={channel}
              key={channel.id}
            />
          ))}
          {videos.map((video) => (
            <HorizontalVideoItem fullWidth video={video} key={video.id} />
          ))}
        </>
      )}
    </>
  );
};

export default Search;
