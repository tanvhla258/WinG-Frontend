import classNames from "classnames";
import React from "react";
import { ReactNode } from "react";

import { IconType } from "react-icons";
interface buttonProps {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "success";
  children?: string;
  onClick?: () => void;
  option?: string;
  icon?: JSX.Element;
  type?: "button" | "submit" | "reset" | undefined;
}
function Button({
  size = "medium",
  variant = "primary",
  children = "",
  onClick = () => {},
  option = "",
  icon,
  type = undefined,
}: buttonProps) {
  const buttonClasses = classNames(
    `${
      icon ? " flex gap-2 items-center" : ""
    } py-2 px-2 rounded hover:border-transparent hover:shadow-md  transition duration-300 focus:outline-none`,
    {
      "text-sm": size === "small",
      "text-lg": size === "large",
      "text-base": size === "medium",
      "text-blue bg-white border-blue": variant === "primary",
      "hover:bg-blue hover:text-white": variant === "primary",
      "text-green bg-white border-green": variant === "success",
      "hover:bg-green hover:text-white": variant === "success",
      "bg-slate-200 text-black": variant === "secondary",
      "hover:bg-slate-400": variant === "secondary",
    }
  );
  return (
    <button
      className={option + buttonClasses}
      type={type}
      onClick={() => onClick()}
    >
      {icon ? icon : <></>}
      {children}
    </button>
  );
}

export default Button;
