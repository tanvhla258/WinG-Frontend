import React, { useEffect } from "react";
import SetAvatarForm from "./SetAvatarForm";
import Avatar from "./Avatar";
import { useAppSelector } from "../../hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useGlobalContext } from "../../components/AppLayout";
import { useEditUserMutation } from "../../services/userApi";
import { setUser } from "./userSlice";
interface FormValues {
  avatar: FileList;
  username: string;
  fullName: string;
}

function EditProfileForm() {
  const { setModalActive, setModalContent } = useGlobalContext();
  const { register, handleSubmit } = useForm<FormValues>();
  const [editUesr, { isLoading, isSuccess }] = useEditUserMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const avatar = new FormData();
    avatar.append("file", data.avatar[0]);
    await editUesr({
      avatar: avatar,
      user: { username: data.username, fullName: data.fullName },
    });
  };
  useEffect(
    function () {
      if (isSuccess) {
        Swal.fire("Edit successfully");
        setModalActive(false);
      }
    },
    [isSuccess]
  );
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className="h-[600px] overflow-y-scroll no-scrollbar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 pb-3 border-b-2 border-gray">
          <h2 className="text-xl font-bold">Avatar</h2>
          <div className="text-center mb-6">
            <Avatar src={user?.avatarURL} size={"h-48 w-48"}></Avatar>
          </div>
          <input
            className="file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-blue
            hover:file:bg-violet-100"
            type="file"
            id="avatar"
            {...register("avatar")}
          />
        </div>
        <div className="mb-3 ">
          <h2 className="text-xl font-bold mb-4">Infomation</h2>
          <h2 className="text-sm font-bold mb-1">Username</h2>
          <input
            type="text"
            placeholder="Username"
            defaultValue={user?.username}
            id="username"
            className="border-b-2 mb-3 border-slate-600 p-1 pl-0 ml-3 focus:outline-none"
            {...register("username")}
          />
          <h2 className="text-sm font-bold mb-1">Full name</h2>
          <input
            type="text"
            placeholder="Full name"
            defaultValue={user?.fullName}
            id="fullName"
            className="border-b-2 mb-3 border-slate-600 p-1 pl-0 ml-3 focus:outline-none"
            {...register("fullName")}
          />
          {/* <h2 className="text-sm font-bold">Phone</h2>
          <input
            type="text"
            placeholder="Phone"
            defaultValue={user?.phone}
            className="border-b-2 mb-3 border-slate-600 p-2 pl-0 ml-3 focus:outline-none"
          /> */}
        </div>
        <div className="absolute right-8 flex gap-3 bottom-8">
          <button
            onClick={() => setModalActive(false)}
            className="bg-slate-200 p-2 rounded"
          >
            Cancel
          </button>
          <button className="bg-blue text-white p-2 rounded" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
