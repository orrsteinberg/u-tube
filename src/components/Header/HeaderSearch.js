import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { MdSearch } from "react-icons/md";

import {
  SearchForm,
} from "./HeaderSearch.styled";

const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query === "" || query.trim() === "") return;

    // Clear and remove focus from input after submission
    setQuery("");
    inputRef.current.blur();

    history.push(`/search?q=${query}`);
  };

  const handleInputChange = ({ target }) => {
    setQuery(target.value);
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        name="search"
        value={query}
        onChange={handleInputChange}
        placeholder={"Search"}
        autoComplete="off"
      />
      <button type="submit">
        <MdSearch />
      </button>
    </SearchForm>
  );
};

export default HeaderSearch;
