import React from "react";
import cr7 from "../assets/a7.jpg";
import { URL } from "../constant/constant";
import { BiLike } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";

function Post() {
  return (
    <div className="bg-white rounded h-fit w-full border-gray-600 border-1">
      <img className="object-cover rounded h-[220px] w-full" src={cr7} alt="" />
      <div className="p-4">
        <div className="flex mb-3 gap-2 ">
          <img
            className="inline-block h-10 w-10 rounded-full "
            // src={`${URL}/user/get_avatar?username=tan`}
            alt="{user.handle}"
          />
          <div className="text-slate-500">
            <h2 className="text-sm">fullname</h2>
            <h2 className="text-sm">time</h2>
          </div>
        </div>
        <div className="mb-3">
          <h2 className="text-2xl font-bold">Làm thế nào để không nghiện</h2>
          <h2 className="text-sm text-slate-500">
            Chúng ta chỉ nghiện khi gặp những người nghiện khác... Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Illum cupiditate atque
            velit, dicta sint eaque at esse magni quos iste sunt consequatur
            dolorem, possimus nostrum! Tempore quis accusantium voluptate quo.
            Magni, velit, expedita autem impedit iure, hic sint commodi aperiam
            voluptatibus accusamus veniam at quo. Veritatis optio officiis odit
            mollitia! Blanditiis alias amet quia sed minus ut eos fugiat harum!
          </h2>
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
