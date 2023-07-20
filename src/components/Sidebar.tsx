import React from "react";
import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
interface sideProps {
  link: string;
  text: string;
  icon: JSX.Element;
  active: boolean;
}
const navlink = [
  {
    link: "/",
    text: "Home",
    icon: <AiFillHome className="fill-blue" />,
    active: true,
  },
  {
    link: "/",
    text: "Saved",
    icon: <AiFillHome className="fill-blue" />,
    active: false,
  },
  {
    link: "/",
    text: "Friends",
    icon: <AiFillHome className="fill-blue" />,
    active: false,
  },
];
function Sidebar() {
  return (
    <>
      <div className=" flex flex-col gap-1 ">
        {navlink.map((nav: sideProps) => (
          <span
            key={nav.text}
            className={`flex items-center transition gap-2 py-2 pl-2 ${
              nav.active ? "bg-white shadow-md" : "hover:bg-slate-200"
            }  rounded hover:cursor-pointer hover:shadow-md `}
          >
            {nav.icon} {nav.text}
          </span>
        ))}
      </div>
      <div>Discover</div>
    </>
  );
}

export default Sidebar;
