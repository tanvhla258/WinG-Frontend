import React from "react";
import { URL } from "../constant/constant";
function Avatar({
  src,
  size,
  ring = true,
  onClick = () => {},
}: {
  src: string | undefined;
  size: number;
  ring?: boolean;
  onClick?: () => void;
}) {
  const className = `inline-block object-cover cursor-pointer h-${size} w-${size} rounded-full ${
    ring ? "ring-2 ring-white" : ""
  }`;
  return (
    <img
      onClick={() => onClick()}
      className={className}
      src={`${URL}${src}`}
      alt="avatar"
    />
  );
}

export default Avatar;
