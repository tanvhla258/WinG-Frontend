import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../constant/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import Post from "./Post";
import CreatePost from "./CreatePost";
import TopBar from "./TopBar";
interface FormValues {
  file: FileList;
}
function Loader() {
  return <p className="loader">Loading...</p>;
}

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function Profile() {
  const [user, setUser] = useState<User | null>(null); // Set the initial state as null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm<FormValues>();
  const [userToken, setUserToken] = useState<string | null>(() =>
    localStorage.getItem("userToken")
  );
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("file", data.file[0]);
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`${URL}/file/uploadAvatar`, {
        method: "POST",
        body: formData,
        headers: {
          token: "Bearer " + userToken,
        },
      });
      // Make a request to the Profile endpoint with the username and password

      if (!res.ok) throw new Error("post failed");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(user);

  return (
    <div>
      <TopBar />
      <div className="max-w-screen-lg mt-5 m-auto">
        <div className="flex mb-8 gap-3 items-end">
          <img
            className="inline-block cursor-pointer h-32 w-32 rounded-full ring-2 ring-white"
            src={`${URL}/user/get_avatar?username=tan`}
            alt="{user.handle}"
          />
          <div className="flex flex-col gap-2">
            <p className="font-bold text-4xl">Quang Tan</p>
            <p className="text-slate-500">100 friends</p>
            <div>Avatar List</div>
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <div className="basis-1/3 bg-white rounded">Tieu su</div>
          <div className="basis-2/3">
            <CreatePost />
            <div className="mb-3"></div>
            <Post />
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
