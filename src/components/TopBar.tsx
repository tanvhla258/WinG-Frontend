import React from "react";
import { useEffect, useState } from "react";
import { URL } from "../constant/constant";
import icon from "../assets/icon.png";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
interface userProps {
  id: number;
  username: string;
  fullName: string;
  email: string;
}
function TopBar() {
  const [avatar, setavatar] = useState<String>("");
  const [avatarDropDown, setAvatarDropDown] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  function toggleAvatar() {
    setAvatarDropDown((toggle: boolean) => !toggle);
  }
  return (
    <div className="bg-white w-full py-2">
      <div className=" flex justify-between items-center max-w-screen-lg m-auto">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer gap-3  w-12 flex items-center"
        >
          <img
            className="object-contain rounded-full"
            src={`https://genk.mediacdn.vn/2018/9/15/3632-1537022007381908098882.jpg`}
            alt="app icon"
          />
          <h1 className=" text-2xl text-blue font-bold">WinG</h1>
        </div>
        <div className="flex relative items-center gap-2">
          <button className="rounded-full hover:bg-slate-400 bg-slate-300 p-2">
            <BiSolidMessageRoundedDots size={30} />
          </button>
          <button className="rounded-full hover:bg-slate-400 bg-slate-300 p-2">
            <IoMdNotifications size={30} />
          </button>
          <img
            onClick={() => toggleAvatar()}
            className="inline-block cursor-pointer h-12 w-12 rounded-full ring-2 ring-white"
            src={`${URL}/user/get_avatar?username=tan`}
            alt="{user.handle}"
          />
          {avatarDropDown || (
            <div
              id="dropdown"
              className="z-10 top-12 right-0 border-2 border-slate-200 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2">
                <li>
                  <a
                    onClick={() => navigate(`/profile?username=${"tan"}`)}
                    className="block cursor-pointer select-none	 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      localStorage.removeItem("userToken");
                      localStorage.setItem("isAuthen", "false");

                      navigate("/login");
                    }}
                    className="block cursor-pointer select-none	 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
