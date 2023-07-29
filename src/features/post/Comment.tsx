import React from "react";
import { IComment, IUser } from "../../types/model";
import Avatar from "../../components/Avatar";

function Comment({ comment }: { comment: IComment }) {
  return (
    <div className="flex mb-3 gap-2 ">
      <Avatar src={comment?.avatar} size={"h-8 w-8"} />
      <div className="text-slate-500">
        <h2 className="text-sm text-black font-bold">{comment?.full_name}</h2>
        <h2 className="text-sm">{comment?.content}</h2>
      </div>
    </div>
  );
}

export default Comment;
