import React, { useEffect } from "react";
import { IPost } from "../../types/model";
import Post from "./Post";

function PostList({ posts }: { posts: Array<IPost> | null }) {
  if (!posts || posts.length == 0) return;
  return (
    <div className="gap-8 flex flex-col">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
