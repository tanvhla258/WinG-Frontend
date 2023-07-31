import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CreatePost from "../features/post/CreatePost";
import { useGetUserQuery } from "../services/userApi";
import { useGetPublicPostQuery } from "../services/postApi";
import PostList from "../features/post/PostList";
import { useAppSelector } from "../hooks";
function Main() {
  const { data, refetch, isSuccess } = useGetUserQuery();
  if (isSuccess) localStorage.setItem("user", JSON.stringify(data));
  const { data: postData, refetch: postReftch } = useGetPublicPostQuery();
  // console.log(postData, data);
  const posts = useAppSelector((state) => state.post.posts);
  const token = useAppSelector((state) => state.auth.accessToken);
  useEffect(() => {
    // Trigger the API call whenever the token changes
    refetch();
    postReftch();
  }, [token]);
  return (
    <div className="m-auto ">
      <div className="max-w-screen-xl flex gap-4 py-4  flex-row m-auto">
        <div className="hidden md:block md:basis-1/3 sticky top-10 z-20">
          <Sidebar />
        </div>
        <div className="basis:full md:basis-2/3">
          <CreatePost />
          <div className="mb-3"></div>

          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default Main;
