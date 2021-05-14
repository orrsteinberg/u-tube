import React from "react";
import PropTypes from "prop-types";

import GuestAvatar from "../../assets/guest.svg";
import { AvatarImg } from "./Avatar.styled";

const Avatar = ({ src, alt, size, highlight }) => {
  return src ? (
    <AvatarImg
      size={size}
      src={src}
      alt={`${alt} avatar`}
      highlight={highlight}
    />
  ) : (
    <AvatarImg
      size={size}
      src={GuestAvatar}
      alt="Guest avatar"
      highlight={highlight}
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
  highlight: PropTypes.bool
}

export default Avatar;
