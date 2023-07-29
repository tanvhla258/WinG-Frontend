import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../constant/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import Post from "../features/post/Post";
import CreatePost from "../features/post/CreatePost";
import TopBar from "./TopBar";
import { useAppSelector } from "../hooks";
import Avatar from "./Avatar";
import { useGlobalContext } from "./AppLayout";
import SetAvatarForm from "./setAvatarForm";
import { useGetOnwPostsQuery } from "../services/postApi";
import PostList from "../features/post/PostList";

function Profile() {
  const user = useAppSelector((state) => state.user.user);
  const { data: posts } = useGetOnwPostsQuery();
  const { setModalActive, setModalContent } = useGlobalContext();

  return (
    <div>
      <TopBar />
      <div className="max-w-screen-lg mt-5 m-auto">
        <div className="flex mb-8 gap-3 items-end">
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
            <p className="font-bold text-4xl">{user?.fullName}</p>
            <p className="text-slate-500">100 friends</p>
            <div>Avatar List</div>
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <div className="basis-1/3 bg-white rounded">Tieu su</div>
          <div className="basis-2/3">
            <CreatePost />
            <div className="mb-3"></div>
            <PostList />
          </div>
        </div>
        {/* {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-blue
            hover:file:bg-violet-100"
            type="file"
            id="avatar"
            {...register("file")}
          />

          <button className="bg-green-200 p-2 rounded" type="submit">
            Submit
          </button>
        </form>
      )}
      {error && <ErrorMessage message={error} />} */}
      </div>
    </div>
  );
}

export default Profile;
