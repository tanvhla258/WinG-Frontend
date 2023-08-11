import React, { useState, useEffect } from "react";
import { Route, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetListFriendQuery } from "../services/relationshipApi";
import { useAppSelector } from "../hooks";
import { Outlet } from "react-router-dom";

import ProfileHeading from "../components/ProfileHeading";
function Profile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.user.user);
  const username = searchParams.get("username");
  const id = searchParams.get("id");
  // const {
  //   data: listFriend,
  //   isLoading: listFriendLoading,
  //   refetch,
  // } = useGetListFriendQuery(currentUser?.id === id ? null : id);

  // const { data: postData, isLoading: postLoading } = useGetProfilePostQuery({
  //   username,
  //   id,
  // });
  // useEffect(
  //   function () {
  //     refetch();
  //   },
  //   [id, username]
  // );
  // const { setModalActive, setModalContent } = useGlobalContext();
  return (
    <div>
      <div className="max-w-screen-lg mt-5 m-auto">
        <ProfileHeading />
        {/* <div className="flex gap-4  flex-col md:flex-row   justify-between">
          <div className="basis-2/5 flex-col flex gap-4">
            <div className=" bg-white shadow h-fit rounded p-3">
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
            <div className=" bg-white shadow min-h-[300px]  h-fit rounded p-3">
              <h2 className="mb-6 font-semibold text-xl">Friend</h2>
              <div className="flex gap-3 flex-wrap">
                {listFriend?.map((friend: any) => {
                  return (
                    <div
                      key={friend.id}
                      className="w-28  relative  rounded"
                      onClick={() => navigate(`/profile?id=${friend?.user_id}`)}
                    >
                      <div className="w-28 h-28 relative  rounded">
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
        </div> */}
        <Outlet />
        {/* <Route path="/" element={<ProfileInfo />} /> */}
        {/* <Route path="friends" element={<Friends />} /> */}
      </div>
    </div>
  );
}

export default Profile;
