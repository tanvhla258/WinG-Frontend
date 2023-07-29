import React from "react";
import { useAppSelector } from "../../hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { URL } from "../../constant/constant";
import Swal from "sweetalert2";
import { useGlobalContext } from "../../components/AppLayout";
interface FormValues {
  file: FileList;
}

function SetAvatarForm() {
  const { setModalActive, setModalContent } = useGlobalContext();

  const { register, handleSubmit } = useForm<FormValues>();
  const token = useAppSelector((state) => state.auth.accessToken);
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
    <div className="w-[400px]">
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
    </div>
  );
}

export default SetAvatarForm;
