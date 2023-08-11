import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Avatar from "../user/Avatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useUpdatePostMutation } from "../../services/postApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../components/AppLayout";
import { IPost } from "../../types/model";
import { getMediaType } from "../../helper/convert";
import { URL } from "../../constant/constant";
import Button from "../../components/Button";
interface FormValues {
  file: FileList;
  caption: string;
  privacy: "PUBLIC" | "PRIVATE" | "FRIEND";
}
function EditPostForm({ post }: { post: IPost }) {
  const { setModalActive } = useGlobalContext();

  const { register, handleSubmit } = useForm<FormValues>();
  const token = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.user.user);
  const [updatePost, { isSuccess, isError, error, isLoading }] =
    useUpdatePostMutation();
  const type = getMediaType(post?.image);
  console.log(post);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("post_id", post.id);
    if (data.file[0]) formData.append("file", data.file[0]);
    formData.append("privacy", data.privacy);
    if (data.caption) formData.append("caption", data.caption);

    await updatePost(formData);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-2xl text-center w-full text-bold mb-3">
          Edit post
        </div>
        <div className="flex items-end gap-2 mb-3">
          <Avatar src={user?.avatarURL} ring={false} size={"h-12 w-12"} />
          <div className="flex gap-1  flex-col">
            <p className="text-lg font-semibold pl-1">{user?.fullName}</p>
            <select
              className="bg-slate-200 rounded p-1 w-fit text-xs focus:outline-0 font-bold"
              defaultValue={post.privacy}
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

        <div className="w-full  ">
          <input
            id="caption"
            placeholder="Share something?"
            className="w-full pb-20 focus:outline-0"
            defaultValue={post.caption}
            {...register("caption")}
          ></input>
          <div className="self-center mb-3">
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
          </div>
          <input
            className="file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-blue
            hover:file:bg-violet-100 mb-3"
            type="file"
            {...register("file")}
            // defaultValue={post.image}
            id="avatar"
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

export default EditPostForm;
