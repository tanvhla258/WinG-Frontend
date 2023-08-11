import React from "react";
import Avatar from "../features/user/Avatar";
import { useGlobalContext } from "./AppLayout";
import { useGetUserProfileQuery } from "../services/publicApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { useGetListFriendQuery } from "../services/relationshipApi";
import SetAvatarForm from "../features/user/SetAvatarForm";
import AddFriendButton from "./AddFriendButton";
import Button from "./Button";
import EditProfileForm from "../features/user/EditProfileForm";
import { AiOutlineMail } from "react-icons/ai";
import ChangeEmailForm from "../features/user/ChangeEmailForm";
import { FiEdit2 } from "react-icons/fi";
import { URL } from "../constant/constant";
function ProfileHeading() {
  const { setModalActive, setModalContent } = useGlobalContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const username = searchParams.get("username");
  const id = searchParams.get("id");

  const { data: user, isLoading } = useGetUserProfileQuery({
    username: username,
    id,
  });
  const { data: listFriend, isLoading: listFriendLoading } =
    useGetListFriendQuery(currentUser?.id === id ? null : id);
  return (
    <div>
      <div className="bg-white shadow-md rounded mb-8  p-6 flex justify-between items-end">
        <div className="flex gap-3 items-end">
          <Avatar
            onClick={() => {
              setModalActive(true);
              setModalContent(<SetAvatarForm />);
            }}
            src={user?.avatarURL}
            size={"h-32 w-32"}
            ring={true}
          />

          <div className="flex flex-col gap-2">
            <p className="font-bold text-4xl">{user?.full_name}</p>
            <p className="text-slate-500 hidden sm:flex hover:underline cursor-pointer">
              {listFriend?.length} friends
            </p>
            <div className="mt-3 hidden sm:flex  -space-x-1 overflow-hidden">
              {listFriend?.map((friend: any) => {
                return (
                  <img
                    onClick={() => navigate(`/profile?id=${friend?.user_id}`)}
                    key={friend.id}
                    className="inline-block cursor-pointer object-cover h-10 w-10 rounded-full ring-2 ring-white"
                    src={`${URL}${friend.avatar}`}
                    alt="{user.handle}"
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex  gap-2">
          <AddFriendButton targetUserId={user?.id} />
          {(currentUser?.id === id || currentUser?.username === username) && (
            <div className="flex gap-2">
              <Button
                variant={"secondary"}
                onClick={() => {
                  setModalActive(true);
                  setModalContent(<EditProfileForm />);
                }}
                icon={<FiEdit2 />}
              >
                Edit profile
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => {
                  setModalActive(true);
                  setModalContent(<ChangeEmailForm />);
                }}
                icon={<AiOutlineMail />}
              >
                Edit email
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeading;
