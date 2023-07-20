import React from "react";
import { URL } from "../constant/constant";
import { useGlobalContext } from "./AppLayout";
import CreatePostForm from "./CreatePostForm";
function CreatePost() {
  const { setModalActive, setModalContent } = useGlobalContext();
  return (
    <div
      onClick={() => {
        setModalActive(true);
        setModalContent(<CreatePostForm />);
      }}
      className="flex   bg-white rounded p-3 border-gray-200"
    >
      <div className="flex gap-2">
        <img
          className="nline-block h-8 w-8 rounded-full "
          src={`${URL}/user/get_avatar?username=tan`}
          alt=""
        />
        <input
          placeholder="Create a post..."
          className="placeholder:text-blue font-medium focus:outline-0 focus:placeholder:opacity-50 "
        />
      </div>
      <div>
        <button className=""></button>
      </div>
    </div>
  );
}

export default CreatePost;
