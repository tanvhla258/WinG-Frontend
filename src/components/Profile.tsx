import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { URL } from "../constant/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import Post from "../features/post/Post";
import CreatePost from "../features/post/CreatePost";
import TopBar from "./TopBar";
import { useAppSelector } from "../hooks";
import Avatar from "./Avatar";
import { useGlobalContext } from "./AppLayout";
import SetAvatarForm from "../features/user/SetAvatarForm";
import PostList from "../features/post/PostList";
import { useGetUserProfileQuery } from "../services/publicApi";
import Loader from "./Loader";
import AddFriendButton from "./AddFriendButton";
import { useGetProfilePostQuery } from "../services/postApi";

function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username");
  const { data: user, isLoading } = useGetUserProfileQuery({
    username: username,
    id: "",
  });
  const { data: postData, isLoading: postLoaidng } = useGetProfilePostQuery({
    username,
  });
  console.log(user);
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
              <p className="text-slate-500">100 friends</p>
              <div>Avatar List</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <AddFriendButton targetUserId={user?.id} />
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <div className="basis-1/3 bg-white rounded">Tieu su</div>
          <div className="basis-2/3">
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
