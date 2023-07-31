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

function AddFriendButton({ targetUserId }: { targetUserId: string }) {
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
      <button className="text-white flex items-center gap-2 relative bg-blue hover: p-2 rounded">
        <Loader />
      </button>
    );
  if (data?.status === null)
    return (
      <button
        onClick={async () => {
          await addFriend(targetUserId);
          refetch();
        }}
        className="text-white flex items-center gap-2 relative bg-blue hover: p-2 rounded"
      >
        <AiOutlineUserAdd />
        Add friend
        <div className="absolute hover:bg-slate-600 hover:opacity-10 inset-0"></div>
      </button>
    );
  if (data?.status === "PENDING") {
    if (data?.user_1 === currentUser?.id)
      return (
        <button
          onClick={async () => {
            console.log("cancel");
            await cancelRequest(targetUserId);
            refetch();
          }}
          className="text-white flex items-center gap-2 relative bg-blue hover: p-2 rounded"
        >
          <TbUserCancel />
          Cancel Request
          <div className="absolute hover:bg-slate-600 hover:opacity-10 inset-0"></div>
        </button>
      );
    else
      return (
        <div className="flex gap-2">
          <button
            onClick={async () => {
              await accept(targetUserId);
              refetch();
            }}
            className="text-white flex items-center gap-2 relative bg-blue hover: p-2 rounded"
          >
            <AiOutlineUserAdd />
            Accept Request
            <div className="absolute hover:bg-slate-600 hover:opacity-10 inset-0"></div>
          </button>
          <button
            onClick={async () => {
              console.log("cancel");
              await cancelRequest(targetUserId);
              refetch();
            }}
            className="text-black flex items-center gap-2 relative bg-slate-200 hover: p-2 rounded"
          >
            <TbUserCancel />
            Cancel Request
            <div className="absolute hover:bg-slate-600 hover:opacity-10 inset-0"></div>
          </button>
        </div>
      );
  }
  if (data?.status === "FRIEND") {
    return (
      <div className="flex gap-2">
        <button
          disabled
          className="text-white flex items-center gap-2 relative bg-blue hover: p-2 rounded"
        >
          <FaUserFriends />
          Friend
          <div className="absolute hover:bg-slate-600 hover:opacity-10 inset-0"></div>
        </button>
        <button
          onClick={async () => {
            await unfriend(targetUserId);
            refetch();
          }}
          className="text-black flex items-center gap-2 relative bg-slate-200 hover: p-2 rounded"
        >
          <TbUserCancel />
          Unfriend
          <div className="absolute hover:bg-slate-600 hover:opacity-10 inset-0"></div>
        </button>
      </div>
    );
  }
  if (getRelationshipLoading || isLoading)
    return (
      <button className="text-white relative bg-blue hover: p-2 rounded">
        <Loader />
      </button>
    );
}

export default AddFriendButton;
