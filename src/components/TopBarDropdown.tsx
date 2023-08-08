import React, { Children } from "react";
interface props {
  children: JSX.Element;
  size: string;
}
function TopBarDropdown({ children, size }: props) {
  return (
    <div
      id="dropdown"
      className={`z-100 top-12 right-0   absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl border-2 ${size} dark:bg-gray-700`}
    >
      {children}
    </div>
  );
}

export default TopBarDropdown;
