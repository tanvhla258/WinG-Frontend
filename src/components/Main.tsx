import { useEffect, useState } from "react";
import { URL } from "../constant/constant";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { useGetUserQuery } from "../services/userApi";
import { useAppSelector } from "../hooks";
import { useGetOnwPostsQuery } from "../services/postApi";
import PostList from "./PostList";

function Main() {
  const { data, isLoading, error, isSuccess } = useGetUserQuery();
  const {
    data: postData,
    isLoading: isLoadingPost,
    error: postError,
    isSuccess: isSucessPost,
  } = useGetOnwPostsQuery();
  console.log(postData, data);

  const user = useAppSelector((state) => state.user);

  console.log(data, postData, user);
  return (
    <div className="m-auto ">
      <div className="sticky top-0 z-50">
        <TopBar />
      </div>
      <div className="max-w-screen-lg flex gap-4 py-4 h-screen  flex-row m-auto">
        <div className="basis-1/4 sticky top-50 z-40">
          <Sidebar />
        </div>
        <div className="basis-3/4">
          <CreatePost />
          <div className="mb-3"></div>
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default Main;
