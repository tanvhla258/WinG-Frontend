import React from "react";
import { useAppSelector } from "../../hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { URL } from "../../constant/constant";
import Swal from "sweetalert2";
import { useGlobalContext } from "../../components/AppLayout";
import Avatar from "../../components/Avatar";
interface FormValues {
  file: FileList;
}

function SetAvatarForm() {
  const { setModalActive, setModalContent } = useGlobalContext();

  const { register, handleSubmit } = useForm<FormValues>();
  const token = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.user.user);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    try {
      const res = await fetch(`${URL}/user/avatar`, {
        method: "POST",
        body: formData,
        headers: {
          token: "Bearer " + token,
        },
      });
      // Make a request to the Profile endpoint with the username and password

      if (!res.ok) throw new Error("post failed");
      Swal.fire("Update avatar successfully");
    } catch (error: any) {
    } finally {
      setModalActive(false);
    }
  };
  return (
    <div className="w-[360px] h-[400px]">
      <div className="text-center mb-6">
        <Avatar src={user?.avatarURL} size={"h-64 w-64"}></Avatar>
      </div>
      <h2 className="text-lg font-semibold ml-4">Update Avatar</h2>
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
        <div className="absolute right-8 flex gap-3 bottom-8">
          <button
            onClick={() => setModalActive(false)}
            className="bg-slate-200  p-2 rounded"
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

export default SetAvatarForm;
