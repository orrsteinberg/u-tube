import React from "react";
import { useSelector } from "react-redux";
import { MdMenu, MdApps } from "react-icons/md";

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

const Header = ({ handleMenuToggle }) => {
  const user = useSelector(selectUser);

  return (
    <StyledHeader>
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
    </StyledHeader>
  );
};

export default Header;
