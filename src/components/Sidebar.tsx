import React from "react";
import { IconType } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import Avatar from "../features/user/Avatar";
import { useAppSelector } from "../hooks";
import { FaGamepad, FaLayerGroup, FaUserFriends } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { SiRiotgames } from "react-icons/si";
interface sideProps {
  link: string;
  text: string;
  icon: JSX.Element;
  active: boolean;
  onClick?: () => void; // Add onClick prop
}

function Sidebar() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const navlink = [
    {
      link: `/profile?username=${user?.username}`,
      text: user?.fullName || "",
      icon: <Avatar src={user?.avatarURL} size={"h-10 w-10"} ring={false} />,
      active: false,
      onClick: () => {
        navigate(`/profile?username=${user?.username}`);
      },
    },
    {
      link: `/profile?username=${user?.username}/friends`,
      text: "Friends",
      icon: <FaUserFriends size={30} className="fill-blue" />,
      active: false,
      onClick: () => {
        navigate(`/profile/friends?username=${user?.username}`);
      },
    },
    {
      link: "/",
      text: "Saved",
      icon: <BsFillBookmarkFill size={30} className="fill-blue" />,
      active: false,
    },
  ];

  const shortcuts = [
    {
      link: "/",
      text: "Valorant",
      icon: <SiRiotgames size={30} className="fill-red" />,
      active: false,
    },
    {
      link: "/",
      text: "Group",
      icon: <FaLayerGroup size={30} className="fill-yellow" />,
      active: false,
    },
  ];
  return (
    <div className="hidden md:block">
      <div className=" flex-col gap-1 ">
        {navlink.map((nav: sideProps) => (
          <span
            onClick={nav.onClick}
            key={nav.text}
            className={`flex items-center transition gap-4 py-2 pl-2 ${
              nav.active ? "bg-white shadow-md" : "hover:bg-slate-200"
            }  rounded hover:cursor-pointer hover:shadow-md `}
          >
            {nav.icon} {nav.text}
          </span>
        ))}
      </div>
      <div className="bg-slate-300 h-[1px] my-3"></div>
      {shortcuts.map((nav: sideProps) => (
        <span
          key={nav.text}
          className={`flex items-center transition gap-4 py-2 pl-2 ${
            nav.active ? "bg-white shadow-md" : "hover:bg-slate-200"
          }  rounded hover:cursor-pointer hover:shadow-md `}
        >
          {nav.icon} {nav.text}
        </span>
      ))}
    </div>
  );
}

export default Sidebar;
