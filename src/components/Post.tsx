import React from "react";
import { URL } from "../constant/constant";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import Avatar from "./Avatar";
import { useAppSelector } from "../hooks";
import { IPost } from "../types/model";
function Post({ post }: { post: IPost }) {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="bg-white rounded h-fit w-full border-gray-600 border-1">
      <img
        className="object-cover rounded h-[220px] w-full"
        src={`${URL}${post?.image}`}
        alt=""
      />
      <div className="p-4">
        <div className="flex mb-3 gap-2 ">
          <Avatar src={user?.avatarURL} size={12} />
          <div className="text-slate-500">
            <h2 className="text-sm">{user?.fullName}</h2>
            {/* <h2 className="text-sm">{post[2]?.create_at}</h2> */}
          </div>
        </div>
        <div className="mb-3">
          <h2 className="text-2xl font-bold">{post?.caption}</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-2 px-4 flex items-center gap-2 text-blue rounded  bg-slate-200 hover:text-blue">
            <BiLike className="" /> <span>Like</span>
          </button>

          <button className="p-2 px-4  flex items-center gap-2 hover:text-blue">
            <AiOutlineComment />
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
