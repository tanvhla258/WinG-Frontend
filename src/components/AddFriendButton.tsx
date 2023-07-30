import React from "react";
import {
  useAddFriendQuery,
  useGetRelationshipQuery,
} from "../services/relationshipApi";
import Loader from "./Loader";
import { AiOutlineUserAdd } from "react-icons/ai";

function AddFriendButton({ targetUserId }: { targetUserId: string }) {
  const { data, isLoading, error } = useGetRelationshipQuery(targetUserId);
  const addFriendMutation = useAddFriendQuery({
    id: targetUserId,
    status: "PENDING",
  });
  // const addFriend = function () {
  //   const { data } = useAddFriendQuery({ id: targetUserId, status: "PENDING" });
  //   console.log(data);
  // };
  console.log(data);
  if (isLoading)
    return (
      <button className="text-white relative bg-blue hover: p-2 rounded">
        <Loader />
      </button>
    );
  console.log(error);

  return (
    <button
      onClick={() => {
        addFriendMutation.mutate({ id: targetUserId, status: "PENDING" }); // Trigger the mutation on button click
      }}
      className="text-white flex items-center gap-2 relative bg-blue hover: p-2 rounded"
    >
      <AiOutlineUserAdd />
      Add friend
      <div className="absolute hover:bg-slate-600 hover:opacity-10 inset-0"></div>
    </button>
  );
}

export default AddFriendButton;
