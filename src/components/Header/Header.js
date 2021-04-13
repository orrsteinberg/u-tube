import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MdMenu, MdSearch, MdApps } from "react-icons/md";

import { selectUser } from "../../features/auth/authSlice";
import { IconButton } from "../shared";
import {
  HeaderElement,
  ToggleButton,
  HeaderLogo,
  HeaderIcons,
  SearchForm,
} from "./Header.styled";
import Avatar from "../Avatar/Avatar";

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

const Header = ({ handleMenuToggle }) => {
  const user = useSelector(selectUser);

  return (
    <HeaderElement>
      <ToggleButton onClick={handleMenuToggle}>
        <MdMenu />
      </ToggleButton>
      <HeaderLogo />
      <HeaderSearch />
      <HeaderIcons>
        <IconButton>
          <MdApps />
        </IconButton>
        <Avatar size="md" src={user?.avatar} alt={user?.name} />
      </HeaderIcons>
    </HeaderElement>
  );
};

export default Header;
