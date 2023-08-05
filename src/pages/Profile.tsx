import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { URL } from "../constant/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import Post from "../features/post/Post";
import CreatePost from "../features/post/CreatePost";
import TopBar from "../components/TopBar";
import Avatar from "../components/Avatar";
import { useGlobalContext } from "../components/AppLayout";
import SetAvatarForm from "../features/user/SetAvatarForm";
import PostList from "../features/post/PostList";
import { useGetUserProfileQuery } from "../services/publicApi";
import Loader from "../components/Loader";
import AddFriendButton from "../components/AddFriendButton";
import { useGetProfilePostQuery } from "../services/postApi";
import { AiFillSchedule, AiOutlineMail } from "react-icons/ai";
import {
  useAcceptInviteMutation,
  useGetListFriendQuery,
} from "../services/relationshipApi";
import { useAppSelector } from "../hooks";
import { FiEdit2 } from "react-icons/fi";
import EditProfileForm from "../features/user/EditProfileForm";
import ChangePasswordForm from "../features/user/VerifyCodeForm";
import TopBarDropdown from "../components/TopBarDropdown";
import ChangeEmailForm from "../features/user/ChangeEmailForm";
function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.user);
  const username = searchParams.get("username");
  const id = searchParams.get("id");
  const {
    data: listFriend,
    isLoading: listFriendLoading,
    refetch,
  } = useGetListFriendQuery(currentUser?.id === id ? null : id);

  const { data: user, isLoading } = useGetUserProfileQuery({
    username: username,
    id,
  });
  const { data: postData, isLoading: postLoaidng } = useGetProfilePostQuery({
    username,
    id,
  });
  useEffect(
    function () {
      refetch();
    },
    [id, username]
  );
  const { setModalActive, setModalContent } = useGlobalContext();
  if (isLoading && postLoaidng) return <Loader />;
  return (
    <div>
      <div className="max-w-screen-lg mt-5 m-auto">
        <div className="bg-white rounded mb-8  p-6 flex justify-between items-end">
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
              <p className="text-slate-500 hover:underline cursor-pointer">
                {listFriend?.length} friends
              </p>
              <div className="mt-3 flex -space-x-1 overflow-hidden">
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
                <button
                  onClick={() => {
                    setModalActive(true);
                    setModalContent(<EditProfileForm />);
                  }}
                  className="`trasition duration-100  ease-in text-black  flex items-center gap-2 relative bg-slate-300 hover:bg-slate-400 p-2 rounded `"
                >
                  <FiEdit2 />
                  Edit profile
                </button>
                <button
                  onClick={() => {
                    setModalActive(true);
                    setModalContent(<ChangeEmailForm />);
                  }}
                  className="`trasition duration-100  ease-in text-black  flex items-center gap-2 relative bg-slate-300 hover:bg-slate-400 p-2 rounded `"
                >
                  <AiOutlineMail />
                  Edit email
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4  justify-between">
          <div className="basis-2/5 flex-col flex gap-4">
            <div className=" bg-white  h-fit rounded p-3">
              <h2 className="mb-6 font-semibold text-xl">Intro</h2>
              <div className="flex flex-col gap-3">
                <h2 className="flex items-start  flex-start gap-3">
                  <AiFillSchedule fill="gray" size={24} />
                  <span>Team leaders at 1001 Chuyện Đại học</span>
                </h2>
                <h2 className="flex items-center  gap-3">
                  <div className="flex-1">
                    <AiFillSchedule fill="gray" size={24} />
                  </div>
                  <span>
                    Studies Công Nghệ Thông Tin at Trường Đại học Khoa học Tự
                    nhiên, Đại học Quốc gia TP.HCM
                  </span>
                </h2>
              </div>
            </div>
            <div className=" bg-white min-h-[300px]  h-fit rounded p-3">
              <h2 className="mb-6 font-semibold text-xl">Friend</h2>
              <div className="flex gap-3 flex-wrap">
                {listFriend?.map((friend: any) => {
                  return (
                    <div
                      className="w-28  relative  rounded"
                      onClick={() => navigate(`/profile?id=${friend?.user_id}`)}
                    >
                      <div
                        key={friend.id}
                        className="w-28 h-28 relative  rounded"
                      >
                        <img
                          src={`${URL}${friend.avatar}`}
                          alt=""
                          className="object-cover duration-100 transition cursor-pointer rounded w-full h-full"
                        />
                        <div className="absolute duration-100 transition hover:bg-slate-600 cursor-pointer hover:opacity-10 inset-0"></div>
                      </div>

                      <h2 className="font-semibold mt-1 cursor-pointer w-full hover:underline text-sm overflow-clip">
                        {friend.user_full_name}
                      </h2>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="basis-3/5">
            <CreatePost />
            <div className="mb-3"></div>
            <PostList posts={postData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
