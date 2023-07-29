import React from "react";
import { URL } from "../../constant/constant";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import Avatar from "../../components/Avatar";
import { useAppSelector } from "../../hooks";
import { IPost } from "../../types/model";
import { useGlobalContext } from "../../components/AppLayout";
import CommentBox from "./CommentBox";
import { convertStringTime } from "../../helper/convert";
function Post({ post }: { post: IPost }) {
  const user = useAppSelector((state) => state.user.user);
  const { modalActive, modalContent, setModalActive, setModalContent } =
    useGlobalContext();

  return (
    <div className="bg-white p-2 rounded h-fit w-full border-gray-600 border-1">
      <div className="flex ml-2 items-start mb-3 gap-2 ">
        <Avatar src={user?.avatarURL} size={"h-12 w-12"} />
        <div className="text-slate-500">
          <h2 className="text-sm font-bold text-black">{user?.fullName}</h2>
          <h2 className="text-sm">{convertStringTime(post?.create_at)}</h2>
        </div>
      </div>
      <div className="mb-3">
        <h2 className="text-xl ">{post?.caption}</h2>
      </div>
      <img
        className="object-cover rounded h-[200px] w-full"
        src={`${URL}${post?.image}`}
        alt=""
      />
      <div className="p-4">
        <div className="flex border-t-2 mb-3 pt-2 gap-2">
          <button className="p-2 px-4 flex items-center gap-2 text-blue rounded  bg-slate-200 hover:text-blue">
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
    </div>
  );
}

export default Post;
