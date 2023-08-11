import React from "react";
import {
  useAcceptInviteMutation,
  useAddFriendMutation,
  useCancelRequestMutation,
  useGetRelationshipQuery,
  useUnfriendMutation,
} from "../services/relationshipApi";
import Loader from "./Loader";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TbUserCancel } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { useAppSelector } from "../hooks";
import Button from "./Button";

function AddFriendButton({
  targetUserId,
  textSize = "text-md",
}: {
  targetUserId: string;
  textSize?: string;
}) {
  const currentUser = useAppSelector((state) => state.user.user);
  const {
    data,
    isLoading: getRelationshipLoading,
    error,
    refetch,
  } = useGetRelationshipQuery(targetUserId);
  const [addFriend, { data: relationshipRes, isLoading }] =
    useAddFriendMutation();
  const [accept] = useAcceptInviteMutation();
  const [unfriend] = useUnfriendMutation();
  const [cancelRequest] = useCancelRequestMutation();

  if (currentUser?.id == targetUserId) return;
  if (getRelationshipLoading)
    return (
      <button
        className={`text-white  flex items-center gap-2 relative bg-blue hover: p-2 rounded ${textSize}`}
      >
        <Loader />
      </button>
    );
  if (data?.status === null)
    return (
      <Button
        onClick={async () => {
          await addFriend(targetUserId);
          refetch();
        }}
        icon={<AiOutlineUserAdd />}
      >
        Add friend
      </Button>
    );
  if (data?.status === "PENDING") {
    if (data?.user_1 === currentUser?.id)
      return (
        <Button
          onClick={async () => {
            console.log("cancel");
            await cancelRequest(targetUserId);
            refetch();
          }}
          icon={<TbUserCancel />}
        >
          Cancel Request
        </Button>
      );
    else
      return (
        <div className="flex gap-2">
          <Button
            onClick={async () => {
              await accept(targetUserId);
              refetch();
            }}
            icon={<AiOutlineUserAdd />}
          >
            Accept
          </Button>
          <Button
            variant="secondary"
            onClick={async () => {
              console.log("cancel");
              await cancelRequest(targetUserId);
              refetch();
            }}
            icon={<TbUserCancel />}
          >
            Cancel
          </Button>
        </div>
      );
  }
  if (data?.status === "FRIEND") {
    return (
      <div className="flex gap-2">
        <Button icon={<FaUserFriends />}>Friend</Button>
        <Button
          variant="secondary"
          icon={<TbUserCancel />}
          onClick={async () => {
            await unfriend(targetUserId);
            refetch();
          }}
        >
          Unfriend
        </Button>
      </div>
    );
  }
  if (getRelationshipLoading || isLoading)
    return (
      <button
        className={`text-white relative bg-blue hover: p-2 rounded ${textSize}`}
      >
        <Loader />
      </button>
    );
}

export default AddFriendButton;
