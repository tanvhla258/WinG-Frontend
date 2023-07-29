import { useEffect, useState } from "react";
import { URL } from "../constant/constant";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import CreatePost from "../features/post/CreatePost";
import Post from "../features/post/Post";
import { useGetUserQuery } from "../services/userApi";
import { useAppSelector } from "../hooks";
import { useGetOnwPostsQuery } from "../services/postApi";
import PostList from "../features/post/PostList";

function Main() {
  const { data, isLoading, error, isSuccess, refetch } = useGetUserQuery();

  const {
    data: postData,
    isLoading: isLoadingPost,
    error: postError,
    isSuccess: isSucessPost,
    refetch: postReftch,
  } = useGetOnwPostsQuery();
  // console.log(postData, data);

  const token = useAppSelector((state) => state.auth.accessToken);
  useEffect(() => {
    // Trigger the API call whenever the token changes
    refetch();
    postReftch();
  }, [token]);
  return (
    <div className="m-auto ">
      <div className="sticky top-0 z-30">
        <TopBar />
      </div>
      <div className="max-w-screen-lg flex gap-4 py-4  flex-row m-auto">
        <div className="basis-1/4 sticky top-10 z-20">
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
