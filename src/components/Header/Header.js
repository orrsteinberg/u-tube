import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";
import { useSelector } from "react-redux";
import { MdMenu } from "react-icons/md";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

import { selectUser } from "../../features/auth/authSlice";
import {
  StyledHeader,
  ToggleButton,
  HeaderLogo,
  HeaderIcons,
} from "./Header.styled";
import HeaderSearch from "./HeaderSearch";
import Avatar from "../Avatar/Avatar";
import IconButton from "../IconButton/IconButton";

const Header = ({ toggleMenu, toggleTheme }) => {
  const theme = useContext(ThemeContext);
  const user = useSelector(selectUser);

  return (
    <StyledHeader>
      <ToggleButton onClick={toggleMenu}>
        <MdMenu />
      </ToggleButton>
      <HeaderLogo />
      <HeaderSearch />
      <HeaderIcons>
        <IconButton onClick={toggleTheme}>
          {theme.name === "light" ? <IoMdMoon /> : <IoMdSunny />}
        </IconButton>
        <Avatar size="md" src={user?.avatar} alt={user?.name} />
      </HeaderIcons>
    </StyledHeader>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default Header;
