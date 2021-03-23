import React from "react";
import { MdMenu, MdSearch, MdApps } from "react-icons/md";

import { IconButton } from "../shared";
import {
  HeaderElement,
  ToggleButton,
  HeaderLogo,
  HeaderIcons,
  SearchForm,
} from "./Header.styled";

const HeaderSearch = () => {
  return (
    <SearchForm>
      <input
        type="text"
        name="search"
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
        <img src="https://picsum.photos/40" alt="avatar" />
      </HeaderIcons>
    </HeaderElement>
  );
};

export default Header;
