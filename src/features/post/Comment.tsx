import { IComment } from "../../types/model";
import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../components/AppLayout";
function Comment({ comment }: { comment: IComment }) {
  const navigate = useNavigate();
  const { setModalActive } = useGlobalContext();
  const goToProfile = function () {
    navigate(`/profile?id=${comment?.user_id}`);
    setModalActive(false);
  };
  return (
    <div className="flex mb-3 gap-2">
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
    </div>
  );
}

export default Comment;
