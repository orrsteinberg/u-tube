import React from "react"

import GuestAvatar from "../../guest.svg"
import { AvatarImg } from "./Avatar.styled"

const Avatar = ({ src, alt, size }) => {
  return src ? (
      <AvatarImg size={size} src={src} alt={`${alt} avatar`} />
  ) : (
      <AvatarImg size={size} src={GuestAvatar} alt="Guest avatar" />
  );
};

export default Avatar;
