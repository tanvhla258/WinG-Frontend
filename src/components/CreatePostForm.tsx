import React from "react";
import { FaEarthAmericas } from "react-icons/fa6";
function handleSubmit() {}
function CreatePostForm() {
  return (
    <div className="w-[400px]">
      <form onSubmit={() => {}}>
        <div className="flex items-end gap-2 mb-3">
          <img
            className="inline-block h-12 w-12 rounded-full "
            src={`${URL}/user/get_avatar?username=tan`}
            alt=""
          />
          <div className="flex gap-1  flex-col">
            <p className="text-lg font-semibold pl-1  ">Quang Tân</p>
            <select
              className="bg-slate-200 rounded p-1 text-xs focus:outline-0 font-bold"
              name="status"
              id="status"
            >
              {/* <FaEarthAmericas size={20} /> */}
              <option value="public">Công khai</option>
              <option value="friends">Bạn bè</option>
              <option value="me">Chỉ mình tôi</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <input
            name="status-content"
            id="status-content"
            placeholder="Share something?"
            className="w-full pb-20 focus:outline-0"
          ></input>
          <button className="bg-blue w-full rounded py-2 text-white">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;
