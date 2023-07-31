import React from "react";
import { useEffect, useState } from "react";
import { URL } from "../constant/constant";
import { IoMdNotifications } from "react-icons/io";
import {
  BiHome,
  BiSolidMessageRoundedDots,
  BiStore,
  BiVideo,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import Avatar from "./Avatar";
import { logout } from "../features/user/userSlice";
import { clearToken } from "../features/auth/authSlice";
import { useGetUserQuery } from "../services/userApi";
import Loader from "./Loader";
import { AiOutlineSearch } from "react-icons/ai";
import { BsChatDots, BsChatDotsFill } from "react-icons/bs";

function TopBar() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const [avatarDropDown, setAvatarDropDown] = useState<boolean>(false);
  const { isLoading, refetch } = useGetUserQuery();
  useEffect(
    function () {
      refetch();
    },
    [token]
  );
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  function toggleAvatar() {
    setAvatarDropDown((toggle: boolean) => !toggle);
  }
  if (!token) return <></>;

  if (isLoading) return <Loader />;

  return (
    <div className="bg-white w-full z-30  sticky top-0">
      <div className=" flex justify-between items-end max-w-screen-xl m-auto">
        <div className="cursor-pointer my-2 gap-3 flex items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center w-12  gap-3"
          >
            <img
              className="object-contain rounded-full"
              src={`${URL}/public/general?file_name=WinG_logo.webp`}
              alt="app icon"
            />
            {/* <h1 className=" text-2xl text-blue font-bold">WinG</h1> */}
          </div>
          <div className="relative block">
            <input
              className="rounded-full block bg-slate-200 outline-none p-2 pl-10"
              type="text"
              placeholder="Search WinG"
            />
            <span className="absolute  inset-y-0 left-0 flex items-center pl-2">
              <button className="p-1 focus:outline-none focus:shadow-outline">
                <AiOutlineSearch />
              </button>
            </span>
          </div>
        </div>
        <div className=" h-full hidden md:flex items-center">
          <div className="items-center cursor-pointer hover:bg-slate-200 py-5 border-b-2  border-blue h-full px-10">
            <BiHome size={24} className="fill-blue" />
          </div>
          <div className="items-center cursor-pointer hover:bg-slate-200 py-5 border-b-2   h-full px-10">
            <BiStore size={24} className="" />
          </div>
          <div className="items-center cursor-pointer hover:bg-slate-200 py-5 border-b-2   h-full px-10">
            <BiVideo size={24} className="" />
          </div>
        </div>
        <div className="flex relative my-2 items-center gap-2">
          <button className="rounded-full hover:bg-slate-400 bg-slate-300 p-2">
            <BsChatDotsFill size={30} />
          </button>
          <button className="rounded-full hover:bg-slate-400 bg-slate-300 p-2">
            <IoMdNotifications size={30} />
          </button>

          <img
            onClick={() => toggleAvatar()}
            className={`inline-block object-cover cursor-pointer h-12 w-12 rounded-full active:scale-95 `}
            src={`${URL}${user?.avatarURL}`}
            alt="avatar"
          />
          {avatarDropDown || (
            <div
              id="dropdown"
              className="z-100 top-12 right-0 border-2 border-slate-200 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2">
                <li>
                  <a
                    onClick={() =>
                      navigate(`/profile?username=${user?.username}`)
                    }
                    className="block cursor-pointer select-none	 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    onClick={async () => {
                      dispatch(logout());
                      dispatch(clearToken());
                      localStorage.clear();
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
