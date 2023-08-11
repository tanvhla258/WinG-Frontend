import React from "react";
import { useGetListFriendQuery } from "../services/relationshipApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import Loader from "../components/Loader";
import Avatar from "../features/user/Avatar";
import { URL } from "../constant/constant";
interface IFriend {
  avatar: string;
  create_at: string;
  id: string;
  status: string;
  user_full_name: string;
  user_id: string;
  user_name: string;
}
function ProfileFriends() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.user);
  const username = searchParams.get("username");
  const id = searchParams.get("id");

  const {
    data: listFriend,
    isLoading: listFriendLoading,
    refetch,
  } = useGetListFriendQuery(currentUser?.id === id ? null : id);
  if (listFriendLoading) return <Loader />;
  console.log(listFriend);
  return (
    <div className="bg-white p-4 rounded shadow w-max-screen-lg">
      <div>
        <h2 className="text-lg font-bold">Friends</h2>
      </div>
      <div className="flex flex-wrap ">
        {listFriend?.map((item: IFriend) => (
          <div className="basis-1/2 flex  p-4 flex-row gap-2">
            <div className="w-20 h-20 rounded">
              <img
                className="object-cover rounded h-full w-full"
                src={`${URL}${item?.avatar}`}
                alt=""
              />
            </div>
            <div className="flex self-center flex-col">
              <span>{item?.user_full_name}</span>
              <span className="text-xs text-slate-500">2 mutual friends</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileFriends;
