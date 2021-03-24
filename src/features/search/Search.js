import React from "react";

import HorizontalVideoItem from "../../components/HorizontalVideoItem/HorizontalVideoItem";
import HorizontalChannelItem from "../../components/HorizontalChannelItem/HorizontalChannelItem";

const Search = () => {
  return (
    <>
      <h1>Search results for "search term":</h1>
      {[...Array(3)].map((x, i) => (
        <HorizontalChannelItem key={i} />
      ))}
      {[...Array(20)].map((x, i) => (
        <HorizontalVideoItem fullWidth key={i} />
      ))}
    </>
  );
};

export default Search;
