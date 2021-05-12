import React from "react";

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

export default Avatar;
