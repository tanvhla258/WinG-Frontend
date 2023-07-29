import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateCommentMutation } from "../../services/postApi";
import Swal from "sweetalert2";
import { useAppSelector } from "../../hooks";
import Avatar from "../../components/Avatar";
import { IPost } from "../../types/model";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../components/AppLayout";

interface FormValues {
  content: string;
}

function CommentForm({ postId }: { postId: string }) {
  const { register, handleSubmit } = useForm<FormValues>();
  const user = useAppSelector((state) => state.user.user);
  const [addComment, { isSuccess, isError, error }] =
    useCreateCommentMutation();
  const { setModalActive, setModalContent } = useGlobalContext();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addComment({ content: data.content, post_id: postId });
  };
  useEffect(
    function () {
      if (isSuccess) {
        Swal.fire({ title: "Comment successfully" });
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
          <button className=" bg-green-200 p-2 rounded" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
function setModalActive(arg0: boolean) {
  throw new Error("Function not implemented.");
}
