import React, { useEffect } from "react";
import { IComment, IPost, IUser } from "../../types/model";
import { useGlobalContext } from "../../components/AppLayout";
import Post from "./Post";
import CommentForm from "./CommentForm";
import Avatar from "../../components/Avatar";
import Comment from "./Comment";
import { useGetCommentsQuery } from "../../services/postApi";
import Loader from "../../components/Loader";
import { useAppSelector } from "../../hooks";
interface ICommentBox {
  post: IPost;
  user: IUser;
}

function CommentBox({ post, user }: ICommentBox) {
  const { data: comments, isLoading, refetch } = useGetCommentsQuery(post.id);
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="text-2xl text-center text-bold mb-3">
        {post?.owner_full_name}'s post
      </div>
      <Post showCommentInput={false} post={post} />
      <div className="overflow-y-scroll no-scrollbar max-h-20">
        {comments?.map((comment: IComment) => (
          <Comment postOwner={post.owner_id} comment={comment} />
        ))}
      </div>
      <CommentForm postId={post.id} />
    </div>
  );
}

export default CommentBox;
