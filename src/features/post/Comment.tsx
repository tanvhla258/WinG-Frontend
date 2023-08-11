import { IComment } from "../../types/model";
import Avatar from "../user/Avatar";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../components/AppLayout";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import {
  useDeleteCommentMutation,
  useUpdateComentMutation,
} from "../../services/postApi";
import EditCommentForm from "./EdiCommentForm";
import { userApi } from "../../services/userApi";
import { useAppSelector } from "../../hooks";
import { getTimeDifferenceFromNow } from "../../helper/convert";
import Swal from "sweetalert2";
function Comment({
  comment,
  postOwner,
}: {
  comment: IComment;
  postOwner: string;
}) {
  const navigate = useNavigate();
  const { setModalActive } = useGlobalContext();
  const goToProfile = function () {
    navigate(`/profile?id=${comment?.user_id}`);
    setModalActive(false);
  };
  const [openSelect, setOpenSelect] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const [updateComment, { isLoading, isSuccess: updateSuccess }] =
    useUpdateComentMutation();
  const [
    deletecomment,
    { isLoading: deleteLoading, isSuccess: deleteSuccess },
  ] = useDeleteCommentMutation();
  const user = useAppSelector((state) => state.user.user);
  useEffect(
    function () {
      if (updateSuccess) {
        Swal.fire({ title: "Update successfully" });
      }
      if (deleteSuccess) {
        Swal.fire({ title: "Delete successfully" });
      }
    },
    [updateSuccess, deleteSuccess]
  );

  return !openEditForm ? (
    <div className="flex mb-6 relative  gap-2">
      <Avatar
        onClick={() => goToProfile()}
        src={comment?.avatar}
        size={"h-8 w-8"}
      />
      <div className="text-slate-500  bg-slate-200 w-fit px-3 pr-10 max-w-full rounded-xl py-2">
        <h2
          onClick={() => goToProfile()}
          className="text-sm text-black font-bold hover:underline cursor-pointer"
        >
          {comment?.full_name}
        </h2>
        <h2 className="text-sm text-black">{comment?.content}</h2>
      </div>
      <span className="text-slate-400 text-xs absolute -bottom-4 left-12">
        {getTimeDifferenceFromNow(comment.create_at)}
      </span>
      {(postOwner === user?.id || user?.id === comment.user_id) && (
        <div className="self-center relative">
          <BsThreeDots
            onClick={() => setOpenSelect((prev) => !prev)}
            className="text-slate-500 transition  hover:bg-slate-200 p-1 rounded-full cursor-pointer"
            size={30}
          />
          {openSelect && (
            <div
              id="dropdown"
              className="z-100 left-8 top-0 border-2 border-slate-200 absolute text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-24 dark:bg-gray-700"
            >
              <ul className="py-2">
                {
                  <li>
                    {comment.user_id === user?.id && (
                      <a
                        onClick={() => {
                          setOpenEditForm(true);
                          setOpenSelect((prev) => !prev);
                          // setModalActive(true);
                          // setModalContent(<EditPostForm post={post} />);
                        }}
                        className="block cursor-pointer select-none	 px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    )}
                    <a
                      onClick={async () => {
                        await deletecomment(comment.id);
                        setOpenSelect((prev) => !prev);
                        setModalActive(false);
                      }}
                      className="block cursor-pointer select-none	 px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </li>
                }
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <EditCommentForm setOpenEdit={setOpenEditForm} comment={comment} />
  );
}

export default Comment;
