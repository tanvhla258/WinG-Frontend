import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateCommentMutation } from "../../services/postApi";
import Swal from "sweetalert2";
import { useAppSelector } from "../../hooks";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../components/AppLayout";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { BiSmile } from "react-icons/bi";

interface FormValues {
  content: string;
}

function CommentForm({ postId }: { postId: string }) {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const user = useAppSelector((state) => state.user.user);
  const [addComment, { isSuccess, isError, error }] =
    useCreateCommentMutation();
  const [emojiPopup, setemojiPopup] = useState<boolean>(false);

  const { setModalActive, setModalContent } = useGlobalContext();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    reset();
    await addComment({ content: data.content, post_id: postId });
  };
  useEffect(
    function () {
      if (isSuccess) {
        Swal.fire({ title: "Comment successfully" });
        setModalActive(false);
        navigate("/");
      }
      if (isError) {
        Swal.fire({ title: "Comment failed", icon: "error" });
        setModalActive(false);
        navigate("/");
      }
    },
    [isSuccess]
  );
  return (
    <div className="border-t-2 pt-2	border-slate-300">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2  items-center">
          <Avatar src={user?.avatarURL} size={"h-8 w-8"} ring={false} />

          <input
            placeholder="Add comment..."
            type="text"
            className="placeholder:text-slate-400 w-full bg-slate-200 rounded-md p-2 font-sm focus:outline-0 focus:placeholder:opacity-50 "
            {...register("content")}
          ></input>
          <BiSmile
            onClick={() => {
              setemojiPopup((prev: boolean) => !prev);
            }}
          />
          {emojiPopup ? <EmojiPicker /> : <></>}
          <button className=" bg-green-200 p-2 rounded" type="submit">
            <IoMdSend fill="green" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
