import { useEffect, useState } from "react";
import { URL } from "../constant/constant";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { useGetUserQuery } from "../services/userApi";

interface User {
  username: string;
  password: string;
  role: string;
  fullname: string;
  email: string;
}
function Main() {
  const { data, error, isLoading } = useGetUserQuery();
  console.log(data, error, isLoading);
  // const [userToken, setUserToken] = useState<string | null>(() =>
  //   localStorage.getItem("userToken")
  // );

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
