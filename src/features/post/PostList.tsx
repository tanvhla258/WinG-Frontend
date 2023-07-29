import React from "react";
import { IPost } from "../../types/model";
import Post from "./Post";
import { useGetOnwPostsQuery } from "../../services/postApi";
function PostList() {
  const { data: posts, isLoading } = useGetOnwPostsQuery();

  return (
    <div className="gap-8 flex flex-col">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
