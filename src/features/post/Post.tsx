import React, { useState } from "react";
import { URL } from "../../constant/constant";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import Avatar from "../../components/Avatar";
import { useAppSelector } from "../../hooks";
import { IPost } from "../../types/model";
import { useGlobalContext } from "../../components/AppLayout";
import CommentBox from "./CommentBox";
import { convertStringTime, getMediaType } from "../../helper/convert";
import PrivacyIcon from "../../components/PrivacyIcon";
import CommentForm from "./CommentForm";
import { useNavigate } from "react-router-dom";
import { MdClear } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import {
  useDeletePostMutation,
  useGetCommentsQuery,
} from "../../services/postApi";
import CreatePostForm from "./CreatePostForm";
import EditPostForm from "./EditPostForm";
import Swal from "sweetalert2";

function Post({
  post,
  showCommentInput = true,
}: {
  post: IPost;
  showCommentInput: boolean;
}) {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { setModalActive, setModalContent } = useGlobalContext();
  const { data: comments } = useGetCommentsQuery(post?.id);
  const type = getMediaType(post?.image);
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const [openSelect, setOpenSelect] = useState(false);
  return (
    <div className="bg-white p-2 relative rounded h-fit w-full border-gray-600 border-1">
      <div className="flex ml-2 items-start mb-3 gap-2 ">
        <Avatar
          onClick={() => navigate(`/profile?id=${post?.owner_id}`)}
          src={post?.owner_avatar}
          size={"h-12 w-12"}
        />

        <div className="text-slate-500 flex-col">
          <h2
            onClick={() => navigate(`/profile?id=${post?.owner_id}`)}
            className="text-lg hover:underline cursor-pointer font-bold text-black"
          >
            {post.owner_full_name}
          </h2>
          <h2 className="text-xs flex items-center gap-1">
            {convertStringTime(post?.create_at)}{" "}
            <PrivacyIcon iconType={post?.privacy?.toLowerCase() || "public"} />
          </h2>
        </div>
      </div>
      <div className="mb-3">
        <h2 className="text-xl ">{post?.caption}</h2>
      </div>

      {type === "image" ? (
        <img
          className="object-cover rounded h-[200px] w-full"
          src={`${URL}${post?.image}`}
          alt=""
        />
      ) : type === "video" ? (
        <video loop className="w-full max-h-96 mb-3" controls>
          <source
            className="w-full max-h-96"
            src={`${URL}${post?.image}`}
            type="video/mp4"
          />
        </video>
      ) : (
        <iframe src={`${URL}${post?.image}`}></iframe>
      )}

      <div className="flex justify-end items-center p-2 border-b-2 border-slate-200">
        <div
          onClick={() => {
            setModalActive(true);
            setModalContent(<CommentBox user={user} post={post} />);
          }}
          className="hover:underline cursor-pointer text-slate-400"
        >
          {comments?.length} comments
        </div>
      </div>
      <div className="p-2">
        <div className="flex  mb-3 pt-2 gap-2">
          <button className="p-2 px-4 flex  items-center gap-2 text-blue rounded  bg-slate-200 hover:text-blue">
            <BiLike className="" /> <span>Like</span>
          </button>

          <button
            onClick={() => {
              setModalActive(true);
              setModalContent(<CommentBox user={user} post={post} />);
            }}
            className="p-2 px-4  flex items-center gap-2 hover:text-blue"
          >
            <AiOutlineComment />
            Comment
          </button>
        </div>
      </div>
      {showCommentInput && <CommentForm postId={post.id} />}
      <div className="absolute flex right-3 top-3">
        <div>
          <BsThreeDots
            onClick={() => setOpenSelect((prev) => !prev)}
            className="text-slate-500 transition  hover:bg-slate-200 p-1 rounded-full cursor-pointer"
            size={30}
          />
          {!openSelect || (
            <div
              id="dropdown"
              className="z-100 top-6 right-10 border-2 border-slate-200 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul className="py-2">
                {user?.id === post.owner_id && (
                  <li>
                    <a
                      onClick={() => {
                        setOpenSelect((prev) => !prev);
                        setModalActive(true);
                        setModalContent(<EditPostForm post={post} />);
                      }}
                      className="block cursor-pointer select-none	 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        {user?.id === post.owner_id && (
          <MdClear
            onClick={async () => {
              Swal.fire({
                title: "Do you want to delete this post?",
                showCancelButton: true,
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire("Delete successfully", "", "success");
                }
              });
              await deletePost(post?.id);
              navigate("/");
            }}
            className="text-slate-500 transition  hover:bg-slate-200 p-1 rounded-full cursor-pointer"
            size={30}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
