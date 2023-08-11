import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Avatar from "../user/Avatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useCreatePostMutation } from "../../services/postApi";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../components/AppLayout";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

interface FormValues {
  file: FileList;
  caption: string;
  privacy: "PUBLIC" | "PRIVATE" | "FRIEND";
}
function CreatePostForm() {
  const { setModalActive, setModalContent } = useGlobalContext();

  const { register, handleSubmit } = useForm<FormValues>();
  const token = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.user.user);
  const [addPost, { isSuccess, isError, error, isLoading }] =
    useCreatePostMutation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("privacy", data.privacy);
    formData.append("caption", data.caption);

    await addPost(formData);
  };
  useEffect(
    function () {
      if (isSuccess) {
        Swal.fire({ title: "Post successfully" });
        setModalActive(false);
        navigate("/");
      }
      if (isError) {
        Swal.fire({
          title: "Post failed",
          icon: "error",
        });
        setModalActive(false);
        navigate("/");
      }
    },

    [isSuccess, isError]
  );
  return (
    <div className="w-full">
      <div className="text-2xl text-center text-bold mb-3 w-full">
        Create post
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-end gap-2 mb-3">
          <Avatar src={user?.avatarURL} ring={false} size={"h-12 w-12"} />
          <div className="flex gap-1  flex-col">
            <p className="text-lg font-semibold pl-1  ">{user?.fullName}</p>
            <select
              className="bg-slate-200 rounded p-1 w-fit text-xs focus:outline-0 font-bold"
              id="privacy"
              {...register("privacy")}
            >
              {/* <FaEarthAmericas size={20} /> */}
              <option value="PUBLIC">Công khai</option>
              <option value="FRIEND">Bạn bè</option>
              <option value="PRIVATE">Chỉ mình tôi</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <input
            id="caption"
            placeholder="Share something?"
            className="w-full pb-20 focus:outline-0"
            {...register("caption")}
          ></input>
          <input
            className="file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-blue
            hover:file:bg-violet-100 mb-3"
            type="file"
            {...register("file")}
            id="avatar"
            // {...register("file")}
          />
          <Button
            type="submit"
            option="w-full justify-center border-2"
            icon={isLoading ? <Loader /> : <></>}
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;
