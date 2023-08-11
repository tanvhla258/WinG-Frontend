import React from "react";
import { AiFillLock, AiOutlineUser } from "react-icons/ai";
import { MdPublic } from "react-icons/md";

function PrivacyIcon({
  iconType,
}: {
  iconType: "public" | "friend" | "private" | null;
}) {
  if (iconType === "public") return <MdPublic size={12} />;
  if (iconType === "private") return <AiFillLock size={12} />;
  if (iconType === "friend") return <AiOutlineUser size={12} />;
  return <></>;
}

export default PrivacyIcon;
