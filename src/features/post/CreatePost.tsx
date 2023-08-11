import React from "react";
import { URL } from "../../constant/constant";
import { useGlobalContext } from "../../components/AppLayout";
import CreatePostForm from "./CreatePostForm";
import { useAppSelector } from "../../hooks";
import Avatar from "../user/Avatar";
function CreatePost() {
  const { setModalActive, setModalContent } = useGlobalContext();
  const user = useAppSelector((state) => state.user.user);
  return (
    <div
      onClick={() => {
        setModalActive(true);
        setModalContent(<CreatePostForm />);
      }}
      className="flex hover:shadow cursor-pointer  bg-white rounded p-3 border-gray-200"
    >
      <div className="flex gap-2">
        <Avatar src={user?.avatarURL} size={"h-8 w-8"} ring={false} />
        <input
          placeholder="Create a post..."
          disabled
          className="placeholder:text-blue cursor-pointer font-medium focus:outline-0 "
        />
      </div>
      <div>
        <button className=""></button>
      </div>
    </div>
  );
}

export default CreatePost;
