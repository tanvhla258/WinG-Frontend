import React from "react";

function AddFriendButton() {
  return (
    <button
      onClick={() => {}}
      className="text-white relative bg-blue hover: p-2 rounded"
    >
      Add friend
      <div className="absolute hover:bg-slate-600 hover:opacity-10 inset-0"></div>
    </button>
  );
}

export default AddFriendButton;
