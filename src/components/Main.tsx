import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CreatePost from "../features/post/CreatePost";
import { useGetUserQuery } from "../services/userApi";
import { useGetPublicPostQuery } from "../services/postApi";
import PostList from "../features/post/PostList";
import { useAppSelector } from "../hooks";

function Main() {
  const { refetch } = useGetUserQuery();

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
      <div className="max-w-screen-lg flex gap-4 py-4  flex-row m-auto">
        <div className="basis-1/4 sticky top-10 z-20">
          <Sidebar />
        </div>
        <div className="basis-3/4">
          <CreatePost />
          <div className="mb-3"></div>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}

export default Main;
