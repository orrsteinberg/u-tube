import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { getQueryStringParams } from "../../utils/helpers";
import { fetchSearchResults, selectSearch } from "./searchSlice";
import HorizontalVideoItem from "../../components/HorizontalVideoItem/HorizontalVideoItem";
import HorizontalChannelItem from "../../components/HorizontalChannelItem/HorizontalChannelItem";

const Search = () => {
  // Parse query from URL
  const { q: query } = getQueryStringParams(useLocation().search);
  const { status, error, channels, videos } = useSelector(selectSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearchResults(query));
  }, [query, dispatch]);

  return (
    <>
      {status === "loading" && <p>Searching...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
        <>
          <h1>Search results for "{query}"</h1>
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
