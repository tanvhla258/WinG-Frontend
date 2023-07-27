import { useEffect, useState } from "react";
import { URL } from "../constant/constant";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import CreatePost from "./CreatePost";
import Post from "./Post";

interface User {
  username: string;
  password: string;
  role: string;
  fullname: string;
  email: string;
}

function Main() {
  // const [userToken, setUserToken] = useState<string | null>(() =>
  //   localStorage.getItem("userToken")
  // );
  useEffect(function () {
    const fetchUser = async function () {
      try {
        const res = await fetch(`${URL}/user/me`, {
          method: "GET",
          headers: {
            token: "Bearer " + localStorage.getItem("token"),
          },
        });
      } catch (e) {}
    };
    fetchUser();
  });
  return (
    <div className="m-auto">
      <TopBar />
      <div className=" max-w-screen-lg flex gap-4 py-4  flex-row m-auto">
        <div className="basis-1/4">
          <Sidebar />
        </div>
        <div className="basis-3/4">
          <CreatePost />
          <div className="mb-3"></div>
          <Post />
        </div>
      </div>
    </div>
  );
}

export default Main;
