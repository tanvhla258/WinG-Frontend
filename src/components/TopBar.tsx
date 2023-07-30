import React from "react";
import { useEffect, useState } from "react";
import { URL } from "../constant/constant";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageRoundedDots } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import Avatar from "./Avatar";
import { logout } from "../features/user/userSlice";
import { clearToken } from "../features/auth/authSlice";
import { useGetUserQuery } from "../services/userApi";
import Loader from "./Loader";

function TopBar() {
  const [avatarDropDown, setAvatarDropDown] = useState<boolean>(false);
  const { isLoading, refetch } = useGetUserQuery();
  const token = useAppSelector((state) => state.auth.accessToken);

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

  if (isLoading) return <Loader />;
  return (
    <div className="bg-white w-full z-30 py-2 sticky top-0">
      <div className=" flex justify-between items-center max-w-screen-lg m-auto">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer gap-3  w-12 flex items-center"
        >
          <img
            className="object-contain rounded-full"
            src={`${URL}/public/general?file_name=WinG_logo.webp`}
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

          <Avatar
            onClick={() => toggleAvatar()}
            src={user?.avatarURL}
            size={"h-12 w-12"}
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
